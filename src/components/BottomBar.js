import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { contact, sections } from "../data/data.js";

import StyleContext from "../context/StyleContext";

export default function BottomBar() {
  const history = useHistory();
  const { style } = useContext(StyleContext);
  const { storeName, storeLogo, primaryColor, secondaryColor } = style;
  return (
    <Wrapper secondary={secondaryColor}>
      <Container primary={primaryColor}>
        {sections.map((sec) => {
          const { endpoint, name } = sec;
          return (
            <LinkButton
              key={name}
              onClick={() => history.push(endpoint)}
              secondary={secondaryColor}
            >
              {name}
            </LinkButton>
          );
        })}
      </Container>
      <Container primary={primaryColor}>
        {contact.map((via) => {
          const { link, SVG, width } = via;
          return (
            <Link key={link} href={link} target="blank">
              <SVG width={width} />
            </Link>
          );
        })}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  bottom: "0",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  width: "100%",
  ["&:first-child"]: {
    borderBottom: (props) => `1px solid ${props.secondary}`,
  },
});
const Container = styled.section({
  alignItems: "center",
  backgroundColor: (props) => props.primary,
  display: "flex",
  justifyContent: "space-around",
  padding: "10px 0",
  width: "100%",
});
const LinkButton = styled.button({
  background: "none",
  border: "0",
  color: "black",
  cursor: "pointer",
  transition: "color .4s ease",
  ["&:hover"]: {
    color: (props) => props.secondary,
  },
});
const Link = styled.a({});
