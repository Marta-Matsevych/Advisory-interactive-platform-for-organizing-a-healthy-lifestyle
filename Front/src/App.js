import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from './Images/healthpal-high-resolution-logo-transparent.png';

import AuthService from "./Services/auth.service";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import BoardUser from "./Components/Form";
import BoardModerator from "./Components/BoardModerator";
import BoardAdmin from "./Components/BoardAdmin";
import Blog from "./Components/Blog"
import Calendar1 from "./Components/Calendar"

import EventBus from "./Common/EventBus";
import Step2 from "./Components/Step2";
import Step3 from "./Components/Step3";
import Step4 from "./Components/Step4";
import Step5 from "./Components/Step5";
import Step6 from "./Components/Step6";
import Result from "./Components/Result";
import Calories from "./Components/Calories";
import Step1 from "./Components/Step1";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [data, setData] = useState({});

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark" style={{padding: "10px 20px"}}>
          <Link to={"/"} className="navbar-brand">
            <img
                src={logo}
                alt={'logo'}
                height={80}
            />
          </Link>
          <div className="navbar-nav mr-auto">
            {currentUser && (
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link" style={{ fontSize: "20px" }}>
                    Home
                  </Link>
                </li>
            )}

            {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
            )}

            {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
            )}

            {currentUser && (
                <li className="nav-item">
                  <Link to={"/myform"} className="nav-link" style={{ fontSize: "20px" }}>
                    My Form
                  </Link>
                </li>
            )}

            {currentUser && (
                <li className="nav-item">
                  <Link to={"/genCalories"} className="nav-link" style={{ fontSize: "20px" }}>
                    Calories
                  </Link>
                </li>
            )}

            {currentUser && (
                <li className="nav-item">
                  <Link to={"/calendar"} className="nav-link" style={{ fontSize: "20px" }}>
                    Calendar
                  </Link>
                </li>
            )}

          </div>

          {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link" style={{ fontSize: "20px" }}>
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut} style={{ fontSize: "20px" }}>
                    Log Out
                  </a>
                </li>
              </div>
          ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link" style={{ fontSize: "20px" }}>
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link" style={{ fontSize: "20px" }}>
                    Sign Up
                  </Link>
                </li>
              </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/home"} element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/genCalories" element={<Calories />} />
            <Route path="/myform/*" element={<BoardUser data={data} setData={setData} />} />
            <Route path="/step1" element={<Step1 data={data} setData={setData}/> }/>
            <Route path="/step2" element={<Step2 data={data} setData={setData}/> }/>
            <Route path="/step3" element={<Step3 data={data} setData={setData}/> }/>
            <Route path="/step4" element={<Step4 data={data} setData={setData}/> }/>
            <Route path="/step5" element={<Step5 data={data} setData={setData}/> }/>
            <Route path="/step6" element={<Step6 data={data} setData={setData}/> }/>
            <Route path="/result" element={<Result data={data} setData={setData}/> }/>
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/blog" element={<Blog />}/>
            <Route path="/calendar" element={<Calendar1 currentUser={currentUser} showModeratorBoard={showModeratorBoard}/>}/>
          </Routes>
        </div>

      </div>
  );
};

export default App;
