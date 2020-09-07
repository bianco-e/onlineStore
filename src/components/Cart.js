import React, { Fragment, useContext, useState } from "react";
import styled from "styled-components";
import Media from "react-media";

import StyledButton from "./StyledButton";
import IconButton from "./IconButton";

import CartContext from "../context/CartContext";
import StyleContext from "../context/StyleContext";

export default function Cart() {
  const { cart, removeProductFromCart, total } = useContext(CartContext);
  const { style } = useContext(StyleContext);
  const { primaryColor } = style;

  return (
    <>
      <Title>Carrito</Title>
      {cart.length < 1 ? (
        <Title fSize="16px">Tu carrito está vacío.</Title>
      ) : (
        <Media
          queries={{
            small: "(max-width: 500px)",
            medium: "(min-width: 501px) and (max-width: 780px)",
          }}
        >
          {({ small, medium }) => (
            <Fragment>
              {cart.map((product) => {
                const { color, id, img, name, price, size } = product;
                return (
                  <ProductContainer key={id}>
                    <ProductImg src={img} />
                    <ProductDetailsContainer>
                      <Text
                        fSize={small || medium ? "11px" : "14px"}
                      >{`${name} (${color}, ${size})`}</Text>
                      <Text
                        color={primaryColor}
                        fSize={small || medium ? "11px" : "14px"}
                      >{`$${price.toFixed(2)}`}</Text>
                    </ProductDetailsContainer>
                    <IconButton
                      onClickFn={() => removeProductFromCart(product)}
                    />
                  </ProductContainer>
                );
              })}
              <Divisor />
              <Text
                color="#EEE"
                fSize={small || medium ? "12px" : "14px"}
                fWeight="bold"
                margin="1px 0 5px 0"
              >
                {`Total:   ${total}`}
              </Text>
              <StyledButton inverted onClickFn={() => {}} title="Comprar" />
            </Fragment>
          )}
        </Media>
      )}
    </>
  );
}
const Title = styled.h3({
  marginTop: "60px",
  fontSize: (props) => props.fSize,
  textAlign: "center",
});
const ProductDetailsContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: "5px 0",
  minHeight: "60px",
});
const ProductContainer = styled.div({
  background: "#FFF",
  borderRadius: "10px",
  display: "flex",
  marginBottom: "10px",
  padding: "5px",
  position: "relative",
  width: "100%",
});
const ProductImg = styled.img({
  height: "60px",
  marginRight: "8px",
  width: "60px",
});
const Text = styled.p({
  color: (props) => props.color,
  fontSize: (props) => props.fSize,
  fontWeight: (props) => props.fWeight,
  margin: (props) => props.margin || "1px 0",
});
const Divisor = styled.hr({
  border: "1px solid #EEE",
  width: "100%",
});
