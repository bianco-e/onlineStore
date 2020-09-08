import React from "react";
import styled from "styled-components";

import StarButton from "./StarButton";
import ColorsCards from "./ColorsCards";
import StockCards from "./StockCards";
import IconButton from "./IconButton";

export default function TableRow({
  bgColor,
  confirmToDeleteProduct,
  copyProductLink,
  editProduct,
  product,
  primaryColor,
  secondaryColor,
}) {
  return (
    <Row bgColor={bgColor}>
      <TD>
        <Container jContent="flex-start">
          <StarButton color={product.prom} />
          <ThumbnailsContainer>
            {product.imgs.map((img) => (
              <ImgThumbnail src={img} />
            ))}
          </ThumbnailsContainer>
          <DetailsContainer>
            <Text color={secondaryColor} fSize="10px">
              {product.category}
            </Text>
            <Text
              color={bgColor == "#FFF" ? primaryColor : "#FFF"}
              fSize="14px"
            >
              {product.name}
            </Text>
            <ColorsCards colors={product.colors} />
          </DetailsContainer>
        </Container>
        <Container jContent="space-around">
          <StockCards stock={product.stock} />
          <Text color={secondaryColor} fSize="12px">
            {`$${product.price.toFixed(2)}`}
          </Text>
        </Container>
      </TD>
      <IconButton link onClickFn={() => copyProductLink(product.id)} />
      <IconButton edit onClickFn={() => editProduct(product)} />
      <IconButton
        onClickFn={() => confirmToDeleteProduct(product.id, product.name)}
      />
    </Row>
  );
}

const Row = styled.tr({
  backgroundColor: (props) => props.bgColor,
  position: "relative",
});
const TD = styled.td({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "5px 0",
  width: "100%",
});
const Container = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: (props) => props.jContent,
  marginBottom: "8px",
  width: "100%",
});
const DetailsContainer = styled.div({
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});
const ThumbnailsContainer = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-around",
  paddingRight: "15px",
  width: "100px",
});
const ImgThumbnail = styled.img({
  height: "35px",
  width: "30px",
});
const Text = styled.p({
  color: (props) => props.color,
  fontSize: (props) => props.fSize,
  margin: "0",
});
const ProductContainer = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-start",
  padding: "0 10px",
});
