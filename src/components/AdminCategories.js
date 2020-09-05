import React, { useEffect, useState } from "react";
import styled from "styled-components";

import LoadingSpinner from "../components/LoadingSpinner";
import CategoryThumbnail from "./CategoryThumbnail";
import CategoryInput from "./CategoryInput";
import CategoriesDisplayThumbnail from "./CategoriesDisplayThumbnail";
import FeedbackMessage from "../components/FeedbackMessage";
import StyledButton from "../components/StyledButton";
import ConfirmModal from "../components/ConfirmModal";

import addPhoto from "../images/photo.png";
import firebase from "../firebase/client.js";

export default function AdminCategories() {
  const [allCategories, setAllCategories] = useState(undefined);
  const [editingCategory, setEditingCategory] = useState(undefined);
  const [categoryImg, setCategoryImg] = useState({ url: addPhoto });
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
  const [categoriesNames, setCategoriesNames] = useState({});

  useEffect(() => {
    firebase.getDocsFromCollection("categories").then((cats) => {
      const categories = cats[0].categories;
      setAllCategories(cats[0].categories);
      setCategoriesNames(
        categories
          .map((cat) => cat.name)
          .reduce((obj, item) => {
            return {
              ...obj,
              [item]: [],
            };
          }, {})
      );
    });
  }, []);

  useEffect(() => {
    nameToDelete &&
      firebase
        .getProductsByCategory(nameToDelete)
        .then((prods) => setProductsInACategory(prods));
  }, [nameToDelete]);

  const editCategoryNameInProducts = (oldName, newName) => {
    firebase.getProductsByCategory(oldName).then((prods) => {
      prods.forEach((prod) =>
        firebase.editDoc(false, "products", prod.id, {
          ...prod,
          category: newName,
        })
      );
    });
  };

  const addEditedNameToList = () => {
    if (categoriesNames[editingCategory.name]) {
      setCategoriesNames({
        ...categoriesNames,
        [editingCategory.name]: categoriesNames[editingCategory.name].concat(
          categoryName
        ),
      });
    } else {
      for (let prop in categoriesNames) {
        categoriesNames[prop].find(
          (catName) => catName == editingCategory.name
        ) &&
          setCategoriesNames({
            ...categoriesNames,
            [prop]: categoriesNames[prop].concat(categoryName),
          });
      }
    }
  };

  const addCategory = () => {
    if (allCategories.length < 9) {
      if (
        categoryName &&
        categoryImg.url != addPhoto &&
        !allCategories.find(
          (cat) => cat.name.toLowerCase() == categoryName.toLowerCase()
        )
      ) {
        errorMsg && setErrorMsg(undefined);
        if (editingCategory && editingCategory.name != categoryName) {
          addEditedNameToList();
          setEditingCategory(undefined);
        }
        const ga = `p${allCategories.length + 1}`;
        const endpoint = categoryName.toLowerCase().split(" ").join("-");
        const cat = { endpoint, ga, img: categoryImg, name: categoryName };
        setAllCategories(allCategories.concat(cat));
        setCategoryName("");
        setCategoryImg({ url: addPhoto });
      } else
        setErrorMsg(
          "Los nombres no pueden repetirse y la categoría debe tener imágen y nombre."
        );
    } else setErrorMsg("El máximo de categorías es 9");
  };

  const confirmToDeleteCategory = (name) => {
    setNameToDelete(name);
    setShowConfirmModal(true);
  };

  const deleteCategory = (name) => {
    const lastGa = `p${allCategories.length}`;
    const categoryToDelete = allCategories.find(
      (cat) => cat.name == (name || nameToDelete)
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
    if (productsInACategory) {
      setContainingProductsToDelete(
        containingProductsToDelete.concat(productsInACategory)
      );
      setProductsInACategory(undefined);
    }
  };

  const setCategoryToEdit = (name) => {
    const categoryToEdit = allCategories.find((cat) => cat.name == name);
    setEditingCategory(categoryToEdit);
    setCategoryImg(
      !categoryToEdit.img.url ? { url: categoryToEdit.img } : categoryToEdit.img
    );
    setCategoryName(name);
    deleteCategory(name);
  };

  const newCategoryName = (e) => setCategoryName(e.target.value);

  const newImgOnClickFn = (file) => {
    const url = URL.createObjectURL(file);
    setCategoryImg({ url, file });
  };

  const saveChanges = () => {
    if (containingProductsToDelete.length) {
      containingProductsToDelete.forEach((prod) =>
        firebase.deleteDoc("products", prod.id)
      );
    }
    for (let prop in categoriesNames) {
      if (categoriesNames[prop].length) {
        const lastPos = categoriesNames[prop][categoriesNames[prop].length - 1];
        editCategoryNameInProducts(prop, lastPos);
      }
    }
    const mappedArr = allCategories.map((cat) => {
      return cat.img.file
        ? firebase.addImage("categories", cat.img.file).then((imgUrl) => {
            return { ...cat, img: imgUrl };
          })
        : cat.img.url
        ? { ...cat, img: cat.img.url }
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
    <>
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
            <CategoryInput
              img={categoryImg.url}
              imgOnChangeFn={newImgOnClickFn}
              inputVal={categoryName}
              inputOnChangeFn={newCategoryName}
            />
            <StyledButton title="✙" onClickFn={() => addCategory()} />
          </Wrapper>
          {errorMsg && <FeedbackMessage msg={errorMsg} type="err" />}
          {allCategories.map(({ img, name }) => {
            return (
              <CategoryThumbnail
                confirmToDeleteCategory={confirmToDeleteCategory}
                key={name}
                img={img.url || img}
                name={name}
                setDraggedVal={setDraggedVal}
                setCategoryToEdit={setCategoryToEdit}
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
    </>
  );
}
const Wrapper = styled.div({
  display: "flex",
  justifyContent: "space-between",
  width: "345px",
});
const Title = styled.h2({});
