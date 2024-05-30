import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Item from "./Item";

const ItemList = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Card title 1",
      text: "Some quick example text",
      imgSrc: "/logo.svg",
    },
    {
      id: 2,
      title: "Card title 2",
      text: "Some quick example text",
      imgSrc: "/logo.svg",
    },
    {
      id: 3,
      title: "Card title 3",
      text: "Some quick example text",
      imgSrc: "/logo.svg",
    },
    {
      id: 4,
      title: "Card title 4",
      text: "Some quick example text",
      imgSrc: "/logo.svg",
    },
  ]);

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      title: `Card title ${items.length + 1}`,
      text: "Some quick example text",
      imgSrc: "/logo.svg",
    };
    setItems([...items, newItem]);
  };

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
            <Item title={item.title} text={item.text} imgSrc={item.imgSrc} />
          </Col>
        ))}
      </Row>
      <Button onClick={addItem} className="mt-4">
        Add Item
      </Button>
    </Container>
  );
};

export default ItemList;
