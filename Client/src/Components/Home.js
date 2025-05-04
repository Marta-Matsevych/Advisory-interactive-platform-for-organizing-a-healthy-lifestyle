import React, { useState, useEffect } from "react";
import UserService from "../Services/user.service";
import '../Styles/public.css'
import AuthService from "../Services/auth.service";
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
                    <button className="public--button">Start Your Health Revolution</button>
                </div>
                )}
                {currentUser &&(
                    <div className="container__public">
                        <h1 className="public--header">Bla Bla Bla</h1>
                    </div>
                )}

            </header>
        </div>
    );
};

export default Home;
