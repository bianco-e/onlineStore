import React, { useContext } from "react";
import styled from "styled-components";

import StyleContext from "../context/StyleContext";

export default function StyledButton({ onClickFn, title }) {
  const { style } = useContext(StyleContext);
  const { primaryColor } = style;
  return (
    <Button onClick={() => onClickFn()} primary={primaryColor}>
      {title}
    </Button>
  );
}

const Button = styled.button({
  border: (props) => `1px solid ${props.primary}`,
  borderRadius: "10px",
  backgroundColor: (props) => props.primary,
  color: "white",
  cursor: "pointer",
  fontSize: "12px",
  padding: "8px 20px",
  transition: "background-color .6s ease",
  transition: "all .6s ease",
  ["&:hover"]: {
    backgroundColor: "rgba(250, 250, 250, .7)",
    border: (props) => `1px solid ${props.primary}`,
    color: (props) => props.primary,
  },
});
