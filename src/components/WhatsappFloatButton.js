import React, { useContext } from "react";
import styled from "styled-components";
import WhatsappSvg from "./svg/WhatsappSvg";

import StyleContext from "../context/StyleContext";

export default function WhatsappFloatButton() {
  const { style } = useContext(StyleContext);
  const { whatsapp } = style;
  return (
    <FloatButton href={`http://wa.me/${whatsapp}`}>
      <WhatsappSvg fill="white" width={22} />
    </FloatButton>
  );
}

const FloatButton = styled.a({
  backgroundColor: "#4dc247",
  border: "0",
  borderRadius: "50%",
  boxShadow: "0 0 5px rgba(0, 0, 0, .4)",
  bottom: "30px",
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
  padding: "12px",
  position: "fixed",
  right: "30px",
  ["&:hover"]: {
    boxShadow: "0 0 8px rgba(0, 0, 0, .6)",
  },
});
