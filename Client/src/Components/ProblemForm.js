import React, { useState } from 'react';

const ProblemForm = ({ goal, onNext }) => {
    const [selectedProblem, setSelectedProblem] = useState('');

    const handleProblemSelection = (problem) => {
        setSelectedProblem(problem);
    };

    const handleNext = () => {
        onNext(selectedProblem);
    };

    return (
        <div>
            <h3>Specify Your Problem:</h3>
            {goal === 'lose_weight' && (
                <div>
                    <button onClick={() => handleProblemSelection('diet_lacks_variety_lose')}>Did not enjoy the food</button>
                    {/* ... Repeat for other problems ... */}
                </div>
            )}
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default ProblemForm;
