import React from "react";
import styled from "styled-components";

export default function FormOption({ text, children }) {
  return (
    <OptionBox>
      <OptionText>{text}</OptionText>
      {children}
    </OptionBox>
  );
}

const OptionBox = styled.section({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  width: "55%",
});
const OptionText = styled.h4({});
