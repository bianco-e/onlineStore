import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GridLoader from "react-spinners/GridLoader";

import NewProductForm from "./NewProductForm";
import StyledButton from "./StyledButton";

import firebase from "../firebase/client.js";

export default function AdminProducts() {
  const [allProducts, setAllProducts] = useState(undefined);
  const [newProduct, setNewProduct] = useState({});
  const [showProductForm, setShowProductForm] = useState(true);

  useEffect(() => {
    firebase
      .getDocsFromCollection("products")
      .then((products) => setAllProducts(products));
  }, []);

  const triggerShowForm = () => setShowProductForm(!showProductForm);

  return (
    <Container>
      <Title>Productos</Title>
      {!allProducts ? (
        <GridLoader />
      ) : (
        <>
          {!showProductForm ? (
            <StyledButton
              title="Nuevo producto"
              onClickFn={() => triggerShowForm()}
            />
          ) : (
            <NewProductForm
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              trigger={triggerShowForm}
            />
          )}
        </>
      )}
    </Container>
  );
}

const Container = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  marginTop: "50px",
  minHeight: "100vh",
  width: "80%",
});
const Title = styled.h2({});
