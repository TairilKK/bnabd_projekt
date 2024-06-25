import { Image } from "react-bootstrap";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Strona główna";
      case "/login":
        return "Logowanie";
      case "/register":
        return "Rejestracja";
      case location.pathname.startsWith("/product/"):
        return "Rezerwacja";
      default:
        return "";
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid d-flex align-items-center">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <Image
            src="/logo.svg"
            className="img-fluid mb-3"
            style={{
              maxWidth: "64px",
              height: "64px",
            }}
          />
          <span className="ms-2">{getPageTitle()}</span>
        </Link>
        <div className="ms-auto">
          <DropdownButton
            id="dropdown-basic-button"
            title={
              <span>
                <FaUser />
              </span>
            }
            variant="btn-outline-dark"
            size="lg"
            className="m-3"
          >
            <Dropdown.Item as="div">
              <Link to="/login">
                <Button variant="navbar-brand" type="button" className="w-100">
                  Zaloguj się
                </Button>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as="div">
              <Link to="/register">
                <Button variant="navbar-brand" type="button" className="w-100">
                  Zarejestruj się
                </Button>
              </Link>
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
