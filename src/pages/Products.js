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

import firebase from "../firebase/client.js";

export default function Products() {
  const [productsToShow, setProductsToShow] = useState([]);
  const [categoriesNames, setCategoriesNames] = useState([]);

  let { endpoint } = useParams();

  useEffect(() => {
    firebase.getDocsFromCollection("categories").then((categs) => {
      const names = categs[0].categories.map((cat) => cat.name);
      setCategoriesNames(names);
      if (endpoint) {
        const category = names.find(
          (cat) => cat.toLowerCase().split(" ").join("-") == endpoint
        );
        filterByCategory(category);
      } else {
        firebase
          .getDocsFromCollection("products")
          .then((prods) => setProductsToShow(prods));
      }
    });
  }, []);

  const filterByCategory = (category) => {
    firebase
      .getProductsByCategory(category)
      .then((prods) => setProductsToShow(prods));
  };

  return (
    <Wrapper>
      <TopBar />
      <Container margin="150px 0 0 0">
        <PageTitle text="Productos" />
      </Container>
      <Container margin="10px 0">
        <FilterButton
          categoriesNames={categoriesNames}
          filterByCategory={filterByCategory}
        />
        <SortButton
          productsToShow={productsToShow}
          setProductsToShow={setProductsToShow}
        />
      </Container>
      <ProductsWrapper>
        {productsToShow.map((prod) => {
          const { id, imgs, name, price } = prod;
          return (
            <ProductThumbnail id={id} img={imgs[0]} name={name} price={price} />
          );
        })}
      </ProductsWrapper>
      <BottomBar />
      <WhatsappFloatButton />
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
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
