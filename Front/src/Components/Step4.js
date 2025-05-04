import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

function Step4({ data, setData }) {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/step5');
    };
    const handleActivityChange = (event) => {
        setData({ ...data, activityLevel: event.target.value });
    };

    return (
        <div>
            <h2>Step 4: Activity Level</h2>
            <p>Please describe your typical activity level.</p>
            <label htmlFor="activityLevel">Activity Level:</label>
            <select id="activityLevel" onChange={handleActivityChange}>
                <option value="">Select...</option>
                <option value="sedentary">sedentary</option>
                <option value="lightly active">lightly active</option>
                <option value="moderately active">moderately active</option>
                <option value="very active">very active</option>
                <option value="extra active">extra active</option>
            </select>
            <Button variant="dark" onClick={handleSubmit}>Next</Button>
        </div>
    );
}

export default Step4;
