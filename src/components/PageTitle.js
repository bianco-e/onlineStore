import React from "react";
import styled from "styled-components";

export default function PageTitle({ text }) {
  return <Title>{text}</Title>;
}

const Title = styled.h1({
  fontSize: "60px",
  margin: "145px 0 55px 0",
  textAlign: "center",
});
