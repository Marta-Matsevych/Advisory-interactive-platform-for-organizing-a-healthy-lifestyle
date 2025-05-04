import React from 'react';
import { Card, CardHeader, CardBody, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Step1({ data, setData }) {

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleGenderChange = (event) => {
        setData({...data, gender: event.target.value});
    };

    const handleNext = () => {
        navigate('/step2');
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
                <CardHeader>Step 1: Tell us about yourself</CardHeader>
                <CardBody>
                    <Form>
                        <select id="goal" onChange={handleGenderChange}>
                            <option value="">Select...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <FormGroup>
                            <Form.Label htmlFor="name">Name:</Form.Label>
                            <FormControl
                                type="text"
                                id="name"
                                name="name"
                                value={data.name || ''}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label htmlFor="age">Age:</Form.Label>
                            <FormControl
                                type="number"
                                id="age"
                                name="age"
                                value={data.age || ''}
                                onChange={handleInputChange}
                                placeholder="Enter your age"
                                min={1}
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

export default Step1;
