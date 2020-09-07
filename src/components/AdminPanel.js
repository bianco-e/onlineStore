import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import PanelButton from "./PanelButton";

import { getRGBAFromHex } from "../utils/utils.js";
import { buttons } from "../data/data.js";
import StyleContext from "../context/StyleContext";

export default function AdminPanel({ direction }) {
  const history = useHistory();
  const { storeName, storeLogo, primaryColor, secondaryColor } = useContext(
    StyleContext
  ).style;
  const [titleBold, setTitleBold] = useState("");

  const settings = {
    column: {
      fSize: "16px",
      height: "100vh",
      logoWidth: "140px",
      nameSize: "20px",
      padding: "70px 20px",
      width: "140px",
    },
    row: {
      fSize: "10px",
      height: "100%",
      logoWidth: "80px",
      nameSize: "11px",
      padding: "0",
      width: "100%",
    },
  };

  useEffect(() => {
    setTitleBold(window.location.pathname);
  }, []);

  const renderPanelButtons = (arr) => {
    return arr.map(({ endpoint, Logo, title }) => {
      if (endpoint) {
        return (
          <PanelButton
            color={titleBold == endpoint ? primaryColor : "black"}
            fSize={settings[direction].fSize}
            fWeight={titleBold == endpoint ? "bold" : "regular"}
            key={title}
            onClick={() => history.push(endpoint)}
            hoverColor={primaryColor}
            text={title}
          />
        );
      } else {
        if (direction == "column") {
          return (
            <PanelTitle key={title} secondary={secondaryColor}>
              <Logo />
              {title}
            </PanelTitle>
          );
        }
      }
    });
  };

  return (
    <Wrapper
      bg={primaryColor && getRGBAFromHex(primaryColor)}
      flexDir={direction}
      height={settings[direction].height}
      padding={settings[direction].padding}
      width={settings[direction].width}
    >
      <Container minWidth={settings[direction].logoWidth}>
        <Image src={storeLogo} />
        <StoreName fSize={settings[direction].nameSize}>{storeName}</StoreName>
      </Container>
      {renderPanelButtons(buttons)}
    </Wrapper>
  );
}
const Wrapper = styled.div({
  backgroundColor: (props) => props.bg,
  alignItems: "flex-start",
  display: "flex",
  flexDirection: (props) => props.flexDir,
  height: (props) => props.height,
  justifyContent: "flex-start",
  padding: (props) => props.padding,
  position: "fixed",
  left: "0",
  top: "0",
  width: (props) => props.width || "140px",
});
const Container = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-start",
  marginBottom: "25px",
  minWidth: (props) => props.minWidth,
});
const StoreName = styled.h3({
  fontSize: (props) => props.fSize,
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
