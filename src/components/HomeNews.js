import React from "react";
import styled from "styled-components";
import ProductThumbnail from "./ProductThumbnail";

export default function HomeNews({ products }) {
  return (
    <Wrapper>
      <NameContainer>
        <SectionName>Nuevo</SectionName>
      </NameContainer>
      <ProductsContainer>
        {products.map((prod) => {
          return <ProductThumbnail key={prod.id} product={prod} />;
        })}
      </ProductsContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  display: "flex",
  marginBottom: "120px",
  padding: "20px 0",
  width: "90%",
});
const ProductsContainer = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
});
const NameContainer = styled.div({
  backgroundColor: "#111",
  padding: "140px 120px 80px 40px",
  textAlign: "center",
});
const SectionName = styled.h1({
  color: "white",
});
