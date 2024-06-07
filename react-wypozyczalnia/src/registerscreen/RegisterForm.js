import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <Col xs={12} md={6}>
      <Form>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3 ps-1 pe-1">
              <Form.Label>Imię:</Form.Label>
              <Form.Control type="text" placeholder="Imię" />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3 ps-1 pe-1">
              <Form.Label>Nazwisko:</Form.Label>
              <Form.Control type="text" placeholder="Nazwisko" />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3 ps-1 pe-1">
          <Form.Label>Numer telefonu:</Form.Label>
          <Form.Control type="tel" placeholder="+48 123 456 789" />
        </Form.Group>

        <Form.Group className="mb-3 ps-1 pe-1">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" placeholder="jan.kowalski@email.com" />
        </Form.Group>

        <Form.Group className="mb-3 ps-1 pe-1">
          <Form.Label>Hasło:</Form.Label>
          <Form.Control type="password" placeholder="********" />
        </Form.Group>

        <Form.Group className="mb-3 ps-1 pe-1">
          <Form.Label>Powtórz hasło:</Form.Label>
          <Form.Control type="password" placeholder="********" />
        </Form.Group>

        <Link to="/login">
          <Button variant="info" type="submit" className="w-100 mt-4">
            Zarejestruj się
          </Button>
        </Link>
      </Form>
    </Col>
  );
};

export default RegisterForm;
