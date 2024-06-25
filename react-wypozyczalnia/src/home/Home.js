import Footer from "../components/footer/Footer";
import ItemList from "../components/item/ItemList";
import NavbarClient from "../components/navbarClient/NavbarClient";
import Navbar from "../components/navbar/Navbar";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Home = () => {
  const { user } = useContext(UserContext);

  console.log("Current user:", user);

  return (
    <div>
      {user && user.role === "CLIENT" ? <NavbarClient /> : <Navbar />}
      <ItemList />
      <Footer />
    </div>
  );
};

export default Home;
