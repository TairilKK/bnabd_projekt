import { Image } from "react-bootstrap";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

const NavbarClient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          setIsAuthenticated(false);
          return;
        }
        const response = await axios.get(
          "http://localhost:8090/api/v1/auth/check",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("Auth check response:", response.data); // Logowanie odpowiedzi
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.log("Auth check error:", error); // Logowanie błędów
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated); // Logowanie stanu
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;
      await axios.post(
        "http://localhost:8090/api/v1/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setIsAuthenticated(false);
      setUser(null); // Resetowanie użytkownika w kontekście
      localStorage.removeItem("user"); // Usuwanie użytkownika z localStorage
      localStorage.removeItem("accessToken"); // Usuwanie tokena z localStorage
      navigate("/");
    } catch (error) {
      console.log("Logout error:", error); // Logowanie błędów wylogowania
    }
  };

  const getPageTitle = () => {
    if (location.pathname === "/") {
      return "Strona główna";
    } else if (location.pathname === "/login") {
      return "Logowanie";
    } else if (location.pathname === "/register") {
      return "Rejestracja";
    } else if (location.pathname.startsWith("/product/")) {
      return "Rezerwacja";
    } else {
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
        <div className="ms-auto d-flex align-items-center">
          <Link to="/myorders">
            <FaShoppingCart size={24} />
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
            {isAuthenticated ? (
              <>
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
                <Dropdown.Item as="div">
                  <Link to="/">
                    <Button
                      variant="navbar-brand"
                      type="button"
                      className="w-100"
                    >
                      Strona główna
                    </Button>
                  </Link>
                </Dropdown.Item>
              </>
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

export default NavbarClient;
