import React from "react";
import styled from "styled-components";

import StarButton from "./StarButton";
import firebase from "../firebase/client.js";

export default function PromProductsViewer({ promProducts }) {
  const handleStarClick = (prod) =>
    firebase.editDoc(false, "products", prod.id, { ...prod, prom: !prod.prom });
  return (
    <>
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
    </>
  );
}

const Container = styled.div({
  border: "1px solid #EEE",
  borderRadius: "10px",
  background: "rgba(250, 250, 250, 0.5)",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "7px",
  padding: "5px",
  width: "100%",
});
const Text = styled.p({
  fontSize: "12px",
  margin: "0",
  textAlign: "center",
});
const Image = styled.img({
  height: "25px",
  width: "25px",
});
