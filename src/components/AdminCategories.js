import React, { useEffect, useState } from "react";
import styled from "styled-components";

import LoadingSpinner from "../components/LoadingSpinner";
import CategoryThumbnail from "./CategoryThumbnail";
import CategoriesDisplayThumbnail from "./CategoriesDisplayThumbnail";
import FeedbackMessage from "../components/FeedbackMessage";
import StyledButton from "../components/StyledButton";
import ConfirmModal from "../components/ConfirmModal";

import addPhoto from "../images/photo.png";
import firebase from "../firebase/client.js";

export default function AdminCategories() {
  const [allCategories, setAllCategories] = useState(undefined);
  const [categoryImg, setCategoryImg] = useState({ pvw: addPhoto });
  const [categoryName, setCategoryName] = useState("");
  const [draggedVal, setDraggedVal] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState(undefined);
  const [feedbackMsg, setFeedbackMsg] = useState(undefined);
  const [nameToDelete, setNameToDelete] = useState(undefined);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productsInACategory, setProductsInACategory] = useState(undefined);
  const [containingProductsToDelete, setContainingProductsToDelete] = useState(
    []
  );

  useEffect(() => {
    firebase.getDocsFromCollection("categories").then((categories) => {
      setAllCategories(categories[0].categories);
    });
  }, []);

  useEffect(() => {
    nameToDelete &&
      firebase
        .getProductsByCategory(nameToDelete)
        .then((prods) => setProductsInACategory(prods));
  }, [nameToDelete]);

  const addCategory = () => {
    if (allCategories.length < 9) {
      if (
        categoryName &&
        categoryImg.pvw !== addPhoto &&
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
    } else setErrorMsg("El máximo de categorías es 8");
  };

  const confirmToDeleteCategory = (name) => {
    setNameToDelete(name);
    setShowConfirmModal(true);
  };

  const deleteCategory = () => {
    const lastGa = `p${allCategories.length}`;
    const categoryToDelete = allCategories.find(
      (cat) => cat.name == nameToDelete
    );
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
    setNameToDelete(undefined);
    setContainingProductsToDelete(
      containingProductsToDelete.concat(productsInACategory)
    );
    setProductsInACategory(undefined);
  };

  const editCategoryName = (e) => {};

  const editImgOnClickFn = (file) => {};

  const newCategoryName = (e) => setCategoryName(e.target.value);

  const newImgOnClickFn = (file) => {
    const url = URL.createObjectURL(file);
    setCategoryImg({ pvw: url, file });
  };

  const saveChanges = () => {
    if (containingProductsToDelete.length) {
      containingProductsToDelete.forEach((prod) =>
        firebase.deleteDoc("products", prod.id)
      );
    }
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

  const getModalData = () => {
    let text;
    if (productsInACategory) {
      text = productsInACategory.length
        ? `${nameToDelete} contiene ${productsInACategory.length} productos. Al guardar los cambios, todos los productos contenidos serán eliminados.`
        : `${nameToDelete} no contiene productos.`;
    }
    return {
      title: `¿Seguro que deseas eliminar la categoría ${nameToDelete}?`,
      text,
    };
  };

  return (
    <Container>
      <Title>Categorías</Title>
      {showConfirmModal && (
        <ConfirmModal
          callback={deleteCategory}
          setIdToDelete={setNameToDelete}
          setProductsInACategory={setProductsInACategory}
          setShowModal={setShowConfirmModal}
          data={getModalData()}
        />
      )}
      {!allCategories ? (
        <LoadingSpinner />
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
                confirmToDeleteCategory={confirmToDeleteCategory}
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
