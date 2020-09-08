import React, { useContext } from "react";
import styled from "styled-components";

import StyleContext from "../context/StyleContext";

export default function StyledButton({ inverted, onClickFn, title, width }) {
  const { style } = useContext(StyleContext);
  const { primaryColor, secondaryColor } = style;

  const handleClick = (e) => {
    e.stopPropagation();
    onClickFn();
  };

  return (
    <Button
      onClick={(e) => handleClick(e)}
      primary={inverted ? secondaryColor : primaryColor}
      width={width || undefined}
    >
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
  fontSize: "11px",
  padding: "8px 20px",
  width: (props) => props.width,
  transition: "all .6s ease",
  ["&:hover"]: {
    backgroundColor: "rgba(250, 250, 250, .7)",
    border: (props) => `1px solid ${props.primary}`,
    color: (props) => props.primary,
  },
});
