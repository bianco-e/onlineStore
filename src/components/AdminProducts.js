import React, { useEffect, useState } from "react";
import styled from "styled-components";

import LoadingSpinner from "../components/LoadingSpinner";
import NewProductForm from "./NewProductForm";
import StyledButton from "./StyledButton";
import AllProductsViewer from "./AllProductsViewer";
import ConfirmModal from "./ConfirmModal";
import ChoosePromModal from "./ChoosePromModal";

import addPhoto from "../images/photo.png";
import firebase from "../firebase/client.js";
import { emptyStock, emptyPayment } from "../data/data.js";

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
  const [nameToDelete, setNameToDelete] = useState(undefined);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [promProductsList, setPromProductsList] = useState(undefined);
  const [payment, setPayment] = useState(emptyPayment);

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
    setNameToDelete(undefined);
  };

  const confirmToDeleteProduct = (id, name) => {
    setIdToDelete(id);
    setNameToDelete(name);
    setShowConfirmModal(true);
  };

  const editProduct = (product) => {
    const { colors, id, imgs, stock, payment, prom } = product;
    const productToEdit = allProducts.find((prod) => prod.id == id);
    setEditingProduct(productToEdit);
    setAllProducts(allProducts.filter((prod) => prod.id != id));
    setShowProductForm(true);
    setColores(colors);
    setPromProduct(prom);
    setStock(stock);
    setPayment(payment);
    setNewProduct({ ...product, colors: undefined });
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

  const resetForm = () => {
    setNewProduct({});
    setImages([{ pvw: addPhoto }]);
    setColores([]);
    setStock(emptyStock);
    setPayment(emptyPayment);
  };

  const closeForm = () => {
    triggerShowForm();
    returnEditingProductToList();
    resetForm();
  };

  const checkIfPaymentModeIsSetted = () =>
    Object.values(payment).some((option) => option != false);

  const addProductToFirebase = (
    product = {
      ...newProduct,
      payment,
      price: parseFloat(newProduct.price),
      prom: promProduct,
      stock,
      colors: colores,
    },
    setErrorMsg = () => {}
  ) => {
    const { name, price, category, description, id } = product;
    if (
      name &&
      price &&
      description &&
      category != "-" &&
      checkIfPaymentModeIsSetted() &&
      images.length &&
      colores.length
    ) {
      if (images.some((img) => img.file)) {
        const imagesToUpload = images.map((img) => {
          return firebase.addImage("products", img.file).then((imgUrl) => {
            return imgUrl;
          });
        });
        !id
          ? Promise.all(imagesToUpload).then((uploadedImages) => {
              firebase
                .addNewDoc(false, "products", {
                  ...product,
                  imgs: uploadedImages,
                })
                .then(getProducts);
            })
          : Promise.all(imagesToUpload)
              .then((uploadedImages) => {
                firebase.editDoc(false, "products", id, {
                  ...product,
                  imgs: uploadedImages,
                });
              })
              .then(getProducts);
      } else {
        const imagesToUpload = images.map((img) => img.pvw);
        firebase
          .editDoc(false, "products", id, {
            ...product,
            imgs: imagesToUpload,
          })
          .then(getProducts);
      }
      resetForm();
      triggerShowForm();
    } else setErrorMsg("Todos los campos deben estar completos");
  };

  const deleteProductModalData = {
    title: `¿Seguro que deseas eliminar el producto ${nameToDelete}?`,
    text: `Una vez confirmado, ${nameToDelete} será eliminado por completo.`,
  };

  return (
    <>
      <Title>Productos</Title>
      {showConfirmModal && (
        <ConfirmModal
          callback={deleteProduct}
          data={deleteProductModalData}
          setIdToDelete={setIdToDelete}
          setShowModal={setShowConfirmModal}
        />
      )}
      {promProductsList && (
        <ChoosePromModal
          callback={addProductToFirebase}
          promProducts={promProductsList}
          setShowModal={setPromProductsList}
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
              addProductToFirebase={addProductToFirebase}
              setPromProductsList={setPromProductsList}
              closeForm={closeForm}
              images={images}
              setImages={setImages}
              stock={stock}
              setStock={setStock}
              colores={colores}
              setColores={setColores}
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              payment={payment}
              setPayment={setPayment}
              promProduct={promProduct}
              setPromProduct={setPromProduct}
            />
          )}

          <AllProductsViewer
            editProduct={editProduct}
            confirmToDeleteProduct={confirmToDeleteProduct}
            products={allProducts}
            reset={getProducts}
            setAllProducts={setAllProducts}
            categoriesNames={categoriesNames}
            filterByCategory={filterByCategory}
          />
        </>
      )}
    </>
  );
}

const Title = styled.h2({});
