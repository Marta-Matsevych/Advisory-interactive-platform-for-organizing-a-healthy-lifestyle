const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./Models");
const Role = db.role;
const app = express();
require('dotenv').config();
const mongodbUri = process.env.MONGODB_URI;

var corsOptions = {
    origin: "http://localhost:8081"
};

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
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

async function initial() {
    try {
        const count = await Role.estimatedDocumentCount();

        if (count === 0) {
            await new Role({ name: "user" }).save();
            console.log("added 'user' to roles collection");

            await new Role({ name: "moderator" }).save();
            console.log("added 'moderator' to roles collection");

            await new Role({ name: "admin" }).save();
            console.log("added 'admin' to roles collection");
        }
    } catch (err) {
        console.error("Error during initialization", err);
    }
}

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome." });
});

require('./Routes/auth.routes')(app);
require('./Routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
