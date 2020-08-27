import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GridLoader from "react-spinners/GridLoader";

import NewProductForm from "./NewProductForm";
import StyledButton from "./StyledButton";
import AllProductsViewer from "./AllProductsViewer";

import addPhoto from "../images/photo.png";
import firebase from "../firebase/client.js";

export default function AdminProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [showProductForm, setShowProductForm] = useState(false);
  const [images, setImages] = useState([{ pvw: addPhoto }]);
  const [stock, setStock] = useState({ S: 0, M: 0, L: 0, XL: 0, XXL: 0 });
  const [colores, setColores] = useState([]);

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

  const editProduct = (product) => {
    const { category, colors, id, imgs, name, price, stock } = product;
    setAllProducts(allProducts.filter((prod) => prod.id != id));
    setShowProductForm(true);
    setColores(colors);
    setStock(stock);
    setNewProduct(product);
    const mappedImages = imgs.map((img) => {
      return { pvw: img };
    });
    setImages(mappedImages);
    console.log(product);
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
              images={images}
              setImages={setImages}
              stock={stock}
              setStock={setStock}
              colores={colores}
              setColores={setColores}
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              trigger={triggerShowForm}
            />
          )}

          <AllProductsViewer
            editProduct={editProduct}
            deleteProduct={deleteProduct}
            products={allProducts}
          />
          {
            // Acciones: copiar link
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
