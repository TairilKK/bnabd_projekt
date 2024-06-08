import Navbar from "../navbar/Navbar";
import { Container, Form, ListGroup, Row, Col } from "react-bootstrap";

const EmployeeCard = ({ firstName, lastName, email }) => (
  <Col xs={12} md={6} className="mb-3">
    <div className="card h-100 d-flex flex-row justify-content-between">
      <div className="card-body">
        <h5 className="card-title">{`${firstName} ${lastName}`}</h5>
        <p className="card-text">{email}</p>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center mr-2">
        <Form.Check type="switch" id={`switch-${email}`} />
      </div>
    </div>
  </Col>
);

const EmployeeList = () => {
  const employees = [
    {
      firstName: "Jan",
      lastName: "Kowalski",
      email: "jankowalski@example.com",
    },
    { firstName: "Adam", lastName: "Nowak", email: "adamnowak@example.com" },
    {
      firstName: "Katarzyna",
      lastName: "Polak",
      email: "katarzynapolak@example.com",
    },
  ];

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
            Imie
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
          {employees.map((emp) => (
            <EmployeeCard
              key={emp.email}
              firstName={emp.firstName}
              lastName={emp.lastName}
              email={emp.email}
            />
          ))}
        </Row>
        {employees.map((emp) => (
          <ListGroup
            horizontal
            className="mb-1 d-none d-lg-flex"
            key={emp.email}
          >
            <ListGroup.Item style={{ ...flexStyle, flex: 3 }}>
              {emp.firstName}
            </ListGroup.Item>
            <ListGroup.Item style={{ ...flexStyle, flex: 3 }}>
              {emp.lastName}
            </ListGroup.Item>
            <ListGroup.Item style={{ ...flexStyle, flex: 3 }}>
              {emp.email}
            </ListGroup.Item>
            <ListGroup.Item style={{ ...flexStyle, flex: 1 }}>
              <Form.Check
                type="switch"
                id={`switch-${emp.email}`}
                style={{ marginLeft: "20px" }}
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

export default EmployeeList;
