import React from "react";
import styled from "styled-components";

export default function FormOption({ text, children, minHeight }) {
  return (
    <OptionBox minHeight={minHeight}>
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
  width: "55%",
});
const Text = styled.h4({
  fontSize: "14px",
});
