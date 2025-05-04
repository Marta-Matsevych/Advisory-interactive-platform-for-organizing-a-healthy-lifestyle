import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

function Step3({ data, setData, next }) {
    const navigate = useNavigate();
    const handleGoalChange = (event) => {
        setData({ ...data, goal: event.target.value });
    };

    const handleNext = () => {
        navigate('/step4');
    };

    return (
        <div style={{color: 'white'}}>
            <h2>Step 3: Choose Your Goal</h2>
            <p>What is your primary health and fitness goal?</p>
            <label htmlFor="goal">Goal:</label>
            <select id="goal" onChange={handleGoalChange}>
                <option value="">Select...</option>
                <option value="lose_weight">Lose Weight</option>
                <option value="gain_weight">Gain Weight</option>
                <option value="maintain_weight">Maintain Weight</option>
                <option value="gain_muscle">Gain Muscle</option>
                <option value="modify_diet">Modify Diet</option>
                {/*<option value="increase_step_count">Increase Step Count</option>*/}
            </select>
            <Button variant="dark" onClick={handleNext}>Next</Button>
        </div>
    );
}

export default Step3;
