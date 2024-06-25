import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loginscreen from "./loginscreen/Loginscreen";
import Registerscreen from "./registerscreen/Registerscreen";
import Home from "./home/Home";
import ItemDetail from "./itemdetail/ItemDetail";
import Order from "./order/Order";
import UserList from "./components/userList/UserList";
import MyOrders from "./myorders/MyOrders";
import UserProvider from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
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
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
