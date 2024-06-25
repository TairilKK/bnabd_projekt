import React, { useState, useEffect } from "react";
import { Button, Col, Container, Image, Row, ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import Navbar from "../components/navbar/Navbar";
import "react-datepicker/dist/react-datepicker.css";
import "../itemdetail/DataPicker.css";
import NumberSpinner from "../components/item/NumberSpinner";
import axios from "axios";

const ItemDetail = () => {
  const { id } = useParams(); // Pobranie ID z URL
  const [product, setProduct] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8090/api/v1/products/product?id=${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching the product data", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSelect = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <Container
        className="py-5 px-4"
        style={{
          backgroundColor: "#f0f0f0",
        }}
      >
        <Row className="mb-5 pt-4">
          <Col xs={12} md={5} className="mb-4 mb-md-0">
            <h4 className="ms-5">
              {product.brand} {product.model}
            </h4>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
              }}
            >
              <Image
                src={"../" + product.imagePath}
                className="img-fluid p-3"
                style={{
                  maxHeight: "600px",
                  width: "auto",
                  maxWidth: "100%",
                }}
                alt="Card image cap"
              />
            </div>
          </Col>
          <Col xs={5} md={2} className="ms-5 mb-4 mb-md-0">
            <ListGroup variant="flush">
              <ListGroup.Item>Rozmiar: {product.size}</ListGroup.Item>
              <ListGroup.Item>Cena: {product.unitPrice} zł</ListGroup.Item>
              <ListGroup.Item>
                Dostępność: {product.availability}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col xs={5} md={2} className="ms-5 mb-4 mb-md-0">
            <DatePicker
              selected={startDate}
              onChange={handleSelect}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
            <div>
              <p>Wybierz ilość:</p>
              <NumberSpinner />
              <Link to="/login">
                <Button
                  className="mt-3"
                  style={{
                    backgroundColor: "#02354f",
                  }}
                >
                  Zarezerwuj
                </Button>
              </Link>
            </div>
            <div>
              <p>Start Date: {startDate ? startDate.toString() : ""}</p>
              <p>End Date: {endDate ? endDate.toString() : ""}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ItemDetail;
