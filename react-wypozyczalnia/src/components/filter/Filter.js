import { Container, Row, Col, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ category, setCategory, brand, setBrand }) => {
  const [categoryNames, setCategoryNames] = useState(["WSZYSTKIE"]);
  const [brandNames, setBrandNames] = useState(["WSZYSTKIE"]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/api/v1/category/allnames"
        );
        const categories = response.data.map((item) => item.categoryName);
        setCategoryNames(["WSZYSTKIE", ...categories]);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/api/v1/products/allbrands"
        );
        setBrandNames(["WSZYSTKIE", ...response.data]);
      } catch (error) {
        console.error("Error fetching brands", error);
      }
    };

    fetchCategories();
    fetchBrands();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="categorySelect">
              <Form.Label>Kategoria:</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={handleCategoryChange}
              >
                {categoryNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="brandSelect">
              <Form.Label>Firma:</Form.Label>
              <Form.Control
                as="select"
                value={brand}
                onChange={handleBrandChange}
              >
                {brandNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Filter;
