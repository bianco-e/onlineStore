import React, { useContext } from "react";
import styled from "styled-components";

import StyleContext from "../context/StyleContext";

export default function StyledTextArea({ ph, val, onChangeFn, width }) {
  const { style } = useContext(StyleContext);
  const { secondaryColor } = style;

  return (
    <TextArea
      onChange={(e) => onChangeFn(e)}
      placeholder={ph}
      secondary={secondaryColor}
      value={val}
      width={width}
    />
  );
}

const TextArea = styled.textarea({
  backgroundColor: "transparent",
  border: (props) => `1px solid ${props.secondary}`,
  borderRadius: "15px",
  fontFamily: "ubuntu",
  maxHeight: "80px",
  maxWidth: (props) => props.width || "80%",
  minHeight: "80px",
  minWidth: (props) => props.width || "80%",
  padding: "5px 12px",
  textAlign: "center",
});
