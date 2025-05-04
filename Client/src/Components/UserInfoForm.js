import React, { useState } from 'react';

const UserInfoForm = ({ onNext }) => {
    const [height, setHeight] = useState('');
    const [currentWeight, setCurrentWeight] = useState('');
    const [goalWeight, setGoalWeight] = useState('');

    const handleNext = () => {
        onNext({ height, currentWeight, goalWeight });
    };

    return (
        <div>
            <h3>Enter Your Information:</h3>
            <input type="text" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} />
            <input type="text" placeholder="Current Weight (kg)" value={currentWeight} onChange={(e) => setCurrentWeight(e.target.value)} />
            <input type="text" placeholder="Goal Weight (kg)" value={goalWeight} onChange={(e) => setGoalWeight(e.target.value)} />
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default UserInfoForm;
