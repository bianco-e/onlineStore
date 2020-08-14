import React from "react";
import styled from "styled-components";
import prueba1 from "../images/prueba1.png";

export default function LogoButton() {
  return (
    <Button>
      <Image src={prueba1} />
    </Button>
  );
}

const Button = styled.button({
  background: "none",
  border: "0",
  cursor: "pointer",
});
const Image = styled.img({
  borderRadius: "50%",
  height: "50px",
  width: "50px",
});
