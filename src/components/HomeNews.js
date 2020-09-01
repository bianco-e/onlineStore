import React, { useContext } from "react";
import styled from "styled-components";
import ProductThumbnail from "./ProductThumbnail";

import StyleContext from "../context/StyleContext";

export default function HomeNews({ products }) {
  const { style } = useContext(StyleContext);
  const { promText } = style;

  return (
    <Wrapper>
      <NameContainer>
        <SectionName>{promText || "Nuevo"}</SectionName>
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
  width: "80%",
});
const NameContainer = styled.div({
  alignItems: "center",
  backgroundColor: "#111",
  display: "flex",
  justifyContent: "flex-end",
  height: "260px",
  width: "20%",
});
const SectionName = styled.h1({
  color: "white",
  marginRight: "10%",
});
