import Navbar from "../navbar/Navbar";
import { Container, ListGroup, Row, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8090/api/v1/users/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched users:", data); // Logowanie dla debugowania
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleRoleChange = (userId, currentRole) => {
    const newRole = currentRole === "Employee" ? "Client" : "Employee";
    axios
      .put(`http://localhost:8090/api/v1/users/role/${userId}?role=${newRole}`)
      .then((response) => {
        console.log("Role updated successfully:", response.data); // Log for debugging
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userId === userId ? { ...user, role: newRole } : user
          )
        );
      })
      .catch((error) => {
        console.error("There was an error updating the role!", error);
      });
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <Container
        className="py-5 px-4"
        style={{ backgroundColor: "#f0f0f0", flexGrow: 1 }}
      >
        <ListGroup horizontal className="mb-2 d-none d-lg-flex">
          <ListGroup.Item style={{ ...flexStyle, flex: 3, fontWeight: "bold" }}>
            Imię
          </ListGroup.Item>
          <ListGroup.Item style={{ ...flexStyle, flex: 3, fontWeight: "bold" }}>
            Nazwisko
          </ListGroup.Item>
          <ListGroup.Item style={{ ...flexStyle, flex: 3, fontWeight: "bold" }}>
            Email
          </ListGroup.Item>
          <ListGroup.Item style={{ ...flexStyle, flex: 1, fontWeight: "bold" }}>
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
              userId={usr.userId}
              isEmployee={usr.role === "Employee"}
              onSwitchChange={handleRoleChange}
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
                checked={usr.role === "Employee"}
                onChange={() => handleRoleChange(usr.userId, usr.role)}
              />
            </ListGroup.Item>
          </ListGroup>
        ))}
      </Container>
    </div>
  );
};

const flexStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default UserList;
