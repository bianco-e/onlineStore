import React, { useContext } from "react";
import styled from "styled-components";

import StyleContext from "../context/StyleContext";

export default function StyledInput({ ph, val, onChangeFn, type, width }) {
  const { style } = useContext(StyleContext);
  const { secondaryColor } = style;
  return (
    <Input
      min="0"
      onChange={(e) => onChangeFn(e)}
      placeholder={ph}
      secondary={secondaryColor}
      type={type || "text"}
      value={val}
      width={width}
    />
  );
}

const Input = styled.input({
  backgroundColor: "transparent",
  border: (props) => `1px solid ${props.secondary}`,
  borderRadius: "9999px",
  padding: "8px 12px",
  textAlign: "center",
  width: (props) => props.width,
});
