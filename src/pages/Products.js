import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import PageStructure from "../components/PageStructure";
import LoadingSpinner from "../components/LoadingSpinner";
import SortButton from "../components/SortButton";
import FilterButton from "../components/FilterButton";
import ProductThumbnail from "../components/ProductThumbnail";

import firebase from "../firebase/client.js";

export default function Products() {
  const [productsToShow, setProductsToShow] = useState(undefined);
  const [categoriesNames, setCategoriesNames] = useState([]);

  let { endpoint, keyword } = useParams();

  const getAllProducts = () =>
    firebase
      .getDocsFromCollection("products")
      .then((prods) => setProductsToShow(prods));

  useEffect(() => {
    firebase.getDocByID("categories", "categories").then((categs) => {
      const names = categs.categories.map((cat) => cat.name);
      setCategoriesNames(names);
      if (endpoint)
        filterByCategory(
          names.find(
            (cat) => cat.toLowerCase().split(" ").join("-") == endpoint
          )
        );
      if (keyword)
        firebase
          .getProductsByName(keyword)
          .then((prods) => setProductsToShow(prods));
      if (!keyword && !endpoint) getAllProducts();
    });
  }, []);

  const filterByCategory = (category) => {
    firebase
      .getProductsByCategory(category)
      .then((prods) => setProductsToShow(prods));
  };

  return (
    <>
      {!productsToShow ? (
        <LoadingSpinner />
      ) : (
        <PageStructure title="Productos">
          <Container>
            <FilterButton
              categoriesNames={categoriesNames}
              filterByCategory={filterByCategory}
              reset={getAllProducts}
            />
            <SortButton
              productsToShow={productsToShow}
              setProductsToShow={setProductsToShow}
            />
          </Container>
          {!productsToShow.length ? (
            <Text>No se encontraron resultados.</Text>
          ) : (
            <ProductsWrapper>
              {productsToShow.map((prod) => {
                return <ProductThumbnail key={prod.id} product={prod} />;
              })}
            </ProductsWrapper>
          )}
        </PageStructure>
      )}
    </>
  );
}

const Container = styled.section({
  display: "flex",
  justifyContent: "space-evenly",
  margin: "10px 0",
  width: "95%",
});
const ProductsWrapper = styled.section({
  alignItems: "flex-start",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginBottom: "120px",
  width: "90%",
});
const Text = styled.p({});
