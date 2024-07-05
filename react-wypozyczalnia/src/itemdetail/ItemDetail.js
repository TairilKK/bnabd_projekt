import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row, ListGroup, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import Navbar from "../components/navbar/Navbar";
import "react-datepicker/dist/react-datepicker.css";
import "../itemdetail/DataPicker.css";
import NumberSpinner from "../components/item/NumberSpinner";
import axios from "axios";
import Footer from "../components/footer/Footer";
import { toast } from "react-toastify";
import Item from "../components/item/Item";

const ItemDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [role, setRole] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const today = new Date(); // Dzisiejsza data

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

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8090/api/v1/products/recommendations?id=${id}`
        );
        setRelatedProducts(response.data);
      } catch (error) {
        console.error("Error fetching related products", error);
      }
    };

    fetchRelatedProducts();
  }, [id]);

  const handleSelect = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const calculateRentPrice = () => {
    if (!startDate || !endDate || !product) return 0;

    const sameDay = startDate.getTime() === endDate.getTime();

    if (sameDay) {
      return quantity * product.unitPrice;
    }

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
        toast.error("Brak wystarczającej ilości sprzętu na wybrany termin.", {
          position: "bottom-right",
        });
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
      toast.success("Rezerwacja zakończona sukcesem!", {
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error making the reservation", error);
      toast.error("Wystąpił błąd podczas dokonywania rezerwacji.", {
        position: "bottom-right",
      });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div
        className="flex-grow-1 p-5"
        style={{
          backgroundImage: `url("../background_2xres.jpg"), linear-gradient(to bottom, #fff, #f0f0f0, #fff)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundColor: "#dbf2ff",
          paddingTop: "25px",
          paddingBottom: "25px",
        }}
      >
        <Container
          className="py-1 px-5"
          style={{
            backgroundColor: "rgba(240, 240, 240, 0.9)",
            flexGrow: 1,
            borderRadius: "30px",
          }}
        >
          <Row className="mb-5 mt-5">
            <Col xs={12} md={5} className="mb-4 mb-md-0">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "10px",
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
            <Col
              xs={6}
              md={3}
              className="mb-4 mb-md-0 flex-column align-items-center"
            >
              <h4 className="p-2 text-center">
                {product.brand} {product.model}
              </h4>
              <ListGroup className="w-100">
                <ListGroup.Item>Rozmiar: {product.size}</ListGroup.Item>
                <ListGroup.Item>Cena: {product.unitPrice} zł</ListGroup.Item>
                <ListGroup.Item>
                  Dostępność: {product.availability}
                </ListGroup.Item>
              </ListGroup>
              <div className="w-100 mt-3">
                <p>Wybierz ilość:</p>
                <NumberSpinner
                  value={quantity}
                  maxQuantity={product.availability}
                  onChange={(val) => setQuantity(val)}
                />
                <Button
                  className="mt-3 w-100"
                  style={{ backgroundColor: "#02354f" }}
                  onClick={handleReserve}
                >
                  Zarezerwuj
                </Button>
              </div>
            </Col>
            <Col xs={6} md={2} className="mb-4 mb-md-0 d-flex flex-column">
              <div className="mt-5">
                <DatePicker
                  selected={startDate}
                  onChange={handleSelect}
                  startDate={startDate}
                  endDate={endDate}
                  minDate={today} // Ustawienie minimalnej daty na dzisiejszą datę
                  selectsRange
                  inline
                />
              </div>
            </Col>
          </Row>
        </Container>

        <Container
          className="mt-5 py-3 px-5"
          style={{
            backgroundColor: "rgba(240, 240, 240, 0.9)",
            flexGrow: 1,
            borderRadius: "30px",
          }}
        >
          <h5>Polecamy również:</h5>
          <Row>
            {relatedProducts.map((item) => (
              <Col
                key={item.id}
                lg={3}
                md={4}
                sm={6}
                xs={12}
                className="mt-4 mb-4"
              >
                <Item
                  id={item.id}
                  title={item.brand}
                  text={item.unitPrice}
                  size={item.size}
                  imgSrc={"../" + item.imagePath}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default ItemDetail;
