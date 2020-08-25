import React, { useEffect, useState } from "react";
import styled from "styled-components";

import StyledButton from "./StyledButton";
import StyledInput from "./StyledInput";
import FormOption from "./FormOption";
import Select from "./Select";
import MultipleChoice from "./MultipleChoice";
import FeedbackMessage from "./FeedbackMessage";
import ColorsCards from "./ColorsCards";
import SettableImageThumbnail from "./SettableImageThumbnail";

import addPhoto from "../images/photo.png";

import { Config } from "../data/data.js";
import firebase from "../firebase/client.js";

export default function NewProductForm({ newProduct, setNewProduct, trigger }) {
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [errorMsg, setErrorMsg] = useState(undefined);
  const [feedbackMsg, setFeedbackMsg] = useState(undefined);

  const [stock, setStock] = useState({});
  const [colors, setColors] = useState([]);

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

  const makeInputFrom = (title, ph) => {
    const propertyName = title.split(" ")[0].toLowerCase();
    const input = (
      <StyledInput
        onChangeFn={(e) => setValue(e, propertyName)}
        val={newProduct[propertyName]}
        ph={ph}
        width="180px"
      />
    );
    return new Config(title, input);
  };
  // botón para destacar producto en home (máx 3 o 5)
  // Acciones: copiar link, editar, eliminar

  const inputsData = [
    {
      text: "Imágenes del producto",
      element: (
        <SettableImageThumbnail multiple src={addPhoto} onChangeFn={() => {}} />
      ),
    },
    makeInputFrom("Nombre del producto", "Ej: Remera de algodón"),
    makeInputFrom("Precio", "Ej: 1200"),
    {
      text: "Categoría",
      element: (
        <Select
          options={categoriesNames}
          onChangeFn={(e) => setValue(e, "categoria")}
          width="200px"
        />
      ),
    },
    {
      text: "Stock de talles",
      element: (
        <MultipleChoice
          options={["S", "M", "L", "XL", "XXL"]}
          stock={stock}
          setStock={setStock}
        />
      ),
    },
    {
      text: "Colores disponibles",
      element: (
        <>
          <StyledInput
            onChangeFn={(e) => setValue(e, "colores")}
            val={newProduct["colores"]}
            ph="Ej: Rojo"
            width="180px"
          />
          <StyledButton
            title="+"
            onClickFn={() => {
              setColors([...colors, newProduct.colores]);
              setNewProduct({ ...newProduct, colores: "" });
            }}
          />
        </>
      ),
    },
  ];

  const handleAddProduct = () => {
    if (newProduct.nombre && newProduct.precio) {
      console.log({ ...newProduct, stock, colores: colors });
      setNewProduct({});
      setFeedbackMsg("Producto agregado correctamente");
      // trigger();
    } else setErrorMsg("Todos los campos deben estar completos");
  };

  return (
    <Wrapper>
      <Title>Nuevo producto</Title>
      {inputsData.map(({ text, element }) => {
        return (
          <FormOption key={text} text={text}>
            {element}
          </FormOption>
        );
      })}
      {colors && <ColorsCards colors={colors} setColors={setColors} />}
      {errorMsg && <FeedbackMessage msg={errorMsg} type="err" />}
      {feedbackMsg && <FeedbackMessage msg={feedbackMsg} type="ok" />}
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
  width: "100%",
});
const Title = styled.h3({
  margin: "0",
  textDecoration: "underline",
});
