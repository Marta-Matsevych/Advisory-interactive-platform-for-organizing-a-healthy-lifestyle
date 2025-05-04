import React from 'react';
import { Card, CardHeader, CardBody, Form, FormGroup, FormCheck, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Step5({ data, setData }) {
    const navigate = useNavigate();

    const handleAllergiesChange = (event) => {
        const selectedAllergies = data.allergies || [];
        if (event.target.checked) {
            selectedAllergies.push(event.target.value);
        } else {
            selectedAllergies.splice(selectedAllergies.indexOf(event.target.value), 1);
        }
        setData({ ...data, allergies: selectedAllergies });
    };

    const handleNext = () => {
        const updatedData = { ...data, allergies: data.allergies };


        navigate('/step6', { state: { data: updatedData } });
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
                <CardHeader>Step 5: Allergies Conditions</CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Form.Label>Allergies:</Form.Label>
                            <FormCheck
                                type="checkbox"
                                id="citrus"
                                label="Citrus"
                                value="citrus"
                                checked={data.allergies?.includes('citrus') || false}
                                onChange={handleAllergiesChange}
                            />
                            <FormCheck
                                type="checkbox"
                                id="nuts"
                                label="Nuts"
                                value="nuts"
                                checked={data.allergies?.includes('nuts') || false}
                                onChange={handleAllergiesChange}
                            />
                            <FormCheck
                                type="checkbox"
                                id="soy"
                                label="Soy"
                                value="soy"
                                checked={data.allergies?.includes('soy') || false}
                                onChange={handleAllergiesChange}
                            />
                            <FormCheck
                                type="checkbox"
                                id="dairy"
                                label="Dairy"
                                value="dairy"
                                checked={data.allergies?.includes('dairy') || false}
                                onChange={handleAllergiesChange}
                            />
                            <FormCheck
                                type="checkbox"
                                id="eggs"
                                label="Eggs"
                                value="eggs"
                                checked={data.allergies?.includes('eggs') || false}
                                onChange={handleAllergiesChange}
                            />
                            <FormCheck
                                type="checkbox"
                                id="wheat"
                                label="Wheat"
                                value="wheat"
                                checked={data.allergies?.includes('wheat') || false}
                                onChange={handleAllergiesChange}
                            />
                            <FormCheck
                                type="checkbox"
                                id="seafood"
                                label="Seafood"
                                value="seafood"
                                checked={data.allergies?.includes('seafood') || false}
                                onChange={handleAllergiesChange}
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

export default Step5;
