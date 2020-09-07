import React from "react";
import styled from "styled-components";

export default function FeedbackMessage({ msg, type, width }) {
  const options = {
    ok: {
      c: "darkgreen",
      bg: "lightgreen",
    },
    err: {
      c: "pink",
      bg: "red",
    },
  };

  return (
    <Span colors={options[type]} width={width ? width : undefined}>
      {msg}
    </Span>
  );
}

const Span = styled.span({
  backgroundColor: (props) => props.colors.bg,
  borderRadius: "10px",
  color: (props) => props.colors.c,
  fontSize: "14px",
  marginBottom: "10px",
  padding: "10px 16px",
  textAlign: "center",
  width: (props) => props.width,
});
