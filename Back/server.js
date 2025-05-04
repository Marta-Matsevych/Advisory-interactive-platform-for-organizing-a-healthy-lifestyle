const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./Models");
const Role = db.role;

const app = express();


const {VertexAI} = require('@google-cloud/vertexai');
const PersonalizedPlan = require("./Models/personalizedPlan");
const {authJwt} = require("./Middlewares");
const {request} = require("express");
const multer = require('multer');
const fs = require('fs-extra');

require('dotenv').config();
const mongodbUri = process.env.MONGODB_URI;

const project = 'healthpal-422706';
const location = 'us-central1'
const vertex_ai = new VertexAI({project: project, location: location});

const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: 'gemini-pro',
});

async function calculateCaloriesAndMacros(data) {
    let bmr;
    if (data.gender === 'male') {
        bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
    } else if (data.gender === 'female') {
        bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
    }

    let activityFactor;
    switch (data.activityLevel) {
        case 'sedentary':
            activityFactor = 1.2;
            break;
        case 'lightly active':
            activityFactor = 1.375;
            break;
        case 'moderately active':
            activityFactor = 1.55;
            break;
        case 'very active':
            activityFactor = 1.725;
            break;
        case 'extra active':
            activityFactor = 1.9;
            break;
        default:
            activityFactor = 1.2;
    }

    const calories = Math.round(bmr * activityFactor);

    const proteinPercentage = 0.3;
    const fatPercentage = 0.25;
    const carbPercentage = 1 - (proteinPercentage + fatPercentage);

    const proteinCalories = Math.round(calories * proteinPercentage);
    const fatCalories = Math.round(calories * fatPercentage);
    const carbCalories = Math.round(calories * carbPercentage);

    return {
        calories: calories,
        macros: {
            protein: proteinCalories,
            fat: fatCalories,
            carbs: carbCalories
        }
    };
}



async function craftDietPrompt(data) {
    const macros = await calculateCaloriesAndMacros(data);

    return `You are a nutritionist where you need to analyze given the user's goal of ${data.goal}, age of ${data.age}, gender of ${data.gender}, weight of ${data.weight}, height of ${data.height}, allergies of ${data.allergies}, medicalConditions of ${data.medicalConditions} and desired activity level of ${data.activityLevel} (if provided), please create a sample 3-day meal plan that aligns with these needs. Their calculated macros are protein: ${macros.macros.protein}g, fat: ${macros.macros.fat}g, carbs: ${macros.macros.carbs}g. Consider their suggest recipes that are easy to prepare at home.`;
}

async function craftExercisePrompt(data) {
    const macros = await calculateCaloriesAndMacros(data);

    return `You are a professional trainer. Based on the user's activity level of ${data.activityLevel}, goal of ${data.goal}, age of ${data.age}, gender of ${data.gender}, weight of ${data.weight}, height of ${data.height},medicalConditions of ${data.medicalConditions}, recommend specific exercises or workout routines that would be appropriate for them. that are easy to prepare at home.(limit your answer to a maximum of 1000 characters)`;
}

async function craftGeneralPrompt(data) {
    const macros = await calculateCaloriesAndMacros(data);

    return `Provide general health tips for a person of age ${data.age}, weight of ${data.weight} considering their goal of ${data.goal}, medicalConditions of ${data.medicalConditions} and other relevant factors.(limit your answer to a maximum of 1000 characters)`;
}

async function generateRecommendations(data) {
    try {
        const goal = data.goal;
        const age = data.age;
        const gender = data.gender;
        const weight = data.weight;
        const height = data.height;
        const activityLevel = data.activityLevel;
        const allergies = data.allergies;
        const medicalConditions = data.medicalConditions;

        const dietPrompt = await craftDietPrompt(data);
        const exercisePrompt = await craftExercisePrompt(data);
        const generalPrompt = await craftGeneralPrompt(data);

        const dietRecommendations = await sendPromptToGemini(dietPrompt);
        const exerciseRecommendations = await sendPromptToGemini(exercisePrompt);
        const generalTips = await sendPromptToGemini(generalPrompt);

        return {
            userId: data.userId,
            dietRecommendations: dietRecommendations,
            exerciseRecommendations: exerciseRecommendations,
            generalTips: generalTips,
        }
    } catch (error) {
        throw error;
    }

}

async function sendPromptToGemini(prompt) {
    try {
        const request = {
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
        };
        const response = await generativeModel.generateContentStream(request);

        let textContent = "";
        for await (const item of response.stream) {
            textContent += item.candidates[0].content.parts[0].text + "\n";
        }

        return textContent;

    } catch (error) {
    }
}

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(
    cookieSession({
        name: "session",
        keys: ["COOKIE_SECRET"],
        httpOnly: true
    })
);


db.mongoose
    .connect(mongodbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });


app.post('/api/personalize', authJwt.verifyToken, async (req, res) => {
    try {
        if (!req.body || !req.body.data) {
            return res.status(400).send('Missing user data in request body');
        }

        const userId = req.userId;
        const userData = req.body.data;

        const personalizedPlan = await generateRecommendations(userData);

        const diffPlan = await new PersonalizedPlan({
            user: userId,
            ...personalizedPlan
        });

        await diffPlan.save();
        res.status(201).json(diffPlan);
    } catch (error) {
        console.error('Error generating personalized plan:', error.message);
        res.status(500).send('Error generating plan: ' + error.message);
    }
});


const upload = multer();

const vertexAI = new VertexAI({project: project, location: location});
const model = 'gemini-pro-vision';
const generativeVisionModel = vertexAI.preview.getGenerativeModel({
    model: model,
    generation_config: {
        "max_output_tokens": 2048,
        "temperature": 0.4,
        "top_p": 1,
        "top_k": 32
    },
});
app.post('/api/predict', upload.single('image'), async (req, res) => {
    const base64Image = req.file.buffer.toString('base64');

    async function generateContentAI() {
        const req = {
            contents: [{
                role: 'user',
                parts: [{
                    inline_data: { mime_type: 'image/jpeg', data: base64Image },
                }, {
                    text: `You are an expert in nutritionist where you need to see the food items from the image
                and calculate the total calories, also provide the details of every food items with calories intake
                is below format

                1. Item 1 - no of calories
                2. Item 2 - no of calories
                ----
                ----`
                }]
            }],
        };
        const responseAI = await generativeVisionModel.generateContent(req);
        const aggregatedResponse = await responseAI.response;
        const fullTextResponse = aggregatedResponse.candidates[0].content.parts[0].text;
        return fullTextResponse;
    }

    const text = await generateContentAI();
    res.json({ answer: text });
});
    async function initial() {
        try {
            const count = await Role.estimatedDocumentCount();

            if (count === 0) {
                await new Role({name: "user"}).save();
                console.log("added 'user' to roles collection");

                await new Role({name: "moderator"}).save();
                console.log("added 'moderator' to roles collection");

                await new Role({name: "admin"}).save();
                console.log("added 'admin' to roles collection");
            }
        } catch (err) {
            console.error("Error during initialization", err);
        }
    }

    require('./Routes/auth.routes')(app);
    require('./Routes/user.routes')(app);
    require('./Routes/calendar.routes')(app);
    require('./Routes/saveData.routes')(app);
    require('./Routes/events.routes')(app);
    require('./Routes/fitness.routes')(app);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
