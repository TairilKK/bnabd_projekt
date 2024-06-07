import React from "react";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import "bootstrap/dist/css/bootstrap.min.css";

import RegisterForm from "./RegisterForm";
import RegisterLeftPanel from "./RegisterLeftPanel";

const Registerscreen = () => {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{ background: "linear-gradient(-15deg, #4a87a2, #86cce9)" }}
      >
        <Container
          className="align-self-center py-5 px-4"
          style={{
            backgroundColor: "#fff",
            borderRadius: "15px",
            maxWidth: "800px",
          }}
        >
          <Row className="mb-5 pt-4">
            <RegisterLeftPanel />
            <RegisterForm />
          </Row>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Registerscreen;
