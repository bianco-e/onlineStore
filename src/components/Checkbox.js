import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import CheckMarkSvg from "./svg/CheckMarkSvg";

import StyleContext from "../context/StyleContext";

export default function Checkbox({ title, val, onCheck }) {
  const [checked, setChecked] = useState("#FFF");
  const { style } = useContext(StyleContext);
  const { primaryColor, secondaryColor } = style;

  useEffect(() => {
    val ? setChecked(primaryColor) : setChecked("#FFF");
  }, [val]);

  const handleCheck = (title) => {
    setChecked(checked == "#FFF" ? primaryColor : "#FFF");
    onCheck(title);
  };

  return (
    <Label>
      {title}
      <Box
        bgColor={checked}
        secondary={secondaryColor}
        onClick={() => handleCheck(title)}
      >
        {checked == primaryColor && <CheckMarkSvg fill={secondaryColor} />}
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
  height: "15px",
  margin: "0 0 5px 3px",
  placeItems: "center",
  width: "15px",
});
