import React, { Fragment } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Media from "react-media";

export default function ProductBanner({ name, ga, img, endpoint }) {
  const history = useHistory();
  return (
    <WrapperButton
      bgImg={`url(${img})`}
      ga={ga}
      onClick={() => history.push(`/categoria/${endpoint}`)}
    >
      <Media
        queries={{
          small: "(max-width: 550px)",
          medium: "(min-width: 551px) and (max-width: 780px)",
        }}
      >
        {({ small, medium }) => (
          <Fragment>
            <ButtonTitle>
              <Span fSize={small ? "17px" : medium ? "22px" : "32px"}>
                {name}
              </Span>
            </ButtonTitle>
          </Fragment>
        )}
      </Media>
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
  transition: "all .8s ease",
  ["&:hover"]: {
    transform: "scale(1.03)",
    opacity: ".7",
  },
});
const ButtonTitle = styled.div({
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});
const Span = styled.span({
  color: "rgba(255, 255, 255, .8)",
  fontSize: (props) => props.fSize,
  fontWeight: "bold",
  margin: "0",
  textAlign: "center",
});
