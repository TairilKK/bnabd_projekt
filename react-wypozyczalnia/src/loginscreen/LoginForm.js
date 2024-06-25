import { Button, Col, Form, Row } from "react-bootstrap";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const LoginForm = () => {
  const { setUser } = useContext(UserContext);
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
    console.log("Sending login request with data:", formData);
    axios
      .post("http://localhost:8090/api/v1/auth/authenticate", formData)
      .then((response) => {
        console.log("Logged in:", response.data);
        const user = response.data.user;
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        console.log("User set in context:", user);
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error logging in!", error);
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Error request data:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
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
