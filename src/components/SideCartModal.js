import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import CartContext from "../context/CartContext";
import CloseButton from "./CloseButton";
import DeleteButton from "./DeleteButton";

export default function SideCartModal({ showModal, setShowModal }) {
  const { cart, removeProductFromCart } = useContext(CartContext);

  useEffect(() => {
    showModal && document.addEventListener("click", handleModal);
    return () => {
      document.removeEventListener("click", handleModal);
    };
  }, [showModal]);

  const handleModal = () => setShowModal(!showModal);

  return (
    <Wrapper>
      <CloseButton onClickFn={() => setShowModal(!showModal)} corner="left" />
      <Title>Carrito</Title>
      {cart.length < 1 ? (
        <Title>Tu carrito está vacío.</Title>
      ) : (
        cart.map((product) => {
          const { color, id, img, name, price, size } = product;
          return (
            <ProductContainer key={id}>
              <ProductImg src={img} />
              <ProductDetailsContainer>
                <Text>{`${name} (${color}, ${size})`}</Text>
                <Text color="#FFA07A">{`$${price.toFixed(2)}`}</Text>
              </ProductDetailsContainer>
              <DeleteButton onClickFn={() => removeProductFromCart(product)} />
            </ProductContainer>
          );
        })
      )}
      {/* <Button>COMPRAR</Button> */}
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  backgroundColor: "#FFA07A",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  justifyContent: "flex-start",
  padding: "20px",
  position: "fixed",
  right: "0",
  top: "0",
  width: "335px",
  zIndex: "100",
});
const Title = styled.h3({});
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
  margin: "1px 0",
});
