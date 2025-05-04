import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from "./Step6";
import Result from './Result';
import '../Styles/Form.css';
import CookieConsent from './CookieConsent';

function Form({ data, setData }) {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    const handleSubmit = () => {
        setCurrentStep(6);
    };

    return (
        <CookieConsent>
            <div className="healthcare-motivation">
                <>
                    <h1>Take Charge of Your Health Today!</h1>
                    <p>
                        Your health is your most valuable asset. By taking proactive steps, you can feel your best and live a
                        vibrant life. This form is your guide to creating a personalized healthcare plan. It's easy, informative,
                        and empowering.
                    </p>
                    <button onClick={() => navigate('/step1')}>Start Your Health Journey Now!</button>
                    {/* Hide the Routes component initially */}
                    {currentStep !== 1 && (
                        <Routes>
                            {currentStep === 1 && <Route path="/step1" element={<Step1 data={data} setData={setData} />} />}
                            {currentStep === 2 && <Route path="/step2" element={<Step2 data={data} setData={setData} />} />}
                            {currentStep === 3 && <Route path="/step3" element={<Step3 data={data} setData={setData} />} />}
                            {currentStep === 4 && <Route path="/step4" element={<Step4 data={data} setData={setData} />} />}
                            {currentStep === 5 && <Route path="/step5" element={<Step5 data={data} setData={setData} />} />}
                            {currentStep === 6 && <Route path="/step6" element={<Step6 data={data} setData={setData} />} />}
                            <Route path="/result" element={<Result data={data} />} />
                        </Routes>
                    )}
                </>
            </div>
        </CookieConsent>
    );
}

export default Form;
