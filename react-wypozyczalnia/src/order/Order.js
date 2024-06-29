import React, { useState, useEffect } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import Footer from "../components/footer/Footer";

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
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div
        className="flex-grow-1 p-5"
        style={{
          backgroundImage: `url("background_2xres.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", // ensure the image covers the whole container
          backgroundColor: "#dbf2ff",
          paddingTop: "25px",
          paddingBottom: "25px",
        }}
      >
        <Container
          className="p-5"
          style={{
            backgroundColor: "rgba(240, 240, 240, 0.9)",
            flexGrow: 1,
            borderRadius: "30px",
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
      <Footer />
    </div>
  );
};

export default Order;
