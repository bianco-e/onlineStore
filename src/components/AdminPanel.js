import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import PanelButton from "./PanelButton";

import { getRGBAFromHex } from "../utils/utils.js";
import { buttons } from "../data/data.js";
import StyleContext from "../context/StyleContext";

export default function AdminPanel({ buttonsHoverColor }) {
  const history = useHistory();
  const { storeName, storeLogo, primaryColor, secondaryColor } = useContext(
    StyleContext
  ).style;
  const [titleBold, setTitleBold] = useState("");

  useEffect(() => {
    setTitleBold(window.location.pathname);
  }, []);

  const renderPanelButtons = (arr) => {
    return arr.map(({ endpoint, Logo, title }) => {
      if (endpoint) {
        return (
          <PanelButton
            color={
              titleBold == endpoint
                ? buttonsHoverColor || primaryColor
                : "black"
            }
            fSize="16px"
            fWeight={titleBold == endpoint ? "bold" : "regular"}
            key={title}
            onClick={() => history.push(endpoint)}
            hoverColor={buttonsHoverColor || primaryColor}
            text={title}
          />
        );
      } else
        return (
          <PanelTitle key={title} secondary={secondaryColor}>
            <Logo />
            {title}
          </PanelTitle>
        );
    });
  };

  return (
    <Wrapper bg={primaryColor && getRGBAFromHex(primaryColor)}>
      <Container>
        <Image src={storeLogo} />
        <StoreName>{storeName}</StoreName>
      </Container>
      {renderPanelButtons(buttons)}
    </Wrapper>
  );
}
const Wrapper = styled.div({
  backgroundColor: (props) => props.bg,
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  justifyContent: "flex-start",
  padding: "70px 20px",
  position: "fixed",
  left: "0",
  top: "0",
  width: "135px",
});
const Container = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-start",
  marginBottom: "25px",
  width: "135px",
});
const StoreName = styled.h3({
  fontSize: "19px",
  margin: "0 0 0 3px",
});
const PanelTitle = styled.div({
  alignItems: "center",
  color: (props) => props.secondary,
  display: "flex",
  fontWeight: "800",
});
const Image = styled.img({
  height: "25px",
  width: "25px",
});
