import React from "react";
import "./styles.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import BuyingProduct from "./pages/BuyingProduct";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminCategories from "./components/AdminCategories";
import AdminClients from "./components/AdminClients";
import AdminDesign from "./components/AdminDesign";
import AdminProducts from "./components/AdminProducts";
import AdminSales from "./components/AdminSales";
import AdminStadistics from "./components/AdminStadistics";

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
            render={() => <Admin Child={AdminCategories} />}
          />
          <Route
            exact
            path="/admin/productos"
            render={() => <Admin Child={AdminProducts} />}
          />
          <Route
            exact
            path="/admin/clientes"
            render={() => <Admin Child={AdminClients} />}
          />
          <Route
            exact
            path="/admin/ventas"
            render={() => <Admin Child={AdminSales} />}
          />
          <Route
            exact
            path="/admin/estadisticas"
            render={() => <Admin Child={AdminStadistics} />}
          />
          <Route
            exact
            path="/admin/diseño"
            render={() => <Admin Child={AdminDesign} />}
          />
        </BrowserRouter>
      </CartContextProvider>
    </>
  );
}
