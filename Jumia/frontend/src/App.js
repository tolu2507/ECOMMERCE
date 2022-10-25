import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import CartScreen from "./Screens/CartScreen";
import HomeScreen from "./Screens/Homescreen";
import PaymentScreen from "./Screens/paymentScreen";
import PlaceOrderScreen from "./Screens/PlaceorderScreen";
import ProductScreen from "./Screens/ProductScreen";
import ProductsScreen from "./Screens/productsScreen";
import RegisterScreen from "./Screens/registerScreen";
import ShippingScreen from "./Screens/shippingScreen";
import SigninScreen from "./Screens/signinScreen";
import TrackingScreen from "./Screens/Tracking";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

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
            <Link to="/"> TRENDz </Link>
          </div>
          <div className="header-links">
            <Link to="/cart">Cart</Link>
            {userInfo ? (
              <Link to="/">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <main className="main">
          <div className="content">
            <Routes>
              <Route path="/" element={<HomeScreen />} exact />
              <Route path="/products" element={<ProductsScreen />} />
              <Route path="/products/:id" element={<ProductScreen />} />
              <Route path="/cart/">
                <Route path=":id" element={<CartScreen />} />
                <Route index element={<CartScreen />} />
              </Route>
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/trackorder" element={<TrackingScreen />} />
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
