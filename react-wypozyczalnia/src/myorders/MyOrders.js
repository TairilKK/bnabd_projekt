import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  ListGroup,
  Row,
  Col,
  Form,
  FormGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import axios from "axios";
import { toast } from "react-toastify";

const MyOrders = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("rentStart");
  const [sortDir, setSortDir] = useState("asc");

  const clientId = localStorage.getItem("clientId");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (clientId) {
      axios
        .get(`http://localhost:8090/api/v1/rents/client`, {
          params: {
            clientId: clientId,
            page: currentPage,
            size: pageSize,
            sortBy: sortBy,
            sortDir: sortDir,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setItems(response.data.content);
          setTotalPages(response.data.totalPages);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setItems([]); // Ustawienie items jako pustej tablicy w przypadku błędu
        });
    }
  }, [clientId, currentPage, pageSize, sortBy, sortDir]);

  const handleCancel = async (rentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8090/api/v1/rents/${rentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Zamówienie zostało anulowane.");
      setItems(items.filter((item) => item.rentId !== rentId));
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Wystąpił błąd podczas anulowania zamówienia.");
    }
  };

  const handleSortChange = (field) => {
    const newSortDir = sortBy === field && sortDir === "asc" ? "desc" : "asc";
    setSortBy(field);
    setSortDir(newSortDir);
    setCurrentPage(0); // Reset page to 0 when sort changes
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

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
          backgroundSize: "cover",
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
          <FormGroup className="pb-4">
            <Row>
              <Col md={8}>
                <Form.Label className="mt-1">Sortuj według:</Form.Label>
                <Form.Control
                  as="select"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="rentStart">Data rozpoczęcia</option>
                  <option value="rentPrice">Cena</option>
                  <option value="isCompleted">Status</option>
                </Form.Control>
              </Col>
            </Row>
          </FormGroup>

          <ListGroup horizontal className="mb-2 d-none d-lg-flex">
            <ListGroup.Item
              style={{ ...flexStyle, flex: 1, fontWeight: "bold" }}
            >
              Id zamówienia
            </ListGroup.Item>
            <ListGroup.Item
              style={{ ...flexStyle, flex: 2, fontWeight: "bold" }}
            >
              Produkt
            </ListGroup.Item>
            <ListGroup.Item
              style={{ ...flexStyle, flex: 3, fontWeight: "bold" }}
            >
              Kategoria
            </ListGroup.Item>
            <ListGroup.Item
              style={{ ...flexStyle, flex: 2, fontWeight: "bold" }}
            >
              Data rozpoczęcia
            </ListGroup.Item>
            <ListGroup.Item
              style={{ ...flexStyle, flex: 2, fontWeight: "bold" }}
            >
              Data zakończenia
            </ListGroup.Item>
            <ListGroup.Item
              style={{ ...flexStyle, flex: 1, fontWeight: "bold" }}
            >
              Ilość
            </ListGroup.Item>
            <ListGroup.Item
              style={{ ...flexStyle, flex: 2, fontWeight: "bold" }}
            >
              Cena
            </ListGroup.Item>
            <ListGroup.Item
              style={{ ...flexStyle, flex: 2, fontWeight: "bold" }}
            >
              Status
            </ListGroup.Item>
            <ListGroup.Item
              style={{ ...flexStyle, flex: 1, fontWeight: "bold" }}
            >
              Akcja
            </ListGroup.Item>
          </ListGroup>

          <Row>
            {items.map((item) => (
              <ListGroup
                horizontal
                className="mb-1 d-none d-lg-flex"
                key={item.rentId}
              >
                <ListGroup.Item style={{ ...flexStyle, flex: 1 }}>
                  {item.rentId}
                </ListGroup.Item>
                <ListGroup.Item style={{ ...flexStyle, flex: 2 }}>
                  <Link to={`/product/${item.productId}`}>
                    {item.productId}
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item style={{ ...flexStyle, flex: 3 }}>
                  {item.productCategory}
                </ListGroup.Item>
                <ListGroup.Item style={{ ...flexStyle, flex: 2 }}>
                  {new Date(item.rentStart).toLocaleDateString()}
                </ListGroup.Item>
                <ListGroup.Item style={{ ...flexStyle, flex: 2 }}>
                  {new Date(item.rentEnd).toLocaleDateString()}
                </ListGroup.Item>
                <ListGroup.Item style={{ ...flexStyle, flex: 1 }}>
                  {item.quantity}
                </ListGroup.Item>
                <ListGroup.Item style={{ ...flexStyle, flex: 2 }}>
                  {item.rentPrice} zł
                </ListGroup.Item>
                <ListGroup.Item style={{ ...flexStyle, flex: 2 }}>
                  {item.isCompleted ? "Zrealizowano" : "Nie zrealizowano"}
                </ListGroup.Item>
                <ListGroup.Item style={{ ...flexStyle, flex: 1 }}>
                  <Button
                    variant="warning"
                    onClick={() => handleCancel(item.rentId)}
                  >
                    anuluj
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            ))}
          </Row>

          <div className="d-flex justify-content-between mt-3">
            <Button onClick={handlePreviousPage} disabled={currentPage === 0}>
              Poprzednia
            </Button>
            <span>
              Strona {currentPage + 1} z {totalPages}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
            >
              Następna
            </Button>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

const flexStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default MyOrders;
