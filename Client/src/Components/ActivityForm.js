import React, { useState } from 'react';

const ActivityForm = ({ onNext }) => {
    const [activityLevel, setActivityLevel] = useState('');

    const handleActivitySelection = (level) => {
        setActivityLevel(level);
    };

    const handleNext = () => {
        onNext(activityLevel);
    };

    return (
        <div>
            <h3>How Active Are You?</h3>
            <select value={activityLevel} onChange={(e) => handleActivitySelection(e.target.value)}>
                <option value="not_very_active">Not Very Active</option>
                <option value="active">Active</option>
                <option value="very_active">Very Active</option>
            </select>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default ActivityForm;
