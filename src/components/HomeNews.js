import React, { Fragment, useContext } from "react";
import styled from "styled-components";
import Media from "react-media";
import ProductThumbnail from "./ProductThumbnail";

import StyleContext from "../context/StyleContext";

export default function HomeNews({ products }) {
  const { style } = useContext(StyleContext);
  const { promText } = style;

  return (
    <>
      <Media
        queries={{
          small: "(max-width: 550px)",
          medium: "(min-width: 551px) and (max-width: 780px)",
        }}
      >
        {({ small, medium }) => (
          <Fragment>
            <Wrapper flexDir={small || medium ? "column" : "row"}>
              <NameContainer
                height={small || medium ? "50px" : "260px"}
                width={small || medium ? "100%" : "20%"}
              >
                <SectionName fSize={small ? "20px" : medium ? "25px" : "32px"}>
                  {promText || "Nuevo"}
                </SectionName>
              </NameContainer>
              <ProductsContainer>
                {products.map((prod) => {
                  return <ProductThumbnail key={prod.id} product={prod} />;
                })}
              </ProductsContainer>
            </Wrapper>
          </Fragment>
        )}
      </Media>
    </>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: (props) => props.flexDir,
  marginBottom: "120px",
  padding: "20px 0",
  width: "90%",
});
const ProductsContainer = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});
const NameContainer = styled.div({
  alignItems: "center",
  backgroundColor: "#111",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  height: (props) => props.height,
  width: (props) => props.width,
});
const SectionName = styled.span({
  color: "white",
  fontSize: (props) => props.fSize,
  fontWeight: "bold",
  marginRight: "10%",
});
