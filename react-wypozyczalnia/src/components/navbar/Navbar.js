import { Image } from "react-bootstrap";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <Image
            src="/logo.svg"
            className="img-fluid mb-3"
            style={{
              maxWidth: "64px",
              height: "64px",
            }}
          />
        </Link>

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
          <Dropdown.Item href="#">
            <Link to="/login">
              <Button variant="navbar-brand" type="button" className="w-100">
                Zaloguj się
              </Button>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item href="#">
            <Link to="/register">
              <Button variant="navbar-brand" type="button" className="w-100">
                Zarejestruj się
              </Button>
            </Link>
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </nav>
  );
};

export default Navbar;
