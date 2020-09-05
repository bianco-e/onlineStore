import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { getRGBAFromHex } from "../utils/utils.js";
import { buttons } from "../data/data.js";
import StyleContext from "../context/StyleContext";

export default function AdminPanel() {
  const history = useHistory();
  const { style } = useContext(StyleContext);
  const { storeName, storeLogo, primaryColor, secondaryColor } = style;
  const [titleBold, setTitleBold] = useState("");

  useEffect(() => {
    setTitleBold(window.location.pathname);
  }, []);

  const renderPanelSections = (arr) => {
    return arr.map(({ endpoint, Logo, title }) => {
      if (!endpoint) {
        return (
          <PanelTitle key={title} secondary={secondaryColor}>
            <Logo width={25} height={70} />
            {title}
          </PanelTitle>
        );
      }
      return (
        <Button
          color={titleBold == endpoint ? primaryColor : "black"}
          fWeight={titleBold == endpoint ? "bold" : "regular"}
          key={title}
          onClick={() => history.push(endpoint)}
          primary={primaryColor}
        >
          {title}
        </Button>
      );
    });
  };

  return (
    <Wrapper bg={primaryColor && getRGBAFromHex(primaryColor)}>
      <Container>
        <Image src={storeLogo} />
        <Title>{storeName}</Title>
      </Container>
      {renderPanelSections(buttons)}
    </Wrapper>
  );
}
const Wrapper = styled.div({
  backgroundColor: (props) => props.bg,
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  justifyContent: "flex-start",
  padding: "10px 20px",
  position: "fixed",
  left: "0",
  top: "0",
  width: "160px",
});
const Container = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-start",
  margin: "60px 0 25px 0",
  width: "100%",
});
const Title = styled.h3({
  margin: "0 0 0 3px",
});
const PanelTitle = styled.div({
  alignItems: "center",
  color: (props) => props.secondary,
  display: "flex",
  fontWeight: "800",
});
const Button = styled.button({
  background: "none",
  border: "0",
  color: (props) => props.color,
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: (props) => props.fWeight,
  padding: "8px 0 0 25px",
  transition: "color .4s ease",
  ["&:hover"]: {
    color: (props) => props.primary,
  },
});
const Image = styled.img({
  height: "25px",
  width: "25px",
});
