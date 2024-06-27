import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loginscreen from "./loginscreen/Loginscreen";
import Registerscreen from "./registerscreen/Registerscreen";
import Home from "./home/Home";
import ItemDetail from "./itemdetail/ItemDetail";
import Order from "./order/Order";
import UserList from "./components/userList/UserList";
import MyOrders from "./myorders/MyOrders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/product/:id" element={<ItemDetail />} />
          <Route path="/order" element={<Order />} />
          <Route path="/employee" element={<UserList />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
