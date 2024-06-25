import { Container, Form } from "react-bootstrap";
import React from "react";

const Filter = ({ category, setCategory }) => {
  const categoryNames = [
    "WSZYSTKIE",
    "NARTY",
    "KASKI",
    "KIJKI",
    "GOGLE",
    "SNOWBOARD",
    "BUTY NARCIARSKIE",
    "BUTY SNOWBOARDOWE",
  ];

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <Container>
      <Form>
        <Form.Group controlId="categorySelect">
          <Form.Label>Wybierz kategorię:</Form.Label>
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
      </Form>
    </Container>
  );
};

export default Filter;
