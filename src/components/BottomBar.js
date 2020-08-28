import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import InstagramSvg from "../components/svg/InstagramSvg";
import EmailSvg from "../components/svg/EmailSvg";
import WhatsappSvg from "../components/svg/WhatsappSvg";
import { sections } from "../data/data.js";

import StyleContext from "../context/StyleContext";

export default function BottomBar() {
  const history = useHistory();
  const { style } = useContext(StyleContext);
  const { instagram, whatsapp, email, primaryColor, secondaryColor } = style;

  const contactData = [
    {
      link: instagram,
      SVG: InstagramSvg,
    },
    {
      link: whatsapp,
      SVG: WhatsappSvg,
    },
    {
      link: email,
      SVG: EmailSvg,
    },
  ];

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
        {style &&
          contactData.map((via) => {
            const { link, SVG } = via;
            return (
              <Link key={link} href={link} target="blank">
                <SVG />
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
