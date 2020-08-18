import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminPanel from "../components/AdminPanel";
import CategoryThumbnail from "../components/CategoryThumbnail";
import addPhoto from "../images/photo.png";
import firebase from "../firebase/client.js";

export default function AdminCategories() {
  const [categoriesFromFirebase, setCategoriesFromFirebase] = useState([]);
  const [categoryId, setCategoryId] = useState(undefined);
  const [categoryImg, setCategoryImg] = useState(addPhoto);
  const [categoryName, setCategoryName] = useState("");

  useEffect(
    () =>
      firebase.getDocsFromCollection("categories").then((categories) => {
        setCategoriesFromFirebase(categories);
      }),
    []
  );

  const addCategoryToFirebase = () => {
    if (categoryName !== "") {
      const endpoint = categoryName.toLowerCase().split(" ").join("-");
      const cat = { endpoint, img: categoryImg, name: categoryName };

      firebase.addNewDoc(setCategoryId, "categories", cat);
      setCategoriesFromFirebase(
        categoriesFromFirebase.concat({ ...cat, id: categoryId })
      );
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

  const newCategoryOnChangeFn = (val) => setCategoryName(val);
  const editCategoryOnChangeFn = (val) => {};

  const saveChanges = () => console.log(categoriesFromFirebase);

  return (
    <Wrapper>
      <AdminPanel />
      <Container>
        <Header>
          <Title>Categorías</Title>
        </Header>
        <Header>
          <CategoryThumbnail
            img={addPhoto}
            inputOnChangeFn={newCategoryOnChangeFn}
            inputVal={categoryName}
          />
          <Button onClick={() => addCategoryToFirebase()}>
            ✙ Agregar categoría
          </Button>
        </Header>
        {categoriesFromFirebase.map(({ id, img, name }) => {
          return (
            <CategoryThumbnail
              draggable
              deleteFn={deleteCategoryFromFirebase}
              key={name}
              id={id}
              img={img}
              inputOnChangeFn={editCategoryOnChangeFn}
              inputVal={name}
            />
          );
        })}
        <Button onClick={() => saveChanges()}>GUARDAR</Button>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "flex-start",
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
});
const Title = styled.h2({});
const Container = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  width: "90%",
});
const Header = styled.section({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-evenly",
  width: "90%",
});
const Button = styled.button({
  border: "1px solid #FFA07A",
  borderRadius: "10px",
  backgroundColor: "#FFA07A",
  color: "white",
  cursor: "pointer",
  fontSize: "11px",
  padding: "8px 20px",
  transition: "background-color .6s ease",
  transition: "all .6s ease",
  ["&:hover"]: {
    backgroundColor: "rgba(250, 250, 250, .7)",
    border: "1px solid #FFA07A",
    color: "#FFA07A",
  },
});
