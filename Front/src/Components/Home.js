import React, { useState, useEffect } from "react";
import UserService from "../Services/user.service";
import '../Styles/public.css'
import '../Styles/Home.css'
import heroImage from '../Images/heroImage.jpg';
import nutritionImage from '../Images/nutrition-image.jpg';
import workoutImage from '../Images/workout-image.jpg';
import communityImage from '../Images/community-image.jpg';
import AuthService from "../Services/auth.service";
import {Link} from "react-router-dom";
const Home = () => {
    const [content, setContent] = useState("");
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }

        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                {!currentUser &&(
                <div className="container__public">
                    <h1 className="public--header">Unlock Your Best Self</h1>
                    <Link to={"./register"}>
                        <button className="public--button">Start Your Health Revolution</button>
                    </Link>

                    <main className="features" style={{background: "transparent"}}>
                        <section className="feature" style={{background: "transparent"}}>
                            <div className="feature-image">
                                <img src={nutritionImage} alt="Nutrition" />
                            </div>
                            <div className="feature-content">
                                <h2>Personalized Nutrition</h2>
                                <p>
                                    Receive tailored dietary recommendations based on your unique needs and goals, ensuring optimal nutrition for a balanced lifestyle.
                                </p>
                            </div>
                        </section>

                        <section className="feature" style={{background: "transparent"}}>
                            <div className="feature-content">
                                <h2>AI-Powered Health Assistant</h2>
                                <p>
                                    Leverage the power of AI to analyze food items, calculate calorie intake, and gain valuable insights for informed dietary choices.
                                </p>
                            </div>
                            <div className="feature-image">
                                <img src={heroImage} alt="Hero" />
                            </div>
                        </section>

                        <section className="feature" style={{background: "transparent"}}>
                            <div className="feature-image">
                                <img src={workoutImage} alt="Workout" />
                            </div>
                            <div className="feature-content">
                                <h2>Customized Fitness Plans</h2>
                                <p>
                                    Achieve your fitness goals with personalized workout routines tailored to your activity level, preferences, and objectives.
                                </p>
                            </div>
                        </section>

                        <section className="feature" style={{background: "transparent"}}>
                            <div className="feature-content">
                                <h2>Supportive Community</h2>
                                <p>
                                    Join a vibrant community of like-minded individuals on their wellness journeys, fostering motivation, inspiration, and accountability.
                                </p>
                            </div>
                            <div className="feature-image">
                                <img src={communityImage} alt="Community" />
                            </div>
                        </section>
                    </main>
                </div>
                )}

                {currentUser &&(
                    <div className="home">
                        <main className="features">
                            <section className="feature">
                                <div className="feature-image">
                                    <img src={nutritionImage} alt="Nutrition" />
                                </div>
                                <div className="feature-content">
                                    <h2>Personalized Nutrition</h2>
                                    <p>
                                        Receive tailored dietary recommendations based on your unique needs and goals, ensuring optimal nutrition for a balanced lifestyle.
                                    </p>
                                </div>
                            </section>

                            <section className="feature">
                                <div className="feature-content">
                                    <h2>AI-Powered Health Assistant</h2>
                                    <p>
                                        Leverage the power of AI to analyze food items, calculate calorie intake, and gain valuable insights for informed dietary choices.
                                    </p>
                                </div>
                                <div className="feature-image">
                                    <img src={heroImage} alt="Hero" />
                                </div>
                            </section>

                            <section className="feature">
                                <div className="feature-image">
                                    <img src={workoutImage} alt="Workout" />
                                </div>
                                <div className="feature-content">
                                    <h2>Customized Fitness Plans</h2>
                                    <p>
                                        Achieve your fitness goals with personalized workout routines tailored to your activity level, preferences, and objectives.
                                    </p>
                                </div>
                            </section>

                            <section className="feature">
                                <div className="feature-content">
                                    <h2>Supportive Community</h2>
                                    <p>
                                        Join a vibrant community of like-minded individuals on their wellness journeys, fostering motivation, inspiration, and accountability.
                                    </p>
                                </div>
                                <div className="feature-image">
                                    <img src={communityImage} alt="Community" />
                                </div>
                            </section>
                        </main>
                    </div>
                )}

            </header>
        </div>
    );
};

export default Home;
