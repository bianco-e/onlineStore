import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
export default function ProductBanner({ name, ga, img, endpoint }) {
  const history = useHistory();
  return (
    <WrapperButton
      bgImg={`url(${img})`}
      ga={ga}
      onClick={() => history.push(endpoint)}
    >
      <ButtonTitle>{name}</ButtonTitle>
    </WrapperButton>
  );
}

const WrapperButton = styled.button({
  backgroundImage: (props) => props.bgImg,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  border: "none",
  cursor: "pointer",
  gridArea: (props) => props.ga,
  padding: "10px",
  transition: "all .8s ease",
  ["&:hover"]: {
    transform: "scale(1.03)",
    opacity: ".8",
  },
});
const ButtonTitle = styled.h1({
  color: "rgba(255, 255, 255, .8)",
  textAlign: "center",
});
