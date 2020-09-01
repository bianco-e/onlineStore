import React from "react";
import styled from "styled-components";

import CloseButton from "./CloseButton";
import StarButton from "./StarButton";
import StyledButton from "./StyledButton";

import firebase from "../firebase/client.js";

export default function ChoosePromModal({
  callback,
  setShowModal,
  promProducts,
}) {
  const handleStarClick = (prod) => {
    firebase.editDoc(false, "products", prod.id, { ...prod, prom: !prod.prom });
  };

  return (
    <Wrapper>
      <CloseButton corner="right" onClickFn={() => setShowModal(false)} />
      <Title>Ya existen 3 productos promocionados</Title>
      <Text fSize="16px">Para agregar este producto deberías sacar uno.</Text>
      {promProducts.map((prod) => {
        const { name, imgs, id, category, price, prom } = prod;
        return (
          <Container key={id}>
            <StarButton
              button
              color={prom}
              onClickFn={() => handleStarClick(prod)}
            />
            <Image src={imgs[0]} />
            <Text>{category}</Text>
            <Text>{name}</Text>
            <Text>${price.toFixed(2)}</Text>
          </Container>
        );
      })}
      <StyledButton
        title="Agregar producto"
        onClickFn={() => {
          callback();
          setShowModal(false);
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div({
  background: "#FFF",
  alignItems: "center",
  border: "1px solid #EEE",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  height: "270px",
  justifyContent: "space-between",
  padding: "25px 10px",
  position: "absolute",
  top: "20%",
  width: "370px",
  zIndex: "3",
});
const Container = styled.div({
  border: "1px solid #EEE",
  borderRadius: "10px",
  background: "rgba(250, 250, 250, 0.5)",
  display: "flex",
  justifyContent: "space-between",
  padding: "5px",
  width: "100%",
});
const Title = styled.h4({
  textAlign: "center",
});
const Text = styled.p({
  fontSize: (props) => props.fSize || "12px",
  margin: "0",
  textAlign: "center",
});
const Image = styled.img({
  height: "25px",
  width: "25px",
});
