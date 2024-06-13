import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Item from "./Item";
import axios from "axios";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJndWVzdEBtYWlsLmNvbSIsImlhdCI6MTcxODA0NTY1NSwiZXhwIjoxNzE4MTMyMDU1fQ.QS54YjSzgA-IAbb5d16IbLbSJYD7eC9lLrJkOFQY0NM";
        const response = await axios.get(
          "http://localhost:8090/api/v1/products/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching the items", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <Container
      className="p-5"
      style={{
        background: "#f0f0f0",
      }}
    >
      <Row>
        {items.map((item) => (
          <Col key={item.id} lg={3} md={4} sm={6} xs={12} className="mt-4">
            <Item
              id={item.id}
              title={item.brand}
              text={`Price: $${item.unitPrice}`}
              imgSrc={item.imagePath}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemList;
