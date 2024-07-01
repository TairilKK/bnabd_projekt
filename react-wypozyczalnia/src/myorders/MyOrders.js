import React, { useState, useEffect } from "react";
import { Button, Container, ListGroup, Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const MyOrders = () => {
  const [items, setItems] = useState([]);
  const clientId = localStorage.getItem("clientId"); // Pobierz clientId z localStorage

  useEffect(() => {
    const token = localStorage.getItem("token"); // Pobierz token z localStorage

    if (clientId) {
      axios
        .get(`http://localhost:8090/api/v1/rents/client?clientId=${clientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setItems(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [clientId]);

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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id zamówienia</th>
              <th>Produkt</th>
              <th>Kategoria</th>
              <th>Rozmiar</th>
              <th>Data rozpoczęcia</th>
              <th>Data zakończenia</th>
              <th>Ilość</th>
              <th>Cena</th>
              <th>Status</th>
              <th>Akcja</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.rentId}>
                <td>{item.rentId}</td>
                <td>
                  <Link to={`/product/${item.productId}`}>
                    {item.productId}
                  </Link>
                </td>
                <td>{item.productCategory}</td>
                <td>{item.productSize}</td>
                <td>{new Date(item.rentStart).toLocaleDateString()}</td>
                <td>{new Date(item.rentEnd).toLocaleDateString()}</td>
                <td>{item.quantity}</td>
                <td>{item.rentPrice} zł</td>
                <td>
                  {item.isCompleted ? "Zrealizowano" : "Nie zrealizowano"}
                </td>
                <td>
                  <Button variant="warning">anuluj</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default MyOrders;
