import React from "react";
import styled from "styled-components";
import WhatsappSvg from "./svg/WhatsappSvg";

export default function WhatsappFloatButton() {
  const num = "11111";
  return (
    <FloatButton href={`http://wa.me/${num}`}>
      <WhatsappSvg fill="white" width={30} />
    </FloatButton>
  );
}

const FloatButton = styled.a({
  backgroundColor: "green",
  border: "0",
  borderRadius: "50%",
  boxShadow: "0 0 5px rgba(0, 0, 0, .4)",
  bottom: "35px",
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
  padding: "12px",
  position: "fixed",
  right: "35px",
  ["&:hover"]: {
    boxShadow: "0 0 8px rgba(0, 0, 0, .6)",
  },
});
