import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StarSvg from "./svg/StarSvg";

export default function StarButton({ button, color, onClickFn }) {
  const [starColor, setStarColor] = useState("#DDD");

  useEffect(() => {
    color ? setStarColor("#ffcd42") : setStarColor("#DDD");
  }, [color]);

  const handleClick = () => {
    onClickFn();
    setStarColor(starColor == "#ffcd42" ? "#DDD" : "#ffcd42");
  };

  return (
    <>
      {button ? (
        <Button onClick={() => handleClick()}>
          <StarSvg fill={starColor} />
        </Button>
      ) : (
        <StarSvg fill={starColor} />
      )}
    </>
  );
}

const Button = styled.button({
  background: "none",
  border: "0",
  cursor: "pointer",
});
