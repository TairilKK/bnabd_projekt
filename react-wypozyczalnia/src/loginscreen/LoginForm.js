import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <Col xs={12} md={6}>
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
          <Col xs={12} md={5} className="mt-3 ps-2 pe-2">
            <Button variant="info" type="button" className="w-100">
              Zaloguj się
            </Button>
          </Col>
          <Col xs={12} md={5} className="mt-3 ps-2 pe-2">
            <Link to="/register">
              <Button variant="light" type="submit" className="w-100">
                Zarejestruj się
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default LoginForm;
