import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CategoryThumbnail from "./CategoryThumbnail";
import CategoriesDisplayThumbnail from "./CategoriesDisplayThumbnail";
import ErrorMessage from "../components/ErrorMessage";

import addPhoto from "../images/photo.png";
import firebase from "../firebase/client.js";

import StyleContext from "../context/StyleContext";

export default function AdminCategories() {
  const [categoriesFromFirebase, setCategoriesFromFirebase] = useState([]);
  const [newCategory, setNewCategory] = useState(undefined);
  const [categoryId, setCategoryId] = useState(undefined);
  const [categoryImg, setCategoryImg] = useState(addPhoto);
  const [loadedFile, setLoadedFile] = useState(undefined);
  const [categoryName, setCategoryName] = useState("");
  const [draggedVal, setDraggedVal] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState(undefined);

  const { style } = useContext(StyleContext);
  const { primaryColor } = style;

  useEffect(
    () =>
      firebase.getDocsFromCollection("categories").then((categories) => {
        setCategoriesFromFirebase(categories);
      }),
    []
  );

  useEffect(
    () =>
      categoryId &&
      setCategoriesFromFirebase(
        categoriesFromFirebase.concat({ ...newCategory, id: categoryId })
      ),
    [categoryId]
  );

  const addCategoryToFirebase = () => {
    if (categoryName !== "" && categoryImg !== addPhoto) {
      const endpoint = categoryName.toLowerCase().split(" ").join("-");
      const cat = { endpoint, img: categoryImg, name: categoryName };
      setNewCategory(cat);

      firebase.addImage("categories", loadedFile).then((imgUrl) => {
        firebase.addNewDoc(setCategoryId, "categories", {
          ...cat,
          img: imgUrl,
        });
      });

      setCategoryName("");
      setCategoryImg(addPhoto);
    } else setErrorMsg("La categoría debe tener imágen y nombre");
  };

  const deleteCategoryFromFirebase = (id) => {
    firebase.deleteProduct("categories", id);
    setCategoriesFromFirebase(
      categoriesFromFirebase.filter((cat) => cat.id !== id)
    );
  };

  const newImgOnClickFn = (e) => {
    setLoadedFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setCategoryImg(url);
  };

  const saveChanges = () => {
    if (categoriesOrder.every((category) => category.content)) {
      const id = "categoriesorder";
      firebase.editDoc("categoriesOrder", categoriesOrder);
    }
  };

  return (
    <Container>
      <Title>Categorías</Title>
      <CategoryThumbnail
        img={categoryImg}
        inputValSetter={setCategoryName}
        inputVal={categoryName}
        imgOnChangeFn={newImgOnClickFn}
      />
      <Button onClick={() => addCategoryToFirebase()} primary={primaryColor}>
        ✙ Agregar categoría
      </Button>
      {errorMsg && <ErrorMessage msg={errorMsg} />}
      {categoriesFromFirebase.map(({ id, img, name }) => {
        return (
          <CategoryThumbnail
            draggable
            deleteFn={deleteCategoryFromFirebase}
            key={id}
            id={id}
            img={img}
            inputVal={name}
            setDraggedVal={setDraggedVal}
          />
        );
      })}
      {categoriesFromFirebase.length > 0 && (
        <CategoriesDisplayThumbnail
          categoriesFromFirebase={categoriesFromFirebase}
          draggedVal={draggedVal}
          setCategoriesFromFirebase={setCategoriesFromFirebase}
        />
      )}
      <Button onClick={() => saveChanges()} primary={primaryColor}>
        GUARDAR
      </Button>
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
const Button = styled.button({
  border: (props) => `1px solid ${props.primary}`,
  borderRadius: "10px",
  backgroundColor: (props) => props.primary,
  color: "white",
  cursor: "pointer",
  fontSize: "11px",
  marginBottom: "15px",
  padding: "8px 20px",
  transition: "all .6s ease",
  ["&:hover"]: {
    backgroundColor: "rgba(250, 250, 250, .7)",
    border: (props) => `1px solid ${props.primary}`,
    color: (props) => props.primary,
  },
});
