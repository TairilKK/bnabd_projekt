import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../components/apiClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    apiClient
      .post("/auth/authenticate", formData)
      .then((response) => {
        console.log("Logged in:", response.data);
        if (response.data.access_token) {
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("role", response.data.user.role);
          console.log(
            "Token zapisany w localStorage:",
            localStorage.getItem("token")
          );
          navigate("/");
        } else {
          console.error("No access token found in response");
          toast.error("Brak tokenu dostępu w odpowiedzi");
        }
      })
      .catch((error) => {
        console.error("There was an error logging in!", error);
        toast.error("Błąd logowania. Sprawdź swoje dane i spróbuj ponownie.");
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
