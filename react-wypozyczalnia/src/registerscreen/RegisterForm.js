import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "CLIENT",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    const nameRegex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;
    const phoneRegex = /^\+\d{2} ?\d{3} ?\d{3} ?\d{3}$/;

    if (!formData.firstName) {
      errors.firstName = "Imię jest wymagane";
    } else if (!nameRegex.test(formData.firstName)) {
      errors.firstName = "Imię może zawierać tylko litery";
    }

    if (!formData.lastName) {
      errors.lastName = "Nazwisko jest wymagane";
    } else if (!nameRegex.test(formData.lastName)) {
      errors.lastName = "Nazwisko może zawierać tylko litery";
    }

    if (!formData.phoneNumber) {
      errors.phoneNumber = "Numer telefonu jest wymagany";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber =
        "Numer telefonu musi być w formacie +48 123 456 789 lub +48123456789";
    }

    if (!formData.email) {
      errors.email = "Email jest wymagany";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email jest nieprawidłowy";
    }

    if (!formData.password) {
      errors.password = "Hasło jest wymagane";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Potwierdzenie hasła jest wymagane";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Hasła nie są zgodne";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
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
          toast.success("Rejestracja zakończona sukcesem!");
          navigate("/login");
        })
        .catch((error) => {
          console.error("There was an error registering!", error);
          toast.error("Błąd podczas rejestracji. Spróbuj ponownie.");
        });
    }
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
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
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
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
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
            isInvalid={!!errors.phoneNumber}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phoneNumber}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 ps-1 pe-1">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="jan.kowalski@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 ps-1 pe-1">
          <Form.Label>Hasło:</Form.Label>
          <Form.Control
            type="password"
            placeholder="********"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 ps-1 pe-1">
          <Form.Label>Powtórz hasło:</Form.Label>
          <Form.Control
            type="password"
            placeholder="********"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            isInvalid={!!errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="info" type="submit" className="w-100 mt-4">
          Zarejestruj się
        </Button>
      </Form>
    </Col>
  );
};

export default RegisterForm;
