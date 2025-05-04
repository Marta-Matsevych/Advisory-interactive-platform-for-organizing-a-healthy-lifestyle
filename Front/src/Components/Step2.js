import React from 'react';
import { Card, CardHeader, CardBody, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Step2({ data, setData }) {

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleNext = () => {
        navigate('/step3');
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
                <CardHeader>Step 2: Physical Attributes</CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Form.Label htmlFor="height">Height (cm):</Form.Label>
                            <FormControl
                                type="number"
                                id="height"
                                name="height"
                                value={data.height || ''}
                                onChange={handleInputChange}
                                placeholder="Enter your height"
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label htmlFor="weight">Weight (kg):</Form.Label>
                            <FormControl
                                type="number"
                                id="weight"
                                name="weight"
                                value={data.weight || ''}
                                onChange={handleInputChange}
                                placeholder="Enter your weight"
                                required
                            />
                        </FormGroup>
                        <Button variant="dark" onClick={handleNext}>Next</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default Step2;
