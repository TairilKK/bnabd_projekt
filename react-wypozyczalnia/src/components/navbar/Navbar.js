import { Image } from "react-bootstrap";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    setIsAuthenticated(!!token);
    setRole(userRole);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    setIsAuthenticated(!!token);
    setRole(userRole);
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
    navigate("/");
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
        </Link>
        <div className="ms-auto d-flex align-items-center">
          {role === "CLIENT" && (
            <Link to="/myorders" className="m-3">
              <FaShoppingCart size={24} className="text-dark" />
            </Link>
          )}
          {role === "EMPLOYEE" && (
            <>
              <Link to="/order" className="m-3">
                <FaClipboardList size={24} className="text-dark" />
              </Link>
              <Link to="/employee" className="m-3">
                <FaUsers size={24} className="text-dark" />
              </Link>
            </>
          )}
          <DropdownButton
            id="dropdown-basic-button"
            title={
              <span>
                <FaUser className="text-dark" />
              </span>
            }
            variant="btn-outline-dark"
            size="lg"
            className="m-3"
          >
            {isAuthenticated ? (
              <Dropdown.Item as="div">
                <Button
                  variant="navbar-brand"
                  type="button"
                  className="w-100"
                  onClick={handleLogout}
                >
                  Wyloguj się
                </Button>
              </Dropdown.Item>
            ) : (
              <>
                <Dropdown.Item as="div">
                  <Link to="/login">
                    <Button
                      variant="navbar-brand"
                      type="button"
                      className="w-100"
                    >
                      Zaloguj się
                    </Button>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item as="div">
                  <Link to="/register">
                    <Button
                      variant="navbar-brand"
                      type="button"
                      className="w-100"
                    >
                      Zarejestruj się
                    </Button>
                  </Link>
                </Dropdown.Item>
              </>
            )}
          </DropdownButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
