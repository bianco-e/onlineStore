import React from "react";
import styled from "styled-components";

export default function StyledInput({ ph, val, onChangeFn, type, width }) {
  return (
    <Input
      placeholder={ph}
      value={val}
      onChange={(e) => onChangeFn(e)}
      type={type || "text"}
      width={width}
    />
  );
}

const Input = styled.input({
  backgroundColor: "transparent",
  border: "1px solid #777",
  borderRadius: "9999px",
  padding: "8px 12px",
  width: (props) => props.width,
});
