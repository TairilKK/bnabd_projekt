import React from "react";
import Button from 'react-bootstrap/Button';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import 'bootstrap/dist/css/bootstrap.min.css';

const Loginscreen = () => {
    return (
        <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xxs"
        >
            <div className="d-flex vh-100" style={{ background: 'linear-gradient(-15deg, #4a87a2, #86cce9)' }}>
                <Container className="align-self-center mb-5 pt-5" style={{ backgroundColor: '#fff', borderRadius: '15px'}}>
                    <Row className="justify-content-md-center mb-5 pt-4">

                        <Col xs={12} md={5} className="text-center">
                            <Image src="/logo.png" style={{ width: '200px', height: '200px' }}/>
                            <h2>Zaloguj się</h2>
                        </Col>

                        <Col xs={12} md={5}>
                            <Form>
                                <Form.Group className="mb-3 ps-1 pe-1">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="email" placeholder="jan.kowalski@email.com" />
                                </Form.Group>

                                <Form.Group className="mb-3 ps-1 pe-1">
                                    <Form.Label>Hasło:</Form.Label>
                                    <Form.Control type="password" placeholder="********" />
                                </Form.Group>

                                <Row className="justify-content-md-center">
                                    <Col xs={6} md={5} className="mt-3 ps-2 pe-2">
                                        <Button variant="info" type="submit" className="w-100">
                                            Zaloguj się
                                        </Button>
                                    </Col>
                                    <Col xs={6} md={5} className="mt-3 ps-2 pe-2">
                                        <Button variant="light" type="submit" className="w-100">
                                            Zarejestruj się
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default Loginscreen;
