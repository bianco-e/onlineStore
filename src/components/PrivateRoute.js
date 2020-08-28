import React, { useContext } from "react";
import AdminContext from "../context/AdminContext";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ render, ...otherProps }) {
  const { admin } = useContext(AdminContext);
  return (
    <Route
      {...otherProps}
      render={() => (admin ? render() : <Redirect to="/" />)}
    />
  );
}
