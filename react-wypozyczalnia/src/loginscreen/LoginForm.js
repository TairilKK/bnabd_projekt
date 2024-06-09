import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8090/api/v1/users/login", formData)
      .then((response) => {
        console.log("Logged in:", response.data);
        navigate("/home"); // Przekierowanie na stronę główną po zalogowaniu
      })
      .catch((error) => {
        console.error("There was an error logging in!", error);
      });
  };

  return (
    <Col xs={12} md={6}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 ps-1 pe-1">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="jan.kowalski@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 ps-1 pe-1">
          <Form.Label>Hasło:</Form.Label>
          <Form.Control
            type="password"
            placeholder="********"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Row className="justify-content-md-center">
          <Col xs={12} md={5} className="mt-3 ps-2 pe-2">
            <Button variant="info" type="submit" className="w-100">
              Zaloguj się
            </Button>
          </Col>
          <Col xs={12} md={5} className="mt-3 ps-2 pe-2">
            <Link to="/register">
              <Button variant="light" className="w-100">
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
