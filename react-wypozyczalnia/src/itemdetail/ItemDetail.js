import React, { useState, useEffect } from "react";
import { Button, Col, Container, Image, Row, ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import Navbar from "../components/navbar/Navbar";
import "react-datepicker/dist/react-datepicker.css";
import "../itemdetail/DataPicker.css";
import NumberSpinner from "../components/item/NumberSpinner";
import axios from "axios";
import { toast } from "react-toastify";

const ItemDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [role, setRole] = useState(null);

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

    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, [id]);

  const handleSelect = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const calculateRentPrice = () => {
    if (!startDate || !endDate || !product) return 0;
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return quantity * product.unitPrice * diffDays;
  };

  const checkAvailability = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8090/api/v1/rents/availability`,
        {
          params: {
            productId: id,
            startDate: startDate.toISOString().split("T")[0],
            endDate: endDate.toISOString().split("T")[0],
            requestedQuantity: quantity,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error checking availability", error);
      return false;
    }
  };

  const handleReserve = async () => {
    try {
      const clientId = localStorage.getItem("clientId");
      const token = localStorage.getItem("token");

      if (!clientId || !id || !startDate || !endDate || quantity <= 0) {
        throw new Error("Invalid input");
      }

      const available = await checkAvailability();
      if (!available) {
        toast.error("Brak wystarczającej ilości sprzętu na wybrany termin.");
        return;
      }

      const rentRequest = {
        clientId: parseInt(clientId),
        productId: parseInt(id),
        quantity: quantity,
        rentPrice: calculateRentPrice(),
        rentStart: startDate.toISOString().split("T")[0],
        rentEnd: endDate.toISOString().split("T")[0],
      };

      const response = await axios.post(
        `http://localhost:8090/api/v1/rents/reserve`,
        rentRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Reservation successful:", response.data);
      toast.success("Rezerwacja zakończona sukcesem!");
    } catch (error) {
      console.error("Error making the reservation", error);
      toast.error("Wystąpił błąd podczas dokonywania rezerwacji.");
    }
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
                minHeight: "500px",
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
              <NumberSpinner
                value={quantity}
                maxQuantity={product.availability}
                onChange={(val) => setQuantity(val)}
              />
              <Button
                className="mt-3"
                style={{
                  backgroundColor: "#02354f",
                }}
                onClick={handleReserve}
              >
                Zarezerwuj
              </Button>
            </div>
            <div>
              <p>Start Date: {startDate ? startDate.toString() : ""}</p>
              <p>End Date: {endDate ? endDate.toString() : ""}</p>
              <p>Cena wynajmu: {calculateRentPrice()} zł</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ItemDetail;
