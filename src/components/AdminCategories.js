import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GridLoader from "react-spinners/GridLoader";

import CategoryThumbnail from "./CategoryThumbnail";
import CategoriesDisplayThumbnail from "./CategoriesDisplayThumbnail";
import FeedbackMessage from "../components/FeedbackMessage";
import StyledButton from "../components/StyledButton";

import addPhoto from "../images/photo.png";
import firebase from "../firebase/client.js";

export default function AdminCategories() {
  const [allCategories, setAllCategories] = useState(undefined);
  const [categoryImg, setCategoryImg] = useState({ pvw: addPhoto });
  const [categoryName, setCategoryName] = useState("");
  const [draggedVal, setDraggedVal] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState(undefined);
  const [feedbackMsg, setFeedbackMsg] = useState(undefined);

  useEffect(() => {
    firebase.getDocsFromCollection("categories").then((categories) => {
      setAllCategories(categories[0].categories);
    });
  }, []);

  const addCategory = () => {
    if (
      categoryName &&
      categoryImg !== addPhoto &&
      !allCategories.find(
        (cat) => cat.name.toLowerCase() == categoryName.toLowerCase()
      )
    ) {
      errorMsg && setErrorMsg(undefined);
      const ga = `p${allCategories.length + 1}`;
      const endpoint = categoryName.toLowerCase().split(" ").join("-");
      const cat = { endpoint, ga, img: categoryImg, name: categoryName };

      setAllCategories(allCategories.concat(cat));

      setCategoryName("");
      setCategoryImg({ pvw: addPhoto });
    } else
      setErrorMsg(
        "La categoría debe tener imágen y nombre. Los nombres no pueden repetirse"
      );
  };

  const deleteCategory = (name) => {
    const lastGa = `p${allCategories.length}`;
    const categoryToDelete = allCategories.find((cat) => cat.name == name);
    const greatestGaCategory = allCategories.find((cat) => cat.ga == lastGa);

    if (categoryToDelete == greatestGaCategory) {
      setAllCategories(
        allCategories.filter((cat) => cat.name !== categoryToDelete.name)
      );
    } else {
      const newCategories = allCategories
        .filter((cat) => cat.ga !== greatestGaCategory.ga)
        .filter((cat) => cat.name !== categoryToDelete.name)
        .concat({
          ...greatestGaCategory,
          ga: categoryToDelete.ga,
        });
      setAllCategories(newCategories);
    }
  };

  const editCategoryName = (e) => {};

  const editImgOnClickFn = (file) => {};

  const newCategoryName = (e) => setCategoryName(e.target.value);

  const newImgOnClickFn = (file) => {
    const url = URL.createObjectURL(file);
    setCategoryImg({ pvw: url, file });
  };

  const saveChanges = () => {
    const mappedArr = allCategories.map((cat) => {
      return cat.img.file
        ? firebase.addImage("categories", cat.img.file).then((imgUrl) => {
            return { ...cat, img: imgUrl };
          })
        : cat;
    });
    Promise.all(mappedArr).then((solvedArr) => {
      setAllCategories(solvedArr);
      firebase.editDoc(setFeedbackMsg, "categories", "categories", {
        categories: solvedArr,
      });
    });
  };

  return (
    <Container>
      <Title>Categorías</Title>
      {!allCategories ? (
        <GridLoader />
      ) : (
        <>
          <Wrapper>
            <CategoryThumbnail
              img={categoryImg.pvw}
              inputOnChangeFn={newCategoryName}
              inputVal={categoryName}
              imgOnChangeFn={newImgOnClickFn}
            />
            <StyledButton title="✙" onClickFn={() => addCategory()} />
          </Wrapper>
          {errorMsg && <FeedbackMessage msg={errorMsg} type="err" />}
          {allCategories.map(({ img, name }) => {
            return (
              <CategoryThumbnail
                draggable
                deleteFn={deleteCategory}
                key={name}
                img={img.pvw || img}
                imgOnChangeFn={editImgOnClickFn}
                inputVal={name}
                inputOnChangeFn={editCategoryName}
                setDraggedVal={setDraggedVal}
              />
            );
          })}
          {allCategories.length > 0 && (
            <CategoriesDisplayThumbnail
              allCategories={allCategories}
              draggedVal={draggedVal}
              setAllCategories={setAllCategories}
            />
          )}
          {feedbackMsg && <FeedbackMessage msg={feedbackMsg} type="ok" />}
          <StyledButton
            title="GUARDAR CAMBIOS"
            onClickFn={() => saveChanges()}
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
const Wrapper = styled.div({
  display: "flex",
  justifyContent: "space-between",
  width: "345px",
});
const Title = styled.h2({});
