import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { contact, sections } from "../data/data.js";

import Button from "./Button";

export default function BottomBar() {
  const history = useHistory();
  return (
    <Wrapper>
      <Container>
        {sections.map((sec) => {
          const { endpoint, name } = sec;
          return (
            <LinkButton key={name} onClick={() => history.push(endpoint)}>
              {name}
            </LinkButton>
          );
        })}
      </Container>
      <Container>
        {contact.map((via) => {
          const { link, SVG, width } = via;
          return (
            <Link key={link} href={link} target="blank">
              <via.SVG width={width} />
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
    borderBottom: "1px solid #777",
  },
});
const Container = styled.section({
  alignItems: "center",
  backgroundColor: "#FFA07A",
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
    color: "#777",
  },
});
const Link = styled.a({});
