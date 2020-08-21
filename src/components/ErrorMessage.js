import React from "react";
import styled from "styled-components";

export default function ErrorMessage({ msg }) {
  return <Span>{msg}</Span>;
}

const Span = styled.span({
  backgroundColor: "pink",
  borderRadius: "10px",
  color: "red",
  fontSize: "14px",
  marginBottom: "10px",
  padding: "10px 16px",
});
