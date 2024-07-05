import React, { useState, useEffect } from "react";
import { Button, Container, ListGroup, Row, Col, Form } from "react-bootstrap";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import Footer from "../components/footer/Footer";

const Order = () => {
  const [items, setItems] = useState([]);
  const [role, setRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(10);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    if (userRole === "EMPLOYEE") {
      fetchRents(currentPage);
    }
  }, [currentPage]);

  const fetchRents = (page) => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8090/api/v1/rents/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
          size: pageSize,
        },
      })
      .then((response) => {
        setItems(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleCompletedChange = (rentId, currentStatus) => {
    const token = localStorage.getItem("token");
    const newStatus = !currentStatus;

    axios
      .put(
        `http://localhost:8090/api/v1/rents/update/${rentId}`,
        { isCompleted: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.rentId === rentId ? { ...item, isCompleted: newStatus } : item
          )
        );
      })
      .catch((error) => {
        console.error("There was an error updating the rent status!", error);
      });
  };
  const handleRecivedChange = (rentId, currentStatus) => {
    const token = localStorage.getItem("token");
    const newStatus = !currentStatus;

    axios
      .put(
        `http://localhost:8090/api/v1/rents/update/${rentId}`,
        { isRecived: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.rentId === rentId ? { ...item, isRecived: newStatus } : item
          )
        );
      })
      .catch((error) => {
        console.error("There was an error updating the rent status!", error);
      });
  };

  const handleCancel = (rentId) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:8090/api/v1/rents/${rentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setItems((prevItems) =>
          prevItems.filter((item) => item.rentId !== rentId)
        );
      })
      .catch((error) => {
        console.error("There was an error cancelling the rent!", error);
      });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  if (role !== "EMPLOYEE") {
    return <div>Nie masz uprawnień do przeglądania tej strony.</div>;
  }

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
          <ListGroup horizontal className="mb-2 d-none d-lg-flex">
            <ListGroup.Item style={{ flex: 1, fontWeight: "bold" }}>
              ID
            </ListGroup.Item>
            <ListGroup.Item style={{ flex: 2, fontWeight: "bold" }}>
              ID Produktu
            </ListGroup.Item>
            <ListGroup.Item style={{ flex: 1, fontWeight: "bold" }}>
              Ilość
            </ListGroup.Item>
            <ListGroup.Item style={{ flex: 2, fontWeight: "bold" }}>
              Data Start
            </ListGroup.Item>
            <ListGroup.Item style={{ flex: 2, fontWeight: "bold" }}>
              Data Koniec
            </ListGroup.Item>
            <ListGroup.Item style={{ flex: 2, fontWeight: "bold" }}>
              Cena
            </ListGroup.Item>
            <ListGroup.Item style={{ flex: 2, fontWeight: "bold" }}>
              Wydano
            </ListGroup.Item>
            <ListGroup.Item style={{ flex: 2, fontWeight: "bold" }}>
              Zrealizowane
            </ListGroup.Item>
            <ListGroup.Item style={{ flex: 1, fontWeight: "bold" }}>
              Akcje
            </ListGroup.Item>
          </ListGroup>

          {items.length === 0 ? (
            <div className="text-center my-5">
              Brak zamówień do wyświetlenia.
            </div>
          ) : (
            items.map((item) => (
              <React.Fragment key={item.rentId}>
                <ListGroup
                  horizontal
                  className="mb-1 d-none d-lg-flex"
                  key={item.rentId}
                >
                  <ListGroup.Item style={{ flex: 1 }}>
                    {item.rentId}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ flex: 2 }}>
                    {item.productId}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ flex: 1 }}>
                    {item.quantity}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ flex: 2 }}>
                    {new Date(item.rentStart).toLocaleDateString()}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ flex: 2 }}>
                    {new Date(item.rentEnd).toLocaleDateString()}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ flex: 2 }}>
                    {item.rentPrice}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ flex: 2 }}>
                    <Form.Check
                      type="switch"
                      id={`switch-${item.rentId}`}
                      checked={item.isRecived}
                      onChange={() =>
                        handleRecivedChange(item.rentId, item.isRecived)
                      }
                    />
                  </ListGroup.Item>
                  <ListGroup.Item style={{ flex: 2 }}>
                    <Form.Check
                      type="switch"
                      id={`switch-${item.rentId}`}
                      checked={item.isCompleted}
                      onChange={() =>
                        handleCompletedChange(item.rentId, item.isCompleted)
                      }
                    />
                  </ListGroup.Item>
                  <ListGroup.Item style={{ flex: 1 }}>
                    <Button
                      variant="danger"
                      onClick={() => handleCancel(item.rentId)}
                    >
                      Anuluj
                    </Button>
                  </ListGroup.Item>
                </ListGroup>

                <Row className="d-lg-none">
                  <Col>
                    <ListGroup.Item>
                      <strong>ID:</strong> {item.rentId}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>ID Produktu:</strong> {item.productId}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Ilość:</strong> {item.quantity}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Data Start:</strong>{" "}
                      {new Date(item.rentStart).toLocaleDateString()}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Data Koniec:</strong>{" "}
                      {new Date(item.rentEnd).toLocaleDateString()}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Cena:</strong> {item.rentPrice}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Wydane:</strong>
                      <Form.Check
                        type="switch"
                        id={`switch-${item.rentId}`}
                        checked={item.isRecived}
                        onChange={() =>
                          handleRecivedChange(item.rentId, item.isRecived)
                        }
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Zrealizowane:</strong>
                      <Form.Check
                        type="switch"
                        id={`switch-${item.rentId}`}
                        checked={item.isCompleted}
                        onChange={() =>
                          handleCompletedChange(item.rentId, item.isCompleted)
                        }
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        variant="warning"
                        onClick={() => handleCancel(item.rentId)}
                      >
                        Anuluj
                      </Button>
                    </ListGroup.Item>
                  </Col>
                </Row>
              </React.Fragment>
            ))
          )}

          <div className="d-flex justify-content-between mt-3">
            <Button onClick={handlePreviousPage} disabled={currentPage === 0}>
              Poprzednia
            </Button>
            <span>
              Strona {currentPage + 1} z {totalPages === 0 ? 1 : totalPages}
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

export default Order;
