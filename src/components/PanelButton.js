import React from "react";
import styled from "styled-components";

export default function PanelButton({
  text,
  color,
  fSize,
  fWeight,
  hoverColor,
  onClick,
}) {
  return (
    <Button
      color={color}
      fSize={fSize}
      fWeight={fWeight}
      hoverColor={hoverColor}
      onClick={() => onClick()}
      title={text}
    >
      {text}
    </Button>
  );
}

const Button = styled.button({
  background: "none",
  border: "0",
  color: (props) => props.color,
  cursor: "pointer",
  fontSize: (props) => props.fSize,
  fontWeight: (props) => props.fWeight,
  padding: "8px 0 0 5px",
  transition: "color .4s ease",
  ["&:hover"]: {
    color: (props) => props.hoverColor,
  },
});
