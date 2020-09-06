import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CartContext from "../context/CartContext";
import StyledButton from "./StyledButton";
import CloseButton from "./CloseButton";
import IconButton from "./IconButton";

export default function Cart() {
  const { cart, removeProductFromCart } = useContext(CartContext);
  const [total, setTotal] = useState("");

  useEffect(() => {
    cart.length &&
      setTotal(
        cart.map((item) => item.price).reduce((acc, current) => acc + current)
      );
  }, [cart]);

  return (
    <>
      <Title>Carrito</Title>
      {cart.length < 1 ? (
        <Title fSize="16px">Tu carrito está vacío.</Title>
      ) : (
        <>
          {cart.map((product) => {
            const { color, id, img, name, price, size } = product;
            return (
              <ProductContainer key={id}>
                <ProductImg src={img} />
                <ProductDetailsContainer>
                  <Text>{`${name} (${color}, ${size})`}</Text>
                  <Text color="#FFA07A">{`$${price.toFixed(2)}`}</Text>
                </ProductDetailsContainer>
                <IconButton onClickFn={() => removeProductFromCart(product)} />
              </ProductContainer>
            );
          })}
          <Divisor />
          <Text color="#EEE" fWeight="bold">
            {`Total:   ${total}`}
          </Text>
          <StyledButton
            inverted
            onClickFn={() => {}}
            title="Confirmar compra"
          />
        </>
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
  justifyContent: "flex-start",
  height: "70px",
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
  height: "70px",
  marginRight: "10px",
  width: "60px",
});
const Text = styled.p({
  color: (props) => props.color,
  fontSize: "14px",
  fontWeight: (props) => props.fWeight,
  margin: "1px 0",
});
const Divisor = styled.hr({
  border: "1px solid #EEE",
  width: "100%",
});
