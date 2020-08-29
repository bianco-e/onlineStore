import React, { useEffect, useState } from "react";
import styled from "styled-components";

import LoadingSpinner from "../components/LoadingSpinner";
import NewProductForm from "./NewProductForm";
import StyledButton from "./StyledButton";
import AllProductsViewer from "./AllProductsViewer";

import addPhoto from "../images/photo.png";
import firebase from "../firebase/client.js";

export default function AdminProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [editingProduct, setEditingProduct] = useState(undefined);
  const [showProductForm, setShowProductForm] = useState(false);
  const [images, setImages] = useState([{ pvw: addPhoto }]);
  const [stock, setStock] = useState({ S: 0, M: 0, L: 0, XL: 0, XXL: 0 });
  const [promProduct, setPromProduct] = useState(false);
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
    const { colors, id, imgs, stock, prom } = product;
    const productToEdit = allProducts.find((prod) => prod.id == id);
    setEditingProduct(productToEdit);
    setAllProducts(allProducts.filter((prod) => prod.id != id));
    setShowProductForm(true);
    setColores(colors);
    setPromProduct(prom);
    setStock(stock);
    setNewProduct(product);
    const mappedImages = imgs.map((img) => {
      return { pvw: img };
    });
    setImages(mappedImages);
  };

  const returnEditingProductToList = () =>
    editingProduct && setAllProducts(allProducts.concat(editingProduct));

  return (
    <Container>
      <Title>Productos</Title>
      {!allProducts.length ? (
        <LoadingSpinner />
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
              promProduct={promProduct}
              setPromProduct={setPromProduct}
              returnEditingProductToList={returnEditingProductToList}
              trigger={triggerShowForm}
            />
          )}

          <AllProductsViewer
            editProduct={editProduct}
            deleteProduct={deleteProduct}
            products={allProducts}
          />
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
