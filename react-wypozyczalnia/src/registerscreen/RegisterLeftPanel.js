import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

const RegisterLeftPanel = () => {
  return (
    <Col xs={12} md={5} className="text-center mb-4 mb-md-0">
      <Link to="/">
        <Image
          src="/logo.svg"
          className="img-fluid mb-3"
          style={{ maxWidth: "85%", height: "auto" }}
        />
      </Link>
      <h2>Zarejestruj się</h2>
    </Col>
  );
};

export default RegisterLeftPanel;
