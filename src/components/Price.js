import React from "react";
import styled from "styled-components";

export default function Price({ color, price }) {
  return <Span color={color}>{`$${price.toFixed(2)}`}</Span>;
}

const Span = styled.span({
  backgroundColor: "rgba(240, 240, 240, .6)",
  borderRadius: "10px",
  color: (props) => props.color,
  fontSize: "14px",
  margin: "10px 0",
  padding: "5px 15px",
});
