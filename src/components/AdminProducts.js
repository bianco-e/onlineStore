import React, { useEffect, useState } from "react";
import styled from "styled-components";

import LoadingSpinner from "../components/LoadingSpinner";
import NewProductForm from "./NewProductForm";
import StyledButton from "./StyledButton";
import AllProductsViewer from "./AllProductsViewer";
import ConfirmModal from "./ConfirmModal";

import addPhoto from "../images/photo.png";
import firebase from "../firebase/client.js";
import { emptyStock } from "../data/data.js";

export default function AdminProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [editingProduct, setEditingProduct] = useState(undefined);
  const [showProductForm, setShowProductForm] = useState(false);
  const [images, setImages] = useState([{ pvw: addPhoto }]);
  const [stock, setStock] = useState(emptyStock);
  const [promProduct, setPromProduct] = useState(false);
  const [colores, setColores] = useState([]);
  const [idToDelete, setIdToDelete] = useState(undefined);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const getProducts = () => {
    firebase
      .getDocsFromCollection("products")
      .then((products) => setAllProducts(products));
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    firebase
      .getDocByID("categories", "categories")
      .then((categs) =>
        setCategoriesNames(categs.categories.map((cat) => cat.name))
      );
  }, []);

  const filterByCategory = (category) => {
    firebase
      .getProductsByCategory(category)
      .then((prods) => setAllProducts(prods));
  };

  const triggerShowForm = () => setShowProductForm(!showProductForm);

  const deleteProduct = () => {
    firebase.deleteDoc("products", idToDelete);
    getProducts();
    setIdToDelete(undefined);
  };

  const confirmToDeleteProduct = (id) => {
    setIdToDelete(id);
    setShowConfirmModal(true);
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
    setImages(
      imgs.map((img) => {
        return { pvw: img };
      })
    );
  };

  const returnEditingProductToList = () => {
    if (editingProduct) {
      setAllProducts(allProducts.concat(editingProduct));
      setEditingProduct(undefined);
    }
  };

  return (
    <Container>
      <Title>Productos</Title>
      {showConfirmModal && (
        <ConfirmModal
          callback={deleteProduct}
          setIdToDelete={setIdToDelete}
          setShowModal={setShowConfirmModal}
        />
      )}
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
            deleteProduct={confirmToDeleteProduct}
            products={allProducts}
            reset={getProducts}
            setAllProducts={setAllProducts}
            categoriesNames={categoriesNames}
            filterByCategory={filterByCategory}
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
  position: "relative",
  width: "80%",
});
const Title = styled.h2({});
