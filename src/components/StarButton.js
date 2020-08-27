import React, { useState } from "react";
import styled from "styled-components";
import StarSvg from "./svg/StarSvg";

export default function StarButton({ onClickFn }) {
  const [starColor, setStarColor] = useState("#DDD");

  const handleClick = () => {
    onClickFn();
    setStarColor(starColor == "yellow" ? "#DDD" : "yellow");
  };

  return (
    <Button onClick={() => handleClick()}>
      <StarSvg fill={starColor} />
    </Button>
  );
}

const Button = styled.button({
  background: "none",
  border: "0",
  cursor: "pointer",
  position: "absolute",
  right: "51px",
  top: "3px",
});
