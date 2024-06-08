import React, { useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { ListGroup } from "react-bootstrap";
import Navbar from "../components/navbar/Navbar";
import "react-datepicker/dist/react-datepicker.css";
import "../itemdetail/DataPicker.css";
import NumberSpinner from "../components/item/NumberSpinner";

const ItemDetail = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSelect = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

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
            <h4 className="ms-5">MARKA MODEL</h4>
            <Image
              src="/logo.svg"
              className="img-fluid p-3"
              style={{
                width: "600px",
                maxWidth: "100%",
              }}
            />
          </Col>
          <Col xs={5} md={2} className="ms-5 mb-4 mb-md-0">
            <ListGroup variant="flush">
              <ListGroup.Item>Rozmiar:</ListGroup.Item>
              <ListGroup.Item>Cena:</ListGroup.Item>
              <ListGroup.Item>Dostępność:</ListGroup.Item>
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
