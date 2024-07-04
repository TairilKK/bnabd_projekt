import { Image } from "react-bootstrap";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaClipboardList,
  FaUsers,
  FaChartBar,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
    toast.success("Wylogowano pomyślnie", { position: "bottom-right" });
    setRole(null);
    navigate("/");
  };

  const getPageName = () => {
    switch (location.pathname) {
      case "/":
        return "Strona główna";
      case "/myorders":
        return "Moje zamówienia";
      case "/order":
        return "Zamówienia";
      case "/employee":
        return "Lista użytkowników";
      case "/dashboard":
        return "Dashboard";
      default:
        return "";
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
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
          <span className="ms-3">{getPageName()}</span>
        </div>
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
              <Link to="/dashboard" className="m-3">
                <FaChartBar size={24} className="text-dark" />
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
