import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import CheckMarkSvg from "./svg/CheckMarkSvg";

import StyleContext from "../context/StyleContext";

export default function Checkbox({ title, checked, onCheck }) {
  const [bgColor, setBgColor] = useState("#FFF");
  const { style } = useContext(StyleContext);
  const { primaryColor, secondaryColor } = style;

  useEffect(() => {
    checked ? setBgColor(primaryColor) : setBgColor("#FFF");
  }, [checked]);

  const handleCheck = (title) => {
    setBgColor(bgColor == "#FFF" ? primaryColor : "#FFF");
    onCheck(title);
  };

  return (
    <Label>
      {title}
      <Box
        bgColor={bgColor}
        secondary={secondaryColor}
        onClick={() => handleCheck(title)}
      >
        {bgColor == primaryColor && <CheckMarkSvg fill={secondaryColor} />}
      </Box>
    </Label>
  );
}

const Label = styled.label({
  display: "flex",
  fontSize: "11px",
});
const Box = styled.div({
  background: (props) => props.bgColor,
  cursor: "pointer",
  border: (props) => `1px solid ${props.secondary}`,
  borderRadius: "5px",
  display: "grid",
  marginLeft: "3px",
  height: "15px",
  placeItems: "center",
  width: "15px",
});
