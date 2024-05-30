import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loginscreen from "./loginscreen/Loginscreen";
import Registerscreen from "./registerscreen/Registerscreen";
import Home from "./home/Home";
import ItemDetail from "./itemdetail/ItemDetail";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          background: "linear-gradient(-15deg, #4a87a2, #86cce9)",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Loginscreen />}></Route>
          <Route path="/register" element={<Registerscreen />}></Route>
          <Route path="/item" element={<ItemDetail />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
