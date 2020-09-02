import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import PageTitle from "../components/PageTitle";
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import SortButton from "../components/SortButton";
import FilterButton from "../components/FilterButton";
import ProductThumbnail from "../components/ProductThumbnail";
import WhatsappFloatButton from "../components/WhatsappFloatButton";
import LoadingSpinner from "../components/LoadingSpinner";

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
    <Wrapper>
      {!productsToShow ? (
        <LoadingSpinner />
      ) : (
        <>
          <TopBar />
          <Container margin="150px 0 0 0">
            <PageTitle text="Productos" />
          </Container>
          <Container margin="10px 0">
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
          <BottomBar />
        </>
      )}
      <WhatsappFloatButton />
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  position: "relative",
  width: "100%",
});
const Container = styled.section({
  display: "flex",
  justifyContent: "space-evenly",
  margin: (props) => props.margin,
  width: "90%",
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
