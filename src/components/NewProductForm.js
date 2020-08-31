import React, { useEffect, useState } from "react";
import styled from "styled-components";

import StyledButton from "./StyledButton";
import StyledInput from "./StyledInput";
import StyledTextArea from "../components/StyledTextArea";
import FormOption from "./FormOption";
import Select from "./Select";
import MultipleChoice from "./MultipleChoice";
import FeedbackMessage from "./FeedbackMessage";
import ColorsCards from "./ColorsCards";
import SettableImageThumbnail from "./SettableImageThumbnail";
import CloseButton from "./CloseButton";
import StarButton from "./StarButton";

import addPhoto from "../images/photo.png";
import firebase from "../firebase/client.js";
import { emptyStock } from "../data/data.js";

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
  promProduct,
  setPromProduct,
  returnEditingProductToList,
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

  const resetForm = () => {
    setNewProduct({});
    setImages([{ pvw: addPhoto }]);
    setColores([]);
    setStock(emptyStock);
  };

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
      element: <MultipleChoice stock={stock} setStock={setStock} />,
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
    const productToUpload = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      prom: promProduct,
      stock,
      colors: colores,
    };
    const { name, price, category, description, id } = newProduct;

    if (
      name &&
      price &&
      description &&
      category != "-" &&
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
                  ...productToUpload,
                  imgs: uploadedImages,
                })
                .then(getProducts);
            })
          : Promise.all(imagesToUpload)
              .then((uploadedImages) => {
                firebase.editDoc(false, "products", id, {
                  ...productToUpload,
                  imgs: uploadedImages,
                });
              })
              .then(getProducts);
      } else {
        const imagesToUpload = images.map((img) => img.pvw);
        firebase
          .editDoc(false, "products", id, {
            ...productToUpload,
            imgs: imagesToUpload,
          })
          .then(getProducts);
      }
      resetForm();
      setFeedbackMsg("Producto agregado correctamente");
      trigger();
    } else setErrorMsg("Todos los campos deben estar completos");
  };

  const handleClose = () => {
    trigger();
    returnEditingProductToList();
    resetForm();
  };

  return (
    <Wrapper>
      <CloseButton onClickFn={() => handleClose()} corner="right" />
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
      <StarButton
        button
        color={promProduct}
        onClickFn={() => setPromProduct(!promProduct)}
      />
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
