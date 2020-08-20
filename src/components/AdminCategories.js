import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CategoryThumbnail from "./CategoryThumbnail";
import CategoriesDisplayThumbnail from "./CategoriesDisplayThumbnail";
import addPhoto from "../images/photo.png";
import firebase from "../firebase/client.js";

export default function AdminCategories() {
  const [categoriesFromFirebase, setCategoriesFromFirebase] = useState([]);
  const [newCategory, setNewCategory] = useState(undefined);
  const [categoryId, setCategoryId] = useState(undefined);
  const [categoryImg, setCategoryImg] = useState(addPhoto);
  const [loadedFile, setLoadedFile] = useState(undefined);
  const [categoryName, setCategoryName] = useState("");
  const [draggedVal, setDraggedVal] = useState(undefined);

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
    }
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

  const saveChanges = () => console.log(categoriesFromFirebase);

  return (
    <Container>
      <Title>Categorías</Title>
      <CategoryThumbnail
        img={categoryImg}
        inputValSetter={setCategoryName}
        inputVal={categoryName}
        imgOnChangeFn={newImgOnClickFn}
      />
      <Button onClick={() => addCategoryToFirebase()}>
        ✙ Agregar categoría
      </Button>
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
          n={categoriesFromFirebase.length}
          draggedVal={draggedVal}
        />
      )}
      <Button onClick={() => saveChanges()}>GUARDAR</Button>
    </Container>
  );
}

const Container = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  padding: "50px 0",
  width: "90%",
});
const Title = styled.h2({});
const Button = styled.button({
  border: "1px solid #FFA07A",
  borderRadius: "10px",
  backgroundColor: "#FFA07A",
  color: "white",
  cursor: "pointer",
  fontSize: "11px",
  marginBottom: "15px",
  padding: "8px 20px",
  transition: "all .6s ease",
  ["&:hover"]: {
    backgroundColor: "rgba(250, 250, 250, .7)",
    border: "1px solid #FFA07A",
    color: "#FFA07A",
  },
});
