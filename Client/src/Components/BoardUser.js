import React, { useState, useEffect } from "react";
import '../Styles/User.css'
import ProblemForm from './ProblemForm';
import ActivityForm from './ActivityForm';
import UserInfoForm from './UserInfoForm';

import UserService from "../Services/user.service";


const BoardUser = ({ onNext }) => {
    const [content, setContent] = useState("");
    const [selectedGoal, setSelectedGoal] = useState('');
    const [currentForm, setCurrentForm] = useState('goal');

    const handleGoalSelection = (goal) => {
        setSelectedGoal(goal);
    };

    const formOrder = ['goal', 'problem', 'activity', 'userInfo'];

    const handleNext = (e) => {
        e.preventDefault();

        if (currentForm === 'goal' && !selectedGoal) {
            alert('Please select a goal before proceeding.');
            return;
        }

        const currentIndex = formOrder.indexOf(currentForm);
        const nextForm = formOrder[(currentIndex + 1) % formOrder.length];

        setCurrentForm(nextForm);
    };

    const renderForm = (formKey) => {
        switch (formKey) {
            case 'goal':
                return (
                    <form>
                        <h3>Choose Your Goal:</h3>
                        <button onClick={() => handleGoalSelection('lose_weight')} style={selectedGoal === 'lose_weight' ? { backgroundColor: 'lightblue' } : {}}>
                            Lose Weight
                        </button>
                        <button onClick={() => handleGoalSelection('maintain_weight')} style={selectedGoal === 'maintain_weight' ? { backgroundColor: 'lightblue' } : {}}>
                            Maintain Weight
                        </button>
                        <button onClick={() => handleGoalSelection('gain_weight')} style={selectedGoal === 'gain_weight' ? { backgroundColor: 'lightblue' } : {}}>
                            Gain Weight
                        </button>
                        <button onClick={() => handleGoalSelection('increase_step_count')} style={selectedGoal === 'increase_step_count' ? { backgroundColor: 'lightblue' } : {}}>
                            Increase step count
                        </button>
                        <button onClick={handleNext}>Next</button>
                    </form>
                );
            case 'problem':
                return <ProblemForm key={formKey} goal={selectedGoal} onNext={handleNext} />;
            case 'activity':
                return <ActivityForm key={formKey} onNext={handleNext} />;
            case 'userInfo':
                return <UserInfoForm key={formKey} onNext={handleNext} />;
            default:
                return null;
        }
    };

    useEffect(() => {
        // Fetch user board content on component mount
        UserService.getUserBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return <div>{renderForm(currentForm)}</div>;
};

export default BoardUser;

