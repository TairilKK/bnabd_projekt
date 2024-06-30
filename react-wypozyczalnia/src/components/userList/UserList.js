import Navbar from "../navbar/Navbar";
import {
  Container,
  ListGroup,
  Row,
  Form,
  FormGroup,
  Button,
  Col,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import apiClient from "../apiClient";
import UserCard from "./UserCard";
import Footer from "../footer/Footer";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState(""); // Dodaj stan dla filtra
  const [sortBy, setSortBy] = useState("role"); // Dodaj stan dla sortowania
  const [noResults, setNoResults] = useState(false); // Dodaj stan dla braku wyników

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    setCurrentUserEmail(decodedToken.sub);

    fetchUsers(currentPage, pageSize, token, filter, sortBy);
  }, [currentPage, pageSize, filter, sortBy]); // Dodaj sortBy do zależności

  const fetchUsers = (page, size, token, filter, sortBy) => {
    apiClient
      .get(
        `/users/all?page=${page}&size=${size}&filter=${filter}&sortBy=${sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setUsers(response.data.content);
        setTotalPages(response.data.totalPages);
        setNoResults(response.data.content.length === 0);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handleRoleChange = (userId, currentRole) => {
    const newRole = currentRole === "EMPLOYEE" ? "CLIENT" : "EMPLOYEE";
    const token = localStorage.getItem("token");

    apiClient
      .put(`/users/role/${userId}?role=${newRole}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Role updated successfully:", response.data);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
      })
      .catch((error) => {
        console.error("There was an error updating the role!", error);
      });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(0); // Reset page to 0 when filter changes
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(0); // Reset page to 0 when sort changes
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
                <Form.Label className="mt-1">Wyszukaj:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wyszukaj użytkownika"
                  value={filter}
                  onChange={handleFilterChange}
                />
              </Col>
              <Col md={4}>
                <Form.Label className="mt-1">Sortuj:</Form.Label>
                <Form.Control
                  as="select"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="role">Rola</option>
                  <option value="firstName">Imię</option>
                  <option value="lastName">Nazwisko</option>
                  <option value="email">Email</option>
                </Form.Control>
              </Col>
            </Row>
          </FormGroup>

          {noResults ? (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p>Nie znaleziono użytkowników.</p>
            </div>
          ) : (
            <>
              <ListGroup horizontal className="mb-2 d-none d-lg-flex">
                <ListGroup.Item
                  style={{ ...flexStyle, flex: 3, fontWeight: "bold" }}
                >
                  Imię
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ ...flexStyle, flex: 3, fontWeight: "bold" }}
                >
                  Nazwisko
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ ...flexStyle, flex: 3, fontWeight: "bold" }}
                >
                  Email
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ ...flexStyle, flex: 1, fontWeight: "bold" }}
                >
                  Pracownik
                </ListGroup.Item>
              </ListGroup>
              <Row className="d-lg-none">
                {users.map((usr) => (
                  <UserCard
                    key={usr.email}
                    firstName={usr.firstName}
                    lastName={usr.lastName}
                    email={usr.email}
                    role={usr.role}
                    userId={usr.id}
                    isEmployee={usr.role === "EMPLOYEE"}
                    onSwitchChange={handleRoleChange}
                    currentUserEmail={currentUserEmail}
                  />
                ))}
              </Row>
              {users.map((usr) => (
                <ListGroup
                  horizontal
                  className="mb-1 d-none d-lg-flex"
                  key={usr.email}
                >
                  <ListGroup.Item style={{ ...flexStyle, flex: 3 }}>
                    {usr.firstName}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ ...flexStyle, flex: 3 }}>
                    {usr.lastName}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ ...flexStyle, flex: 3 }}>
                    {usr.email}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ ...flexStyle, flex: 1 }}>
                    <Form.Check
                      type="switch"
                      id={`switch-${usr.email}`}
                      checked={usr.role === "EMPLOYEE"}
                      onChange={() => handleRoleChange(usr.id, usr.role)}
                      disabled={usr.email === currentUserEmail}
                    />
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </>
          )}

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

export default UserList;

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
