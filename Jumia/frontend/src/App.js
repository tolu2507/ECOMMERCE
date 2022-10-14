import React from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import "./App.css";
import CartScreen from "./Screens/CartScreen";
import HomeScreen from "./Screens/Homescreen";
import ProductScreen from "./Screens/ProductScreen";

function App() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/"> Jumia </Link>
          </div>
          <div className="header-links">
            <a href="cart.html">Cart</a>
            <a href="signin.html">Sign In</a>
          </div>
        </header>
        <main className="main">
          <div className="content">
            <Routes>
              <Route path="/products/:id" element={<ProductScreen />} />
              <Route path="/cart/:id?" element={<CartScreen />} />
              <Route path="/" element={<HomeScreen />} exact />
            </Routes>
          </div>
        </main>
        <footer className="footer">All right reserved 2022</footer>
        <aside className="sidebar">
          <h3>Tolusneh Is Building This. Please be Patient</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>
            <li>
              <a href="index.html">Shirts</a>
            </li>
          </ul>
        </aside>
      </div>
    </BrowserRouter>
  );
}

export default App;
