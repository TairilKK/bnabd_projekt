import React, { useState, useEffect } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";

const Order = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/v1/rents/all")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
        <ListGroup variant="flush">
          {items.map((item) => (
            <ListGroup.Item
              key={item.rentId}
              className="d-flex justify-content-between align-items-center mb-1"
            >
              <div className="d-flex align-items-center w-100">
                <div className="mr-3 me-1">{item.rentId}.</div>{" "}
                <div className="mr-3 me-4">{item.brand}</div>{" "}
                <div className="mr-3 me-4">
                  {" "}
                  {new Date(item.start).toLocaleDateString()}
                </div>{" "}
                <div className="mr-3 me-1">
                  {new Date(item.end).toLocaleDateString()}
                </div>
              </div>
              <Button variant="warning" className="ml-auto">
                Pzyjmij
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default Order;
