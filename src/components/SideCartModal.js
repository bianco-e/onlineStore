import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import CartContext from "../context/CartContext";
import DeleteSvg from "./svg/DeleteSvg";

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
      <CloseButton onClick={() => setShowModal(!showModal)}>✗</CloseButton>
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
              <RemoveButton onClick={() => removeProductFromCart(product)}>
                <DeleteSvg width={17} />
              </RemoveButton>
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
const CloseButton = styled.button({
  background: "none",
  border: "0",
  color: "#000",
  cursor: "pointer",
  fontSize: "22px",
  position: "absolute",
  left: "20px",
  top: "20px",
  transition: "color .4s ease",
  ["&:hover"]: {
    color: "#777",
  },
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
  margin: "1px 0",
});
const RemoveButton = styled.button({
  background: "none",
  border: "0",
  cursor: "pointer",
  position: "absolute",
  right: "1px",
  top: "5px",
});
