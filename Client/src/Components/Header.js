import React, { useState } from "react";
import { Navbar, Nav, Container, Modal, Button, Form } from "react-bootstrap";
import image from '../Images/healthhive-favicon-white.png';
import api from '../Services/Api'

const Header = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await api.login(email, password);

            if (response.success) {
                // Handle successful login
                console.log('Login successful:', email);
                setShowLoginModal(false);
                // setLoginError(null); // Clear any previous error
            } else {
                // Handle login failure
                console.log('Login failed:', response.message);
                // setLoginError(response.message); // Set an error state for displaying in the modal
            }
        } catch (error) {
            console.error('Error during login:', error);
            // setLoginError('Error during login'); // Set an error state for displaying in the modal
        }
    };


    return (
        <header>
            <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>
                        <img
                            src={image}
                            alt={'logo'}
                            height="70"
                            width="70"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link onClick={() => setShowLoginModal(true)}>
                                <i className="fas fa-user"></i> Log In
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Login Modal */}
            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={handleLogin}>
                            Log In
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </header>
    );
};

export default Header;

