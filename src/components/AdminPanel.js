import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { buttons } from "../data/data.js";
import StyleContext from "../context/StyleContext";

export default function AdminPanel() {
  const history = useHistory();
  const { style } = useContext(StyleContext);
  const { storeName, primaryColor, secondaryColor } = style;

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
    <Wrapper primary={primaryColor}>
      <Title>{storeName}</Title>
      {renderPanelSections(buttons)}
    </Wrapper>
  );
}
const Wrapper = styled.div({
  alignItems: "flex-start",
  boxShadow: (props) => `inset -5px 0 20px ${props.primary}`,
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  justifyContent: "flex-start",
  padding: "10px 20px",
  width: "195px",
});
const Title = styled.h3({
  margin: "50px 0 14px 0",
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
  color: "black",
  cursor: "pointer",
  fontSize: "16px",
  padding: "8px 0 0 25px",
  transition: "color .4s ease",
  ["&:hover"]: {
    color: (props) => props.primary,
  },
});
