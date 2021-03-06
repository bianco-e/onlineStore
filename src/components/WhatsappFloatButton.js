import React, { useContext } from "react";
import styled from "styled-components";

import WhatsappSvg from "./svg/WhatsappSvg";

import StyleContext from "../context/StyleContext";

export default function WhatsappFloatButton({ reference, visibility }) {
  const { whatsapp } = useContext(StyleContext).style;

  return (
    <FloatButton
      ref={reference}
      href={`http://wa.me/${whatsapp}`}
      visibility={visibility}
    >
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
  visibility: (props) => props.visibility,
  ["&:hover"]: {
    boxShadow: "0 0 8px rgba(0, 0, 0, .6)",
  },
});
