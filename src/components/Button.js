import React from "react";
import styled from "styled-components";

export default function SearchAndMenu({ children, fn }) {
  return <Button onClick={() => fn()}>{children}</Button>;
}
const Button = styled.button({
  background: "none",
  border: "0",
  cursor: "pointer",
  fontSize: "25px",
});
