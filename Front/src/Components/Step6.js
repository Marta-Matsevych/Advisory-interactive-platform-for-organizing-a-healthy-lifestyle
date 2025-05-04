import React from 'react';
import { Card, CardHeader, CardBody, Form, FormGroup, FormCheck, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Step6({ data, setData }) {
    const navigate = useNavigate();

    const handleConditionsChange = (event) => {
        const selectedConditions = data.medicalConditions || [];
        if (event.target.checked) {
            selectedConditions.push(event.target.value);
        } else {
            selectedConditions.splice(selectedConditions.indexOf(event.target.value), 1);
        }
        setData({ ...data, medicalConditions: selectedConditions });
    };

    const handleNext = () => {
        const updatedData = { ...data, medicalConditions: data.medicalConditions };
        navigate('/result', { state: { data: updatedData } });
    };

    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <Card
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: '0 0 0.25rem rgba(0, 0, 0, 0.15)',
                    maxWidth: '33%',
                    color: 'white',
                }}
            >
                <CardHeader>Step 6: Medical Conditions</CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Form.Label>Medical Conditions:</Form.Label>
                            <FormCheck
                                type="checkbox"
                                id="diabetes"
                                label="Diabetes"
                                value="diabetes"
                                checked={data.medicalConditions?.includes('diabetes') || false}
                                onChange={handleConditionsChange}
                            />
                            <FormCheck
                                type="checkbox"
                                id="heart_disease"
                                label="Heart Disease"
                                value="heart_disease"
                                checked={data.medicalConditions?.includes('heart_disease') || false}
                                onChange={handleConditionsChange}
                            />
                            <FormCheck
                                type="checkbox"
                                id="high_blood_pressure"
                                label="High Blood Pressure"
                                value="high_blood_pressure"
                                checked={data.medicalConditions?.includes('high_blood_pressure') || false}
                                onChange={handleConditionsChange}
                            />
                            <FormCheck
                                type="checkbox"
                                id="joint_problems"
                                label="Joint Problems"
                                value="joint_problems"
                                checked={data.medicalConditions?.includes('joint_problems') || false}
                                onChange={handleConditionsChange}
                            />
                            <FormCheck
                                type="checkbox"
                                id="eating_disorder"
                                label="Eating Disorder"
                                value="eating_disorder"
                                checked={data.medicalConditions?.includes('eating_disorder') || false}
                                onChange={handleConditionsChange}
                            />
                        </FormGroup>
                        <Button variant="dark" onClick={handleNext}>
                            Next
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default Step6;
