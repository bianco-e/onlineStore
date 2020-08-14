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
      {cart.length < 1 ? (
        <Text>Tu carrito está vacío.</Text>
      ) : (
        cart.map((product) => {
          const { color, id, img, name, price } = product;
          return (
            <ProductContainer key={id}>
              <ProductImg src={img} />
              <ProductDetailsContainer>
                <ProductName>{`${name}(${color})`}</ProductName>
                <ProductPrice>{price}</ProductPrice>
              </ProductDetailsContainer>
              <RemoveButton onClick={() => removeProductFromCart(product)}>
                <DeleteSvg width={15} />
              </RemoveButton>
            </ProductContainer>
          );
        })
      )}
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
  justifyContent: "center",
  padding: "20px",
  position: "fixed",
  right: "0",
  top: "0",
  width: "335px",
  zIndex: "100",
});
const Text = styled.h3({});
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
  justifyContent: "center",
  height: "50px",
});
const ProductContainer = styled.div({
  border: "1px solid #000",
  background: "#FFF",
  display: "flex",
  width: "100%",
});
const ProductImg = styled.img({
  height: "50px",
  width: "40px",
});
const ProductName = styled.p({
  margin: "1px 0",
  fontSize: "13px",
  ["&:hover"]: {
    color: "#777",
  },
});
const ProductPrice = styled.p({
  fontSize: "14px",
});
const RemoveButton = styled.button({
  background: "none",
  border: "0",
  position: "absolute",
  right: "5px",
  top: "3px",
});
