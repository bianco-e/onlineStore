import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Checkboxes from "./Checkboxes";
import CloseButton from "./CloseButton";
import ColorsCards from "./ColorsCards";
import FeedbackMessage from "./FeedbackMessage";
import FormOption from "./FormOption";
import MultipleInput from "./MultipleInput";
import Select from "./Select";
import SettableImageThumbnail from "./SettableImageThumbnail";
import StarButton from "./StarButton";
import StyledButton from "./StyledButton";
import StyledInput from "./StyledInput";
import StyledTextArea from "./StyledTextArea";

import firebase from "../firebase/client.js";

export default function NewProductForm({
  addProductToFirebase,
  setPromProductsList,
  closeForm,
  images,
  setImages,
  stock,
  setStock,
  colores,
  setColores,
  newProduct,
  setNewProduct,
  payment,
  setPayment,
  promProduct,
  setPromProduct,
  formErrorMsg,
  setFormErrorMsg,
  small,
}) {
  const [categoriesNames, setCategoriesNames] = useState([]);

  useEffect(() => {
    firebase.getDocsFromCollection("categories").then((categs) => {
      setCategoriesNames(
        [{ val: "-" }].concat(
          categs[0].categories.map((cat) => {
            return { val: cat.name };
          })
        )
      );
    });
  }, []);

  const setValue = (e, property) =>
    setNewProduct({ ...newProduct, [property]: e.target.value });

  const handleAddImage = (e) => {
    if (e.target.files.length < 4) {
      const files = Array.from(e.target.files);
      const settedFiles = files.map((file) => {
        return {
          pvw: URL.createObjectURL(file),
          file,
        };
      });
      setImages(settedFiles);
    } else setFormErrorMsg("El máximo de imágenes es 3");
  };

  const inputsData = [
    {
      text: "Imágenes",
      element: images.map((img) => {
        return (
          <SettableImageThumbnail
            key={img}
            multiple
            src={img.pvw}
            onChangeFn={(e) => handleAddImage(e)}
          />
        );
      }),
    },
    {
      text: "Nombre",
      element: (
        <StyledInput
          onChangeFn={(e) => setValue(e, "name")}
          val={newProduct["name"]}
          ph="Ej: Remera lisa"
          width={small ? "145px" : "180px"}
        />
      ),
    },
    {
      text: "Descripción",
      element: (
        <StyledTextArea
          onChangeFn={(e) => setValue(e, "description")}
          val={newProduct["description"]}
          ph="Ej: Remera 100% algodón con costuras reforzadas"
          width="50%"
        />
      ),
    },
    {
      text: "Precio",
      element: (
        <StyledInput
          onChangeFn={(e) => setValue(e, "price")}
          val={newProduct["price"]}
          ph="Ej: 1200"
          width={small ? "145px" : "180px"}
        />
      ),
    },
    {
      text: "Categoría",
      element: (
        <Select
          initialVal={newProduct.category}
          options={categoriesNames}
          onChangeFn={(e) => setValue(e, "category")}
          width={small ? "170px" : "205px"}
        />
      ),
    },
    {
      text: "Pago",
      element: <Checkboxes payment={payment} setPayment={setPayment} />,
      minHeight: "90px",
    },
    {
      text: "Stock talles",
      element: <MultipleInput stock={stock} setStock={setStock} />,
    },
    {
      text: "Colores",
      element: (
        <>
          <StyledInput
            onChangeFn={(e) => setValue(e, "colors")}
            val={newProduct["colors"]}
            ph="Ej: Rojo"
            width={small ? "145px" : "180px"}
          />
          <StyledButton
            title="+"
            onClickFn={() => {
              setColores([...colores, newProduct.colors]);
              setNewProduct({ ...newProduct, colors: "" });
            }}
          />
        </>
      ),
    },
  ];

  const handleAddProduct = () => {
    setFormErrorMsg(undefined);
    const productToUpload = {
      ...newProduct,
      payment,
      price: parseFloat(newProduct.price),
      prom: promProduct,
      stock,
      colors: colores,
    };
    if (promProduct) {
      firebase.getPromotedProducts().then((prods) => {
        if (
          prods.length > 2 &&
          !prods.find((prod) => prod.id == productToUpload.id)
        ) {
          setPromProductsList(prods);
        } else addProductToFirebase(productToUpload);
      });
    } else addProductToFirebase(productToUpload);
  };

  return (
    <Wrapper>
      <CloseButton onClickFn={() => closeForm()} corner="right" top="0" />
      <Title>Nuevo producto</Title>
      {inputsData.map(({ text, element, minHeight }) => {
        return (
          <FormOption
            key={text}
            text={text}
            minHeight={minHeight}
            width={small ? "90%" : "70%"}
          >
            {element}
          </FormOption>
        );
      })}
      <Container>
        {colores && (
          <ColorsCards button colors={colores} setColors={setColores} />
        )}
      </Container>
      <StarButton
        button
        color={promProduct}
        onClickFn={() => setPromProduct(!promProduct)}
      />
      <Container>
        {formErrorMsg && <FeedbackMessage msg={formErrorMsg} type="err" />}
      </Container>
      <StyledButton
        title="Agregar producto"
        onClickFn={() => handleAddProduct()}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  minHeight: "500px",
  position: "relative",
  width: "100%",
});
const Container = styled.div({
  display: "grid",
  placeItems: "center",
  minHeight: "30px",
  width: "100%",
});
const Title = styled.h4({
  margin: "0",
  textDecoration: "underline",
});
