import React from "react";
import styled from "styled-components";

export default function CloseButton({ onClickFn, size, corner }) {
  return (
    <>
      {corner === "left" ? (
        <Button left="20px" onClick={() => onClickFn()} size={size}>
          ✗
        </Button>
      ) : (
        <Button right="20px" onClick={() => onClickFn()} size={size}>
          ✗
        </Button>
      )}
    </>
  );
}

const Button = styled.button({
  background: "none",
  border: "0",
  color: "#000",
  cursor: "pointer",
  fontSize: (props) => props.size || "22px",
  position: "absolute",
  left: (props) => props.left,
  right: (props) => props.right,
  top: "20px",
  transition: "color .4s ease",
  ["&:hover"]: {
    color: "#777",
  },
});
