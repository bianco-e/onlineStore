import React from "react";
import styled from "styled-components";
import DeleteSvg from "./svg/DeleteSvg";

export default function DeleteButton({ onClickFn }) {
  return (
    <Button onClick={() => onClickFn()}>
      <DeleteSvg width={18} />
    </Button>
  );
}

const Button = styled.button({
  background: "none",
  border: "0",
  cursor: "pointer",
  position: "absolute",
  right: "1px",
  top: "3px",
});
