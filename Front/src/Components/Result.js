import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthService from "../Services/auth.service";
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';

function Result({ data }) {
    const [personalizedPlan, setPersonalizedPlan] = useState(null);
    const currentUser = AuthService.getCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        const storedPlan = localStorage.getItem('personalizedPlan');
        if (storedPlan) {
            setPersonalizedPlan(JSON.parse(storedPlan));
            return;
        }

        async function fetchPersonalizedPlan() {
            try {
                const response = await axios.post('/api/personalize', { data, user: currentUser.id });
                setPersonalizedPlan(response.data);
                localStorage.setItem('personalizedPlan', JSON.stringify(response.data));
            } catch (error) {
                console.error('Error fetching personalized plan:', error);
            }
        }

        fetchPersonalizedPlan();
    }, [data, currentUser.id]);

    const handleRetakeForm = () => {
        localStorage.removeItem('personalizedPlan');
        navigate('/step1');
    };

    function renderPersonalizedPlan() {
        if (!personalizedPlan) {
            return <Loader />;
        }

        return (
            <Container className="my-5">
                <Card>
                    <Card.Body>
                        <Card.Title>Your Personal Health Plan</Card.Title>
                        <Card.Subtitle className="mb-3 text-muted">
                            Based on your answers, here's a personalized plan:
                        </Card.Subtitle>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <strong>Dietary Suggestions:</strong>
                                <pre>{personalizedPlan.dietRecommendations}</pre>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Exercise Routines:</strong>
                                <pre>{personalizedPlan.exerciseRecommendations}</pre>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Lifestyle Recommendations:</strong>
                                <pre>{personalizedPlan.generalTips}</pre>
                            </ListGroup.Item>
                        </ListGroup>
                        <p className="mt-3">Get started on your journey to a healthier you!</p>
                        <Button variant="dark" onClick={handleRetakeForm}>
                            Retake Form
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return <div>{renderPersonalizedPlan()}</div>;
}

export default Result;
