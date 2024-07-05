import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  Container,
  ThemeProvider,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    size: "",
    type: "",
    unitPrice: "",
    availability: "",
    conditionState: "",
    category: "",
    imagePath: "",
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/v1/products/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Błąd przy pobieraniu kategorii!", error);
        toast.error("Błąd przy pobieraniu kategorii. Spróbuj ponownie.", {
          position: "bottom-right",
        });
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = {
      ...formData,
      category: {
        categoryName: formData.category,
      },
    };

    axios
      .post("http://localhost:8090/api/v1/products/add", formDataToSend)
      .then((response) => {
        console.log(response.data);
        toast.success("Produkt dodany pomyślnie!", {
          position: "bottom-right",
        });
        setFormData({
          brand: "",
          model: "",
          size: "",
          type: "",
          unitPrice: "",
          availability: "",
          conditionState: "",
          category: "",
          imagePath: "",
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Błąd przy dodawaniu produktu!", error);
        toast.error("Błąd przy dodawaniu produktu. Spróbuj ponownie.", {
          position: "bottom-right",
        });
      });
  };

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{ background: "linear-gradient(-15deg, #4a87a2, #86cce9)" }}
      >
        <Container
          className="align-self-center px-5 m-5"
          style={{
            backgroundColor: "#fff",
            borderRadius: "15px",
            maxWidth: "800px",
          }}
        >
          <div
            className="p-3 pt-5"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="justify-content-md-center"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Link to="/">
                <Image
                  src="/logo.svg"
                  className="img-fluid m-3"
                  style={{
                    width: "100px",
                    minWidth: "10%",
                    height: "auto",
                  }}
                />
              </Link>
              <h2>Dodaj Produkt</h2>
            </div>
          </div>

          <Row className="justify-content-md-center mb-5 pt-4">
            <Col xs={12} md={12}>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3 ps-1 pe-1">
                      <Form.Label>Marka:</Form.Label>
                      <Form.Control
                        type="text"
                        name="brand"
                        placeholder="Marka"
                        value={formData.brand}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3 ps-1 pe-1">
                      <Form.Label>Model:</Form.Label>
                      <Form.Control
                        type="text"
                        name="model"
                        placeholder="Model"
                        value={formData.model}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3 ps-1 pe-1">
                      <Form.Label>Rozmiar:</Form.Label>
                      <Form.Control
                        type="text"
                        name="size"
                        placeholder="Rozmiar"
                        value={formData.size}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3 ps-1 pe-1">
                      <Form.Label>Typ:</Form.Label>
                      <Form.Control
                        type="text"
                        name="type"
                        placeholder="Typ"
                        value={formData.type}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3 ps-1 pe-1">
                      <Form.Label>Cena Jednostkowa:</Form.Label>
                      <Form.Control
                        type="number"
                        name="unitPrice"
                        placeholder="Cena Jednostkowa"
                        value={formData.unitPrice}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3 ps-1 pe-1">
                      <Form.Label>Dostępność:</Form.Label>
                      <Form.Control
                        type="number"
                        name="availability"
                        placeholder="Dostępność"
                        value={formData.availability}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3 ps-1 pe-1">
                      <Form.Label>Stan:</Form.Label>
                      <Form.Control
                        type="text"
                        name="conditionState"
                        placeholder="Stan"
                        value={formData.conditionState}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3 ps-1 pe-1">
                      <Form.Label>Kategoria:</Form.Label>
                      <Form.Control
                        as="select"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="">Wybierz kategorię</option>
                        {categories.map((category) => (
                          <option
                            key={category.categoryId}
                            value={category.categoryName}
                          >
                            {category.categoryName}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3 ps-1 pe-1">
                  <Form.Label>Ścieżka Obrazu:</Form.Label>
                  <Form.Control
                    type="text"
                    name="imagePath"
                    placeholder="Ścieżka Obrazu"
                    value={formData.imagePath}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Row className="justify-content-md-center">
                  <Col xs={12} md={5} className="mt-3 ps-2 pe-2">
                    <Button variant="info" type="submit" className="w-100">
                      Dodaj Produkt
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
};

export default AddProductForm;
