import React, { useState } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import Navbar from "../components/navbar/Navbar";

const Order = () => {
  const [items, setItems] = useState(["Przedmiot 1", "Przedmiot 2"]);

  const addItem = () => {
    const newItem = `Przedmiot ${items.length + 1}`;
    setItems([...items, newItem]);
  };

  return (
    <div
      className="justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(-15deg, #4a87a2, #86cce9)",
      }}
    >
      <Navbar />
      <Container
        className="py-5 px-4 justify-content-center align-items-center min-vh-100"
        style={{
          backgroundColor: "#f0f0f0",
        }}
      >
        <Button onClick={addItem} className="mb-3">
          Dodaj przedmiot
        </Button>
        <ListGroup variant="flush">
          {items.map((item, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center mb-1"
            >
              {item}
              <Button variant="warning" className="ml-auto">
                Anuluj rezerwację
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default Order;
