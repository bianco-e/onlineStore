import React, { Fragment, useContext, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Media from "react-media";

import BuyingProductThumbnail from "./BuyingProductThumbnail";
import Price from "./Price";
import BagSvg from "./svg/BagSvg";

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
      <Media
        queries={{
          small: "(max-width: 500px)",
          medium: "(min-width: 501px) and (max-width: 780px)",
        }}
      >
        {({ small, medium }) => (
          <Fragment>
            {showBuying && (
              <BuyingProductThumbnail
                product={product}
                setShowBuying={setShowBuying}
              />
            )}
            <Image src={product.imgs[0]} />
            {!small && (
              <Button onClick={(e) => handleClick(e)} primary={primaryColor}>
                <BagSvg fill={secondaryColor} />
              </Button>
            )}
            <Name
              fSize={small ? "14px" : medium ? "16px" : "18px"}
              secondary={secondaryColor}
            >
              {product.name}
            </Name>
            <Price color={primaryColor} price={product.price} />
          </Fragment>
        )}
      </Media>
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
  fontSize: (props) => props.fSize,
  margin: "5px",
  transition: "all .4s ease",
  ["&:hover"]: {
    color: (props) => props.secondary,
  },
});
