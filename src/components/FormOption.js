import React from "react";
import styled from "styled-components";

export default function FormOption({ text, children, minHeight, width }) {
  return (
    <OptionBox minHeight={minHeight} width={width || "65%"}>
      <Text>{text}</Text>
      {children}
    </OptionBox>
  );
}

const OptionBox = styled.section({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  minHeight: (props) => props.minHeight,
  width: (props) => props.width,
});
const Text = styled.h4({
  fontSize: "14px",
});
