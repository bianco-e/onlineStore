import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

export default function ProductThumbnail({ endpoint, img, name, price }) {
  const history = useHistory();
  const handleClick = (e) => {
    e.stopPropagation();
  };
  return (
    <WrapperButton
      onClick={() => {
        history.push(endpoint);
      }}
    >
      <Image src={img} />
      <Button onClick={(e) => handleClick(e)}>🛍</Button>
      <Name>{name}</Name>
      <Price>{`$${price.toFixed(2)}`}</Price>
    </WrapperButton>
  );
}

const WrapperButton = styled.button({
  alignItems: "center",
  backgroundColor: "white",
  border: "0",
  boxShadow: "0 0 8px rgba(70, 70, 70, .2)",
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
  backgroundColor: "#FFA07A",
  border: "0",
  borderRadius: "50%",
  bottom: "30%",
  cursor: "pointer",
  padding: "10px",
  position: "absolute",
  width: "40px",
  transition: "box-shadow .3s ease",
  ["&:hover"]: {
    boxShadow: "0 0 6px rgba(0, 0, 0, .5)",
  },
});
const Image = styled.img({
  width: "100%",
});
const Name = styled.h5({
  color: "black",
  transition: "color .4s ease",
  ["&:hover"]: {
    color: "#777",
  },
});
const Price = styled.p({
  color: "#FFA07A",
});
