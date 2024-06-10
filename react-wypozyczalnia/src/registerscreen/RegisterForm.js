import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "CLIENT", // Domyślna rola
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8090/api/v1/auth/register", {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        password: formData.password,
        phonenumber: formData.phoneNumber,
        role: formData.role,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("There was an error registering!", error);
      });
  };

  return (
    <Col xs={12} md={6}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3 ps-1 pe-1">
              <Form.Label>Imię:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Imię"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3 ps-1 pe-1">
              <Form.Label>Nazwisko:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nazwisko"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3 ps-1 pe-1">
          <Form.Label>Numer telefonu:</Form.Label>
          <Form.Control
            type="tel"
            placeholder="+48 123 456 789"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </Form.Group>

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

        <Form.Group className="mb-3 ps-1 pe-1">
          <Form.Label>Powtórz hasło:</Form.Label>
          <Form.Control
            type="password"
            placeholder="********"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="info" type="submit" className="w-100 mt-4">
          Zarejestruj się
        </Button>
      </Form>
    </Col>
  );
};

export default RegisterForm;
