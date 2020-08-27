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
import CloseButton from "./CloseButton";

import firebase from "../firebase/client.js";

export default function NewProductForm({
  getProducts,
  images,
  setImages,
  stock,
  setStock,
  colores,
  setColores,
  newProduct,
  setNewProduct,
  trigger,
}) {
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [errorMsg, setErrorMsg] = useState(undefined);
  const [feedbackMsg, setFeedbackMsg] = useState(undefined);

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
    } else setErrorMsg("El máximo de imágenes es 3");
  };

  const inputsData = [
    {
      text: "Imágenes del producto",
      element: images.map((img) => {
        return (
          <SettableImageThumbnail
            multiple
            src={img.pvw}
            onChangeFn={(e) => handleAddImage(e)}
          />
        );
      }),
    },
    {
      text: "Nombre del producto",
      element: (
        <StyledInput
          onChangeFn={(e) => setValue(e, "name")}
          val={newProduct["name"]}
          ph="Ej: Remera de algodón"
          width="180px"
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
          width="180px"
        />
      ),
    },
    {
      text: "Categoría",
      element: (
        <Select
          options={categoriesNames}
          onChangeFn={(e) => setValue(e, "category")}
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
            onChangeFn={(e) => setValue(e, "colors")}
            val={newProduct["colors"]}
            ph="Ej: Rojo"
            width="180px"
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
    setErrorMsg(undefined);
    setFeedbackMsg(undefined);
    if (
      newProduct.name &&
      newProduct.price &&
      newProduct.category != "-" &&
      images.length &&
      colores.length
    ) {
      if (images.some((img) => img.file)) {
        const imagesToUpload = images.map((img) => {
          return firebase.addImage("products", img.file).then((imgUrl) => {
            return imgUrl;
          });
        });
        if (!newProduct.id) {
          Promise.all(imagesToUpload).then((uploadedImages) => {
            firebase.addNewDoc(false, "products", {
              ...newProduct,
              price: parseFloat(newProduct.price),
              imgs: uploadedImages,
              stock,
              colors: colores,
            });
          });
        } else {
          Promise.all(imagesToUpload).then((uploadedImages) => {
            firebase.editDoc(false, "products", newProduct.id, {
              ...newProduct,
              price: parseFloat(newProduct.price),
              imgs: uploadedImages,
              stock,
              colors: colores,
            });
          });
        }
      } else {
        const imagesToUpload = images.map((img) => img.pvw);
        firebase.editDoc(false, "products", newProduct.id, {
          ...newProduct,
          price: parseFloat(newProduct.price),
          imgs: imagesToUpload,
          stock,
          colors: colores,
        });
      }
      setNewProduct({});
      setFeedbackMsg("Producto agregado correctamente");
      trigger();
      getProducts();
    } else setErrorMsg("Todos los campos deben estar completos");
  };

  const handleEditProduct = (id, newProduct) => {
    /* firebase.editDoc(false, "products", id, newProduct);
    getProducts(); */
  };

  return (
    <Wrapper>
      <CloseButton onClickFn={() => trigger()} corner="right" />
      <Title>Nuevo producto</Title>
      {inputsData.map(({ text, element }) => {
        return (
          <FormOption key={text} text={text}>
            {element}
          </FormOption>
        );
      })}
      {colores && (
        <ColorsCards button colors={colores} setColors={setColores} />
      )}
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
  position: "relative",
  width: "100%",
});
const Title = styled.h3({
  margin: "0",
  textDecoration: "underline",
});
