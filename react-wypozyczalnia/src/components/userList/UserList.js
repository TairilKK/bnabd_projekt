import Navbar from "../navbar/Navbar";
import { Container, ListGroup, Row, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import apiClient from "../apiClient";
import UserCard from "./UserCard";
import Footer from "../footer/Footer";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    setCurrentUserEmail(decodedToken.sub);

    apiClient
      .get("/users/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

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
                currentUserEmail={currentUserEmail} // Pass current user's email
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
                  disabled={usr.email === currentUserEmail} // Disable switch if it's the current user's email
                />
              </ListGroup.Item>
            </ListGroup>
          ))}
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
