import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Item from "./Item";
import Filter from "../filter/Filter";
import axios from "axios";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("WSZYSTKIE");

  useEffect(() => {
    fetchItems(category);
  }, [category]);

  const fetchItems = async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:8090/api/v1/products/category`,
        {
          params: { categoryName: category },
        }
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching the items", error);
    }
  };

  return (
    <Container
      className="p-5"
      style={{
        background: "#f0f0f0",
      }}
    >
      <Filter category={category} setCategory={setCategory} />
      <Row>
        {items.map((item) => (
          <Col key={item.id} lg={3} md={4} sm={6} xs={12} className="mt-4">
            <Item
              id={item.id}
              title={item.brand}
              text={item.unitPrice}
              size={item.size}
              imgSrc={item.imagePath}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemList;
