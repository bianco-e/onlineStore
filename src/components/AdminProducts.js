import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GridLoader from "react-spinners/GridLoader";

import NewProductForm from "./NewProductForm";
import StyledButton from "./StyledButton";
import AllProductsViewer from "./AllProductsViewer";

import firebase from "../firebase/client.js";

export default function AdminProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [docId, setDocId] = useState(undefined);
  const [showProductForm, setShowProductForm] = useState(false);

  useEffect(() => {
    docId && console.log(docId);
  }, [docId]);

  const getProducts = () => {
    firebase
      .getDocsFromCollection("products")
      .then((products) => setAllProducts(products));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const triggerShowForm = () => setShowProductForm(!showProductForm);

  const deleteProduct = (id) => {
    firebase.deleteDoc("products", id);
    getProducts();
  };

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
              getProducts={getProducts}
              newProduct={newProduct}
              setDocId={setDocId}
              setNewProduct={setNewProduct}
              trigger={triggerShowForm}
            />
          )}

          <AllProductsViewer
            deleteProduct={deleteProduct}
            products={allProducts}
          />
          {
            // botón para destacar producto en home (máx 3 o 5)
            // Acciones: copiar link, editar, eliminar
          }
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
