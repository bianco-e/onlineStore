import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import BuyingProductThumbnail from "./BuyingProductThumbnail";

import StyleContext from "../context/StyleContext";

export default function ProductThumbnail({ product }) {
  const history = useHistory();
  const [showBuying, setShowBuying] = useState(false);
  const { style } = useContext(StyleContext);
  const { primaryColor, secondaryColor } = style;

  const handleClick = (e) => {
    e.stopPropagation();
    setShowBuying(!showBuying);
  };

  return (
    <WrapperButton onClick={() => history.push(`/producto/${product.id}`)}>
      {showBuying && (
        <BuyingProductThumbnail
          product={product}
          setShowBuying={setShowBuying}
        />
      )}
      <Image src={product.imgs[0]} />
      <Button onClick={(e) => handleClick(e)} primary={primaryColor}>
        🛍
      </Button>
      <Name secondary={secondaryColor}>{product.name}</Name>
      <Price primary={primaryColor}>{`$${product.price.toFixed(2)}`}</Price>
    </WrapperButton>
  );
}

const WrapperButton = styled.button({
  alignItems: "center",
  backgroundColor: "white",
  border: "0",
  boxShadow: "0 0 6px rgba(70, 70, 70, .2)",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  margin: "10px 0",
  padding: "0",
  position: "relative",
  width: "30%",
});
const Button = styled.button({
  backgroundColor: (props) => props.primary,
  border: "0",
  borderRadius: "50%",
  bottom: "30%",
  cursor: "pointer",
  padding: "10px",
  position: "absolute",
  width: "40px",
  transition: "all .4s ease",
  ["&:hover"]: {
    boxShadow: "0 0 6px rgba(0, 0, 0, .5)",
  },
});
const Image = styled.img({
  width: "100%",
});
const Name = styled.h4({
  color: "black",
  margin: "5px 0",
  transition: "all .4s ease",
  ["&:hover"]: {
    color: (props) => props.secondary,
  },
});
const Price = styled.p({
  color: (props) => props.primary,
  fontSize: "14px",
});
