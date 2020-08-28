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
import AdminConfig from "./components/AdminConfig";
import AdminProducts from "./components/AdminProducts";
import AdminSales from "./components/AdminSales";
import PrivateRoute from "./components/PrivateRoute";

import { BrowserRouter, Route } from "react-router-dom";
import { CartContextProvider } from "./context/CartContext";
import { StyleContextProvider } from "./context/StyleContext";
import { AdminContextProvider } from "./context/AdminContext";

export default function App() {
  return (
    <>
      <StyleContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/contacto" render={() => <Contact />} />
            <Route exact path="/productos" render={() => <Products />} />
            <Route
              exact
              path="/productos/:id"
              render={() => <BuyingProduct />}
            />
            <Route
              exact
              path="/categoria/:endpoint"
              render={() => <Products />}
            />
            <AdminContextProvider>
              <Route exact path="/login" render={() => <Login />} />
              <PrivateRoute exact path="/admin" render={() => <Admin />} />
              <PrivateRoute
                exact
                path="/admin/categorias"
                render={() => <Admin Child={AdminCategories} />}
              />
              <PrivateRoute
                exact
                path="/admin/configuracion"
                render={() => <Admin Child={AdminConfig} />}
              />
              <PrivateRoute
                exact
                path="/admin/productos"
                render={() => <Admin Child={AdminProducts} />}
              />
              <PrivateRoute
                exact
                path="/admin/clientes"
                render={() => <Admin Child={AdminClients} />}
              />
              <PrivateRoute
                exact
                path="/admin/ventas"
                render={() => <Admin Child={AdminSales} />}
              />
            </AdminContextProvider>
          </BrowserRouter>
        </CartContextProvider>
      </StyleContextProvider>
    </>
  );
}
