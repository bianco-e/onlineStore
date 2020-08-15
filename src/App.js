import React from "react";
import "./styles.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import BuyingProduct from "./pages/BuyingProduct";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminCategories from "./pages/AdminCategories";
import AdminProducts from "./pages/AdminProducts";

import { BrowserRouter, Route } from "react-router-dom";
import { CartContextProvider } from "./context/CartContext";

export default function App() {
  return (
    <>
      <CartContextProvider>
        <BrowserRouter>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/contacto" render={() => <Contact />} />
          <Route exact path="/productos" render={() => <Products />} />
          <Route exact path="/productos/:id" render={() => <BuyingProduct />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/admin" render={() => <Admin />} />
          <Route
            exact
            path="/admin/categorias"
            render={() => <AdminCategories />}
          />
          <Route
            exact
            path="/admin/productos"
            render={() => <AdminProducts />}
          />
        </BrowserRouter>
      </CartContextProvider>
    </>
  );
}
