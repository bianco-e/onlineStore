import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import SortButton from "../components/SortButton";
import ProductThumbnail from "../components/ProductThumbnail";
import { saleProducts } from "../data/data.js";

export default function Products() {
  const [productsToShow, setProductsToShow] = useState([]);

  useEffect(() => {
    setProductsToShow(saleProducts);
  }, []);

  return (
    <Wrapper>
      <TopBar />
      <Container>
        <PageTitle text="Productos" />
        <SortButton
          productsToShow={productsToShow}
          setProductsToShow={setProductsToShow}
        />
      </Container>
      <ProductsWrapper>
        {productsToShow.map((prod) => {
          const { endpoint, img, name, price } = prod;
          return (
            <ProductThumbnail
              endpoint={endpoint}
              img={img}
              name={name}
              price={price}
            />
          );
        })}
      </ProductsWrapper>
      <BottomBar />
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
  marginTop: "150px",
  position: "relative",
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
