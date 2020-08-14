import React from "react";
import styled from "styled-components";

export default function StyledButton({ onClickFn, title }) {
  return <Button onClick={() => onClickFn()}>{title}</Button>;
}

const Button = styled.button({
  border: "1px solid #FFA07A",
  borderRadius: "9999px",
  backgroundColor: "#FFA07A",
  color: "white",
  cursor: "pointer",
  fontSize: "12px",
  padding: "8px 20px",
  transition: "background-color .6s ease",
  transition: "all .6s ease",
  ["&:hover"]: {
    backgroundColor: "rgba(250, 250, 250, .7)",
    border: "1px solid #FFA07A",
    color: "#FFA07A",
  },
});
