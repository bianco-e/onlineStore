import React from "react";
import styled from "styled-components";
import { services } from "../data/data.js";

export default function Services() {
  return (
    <Wrapper>
      {services.map((serv) => {
        return (
          <ServiceCard key={serv.title}>
            <serv.SVG width={65} />
            <Title>{serv.title}</Title>
            <Description>{serv.desc}</Description>
          </ServiceCard>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.section({
  alignItems: "flex-start",
  display: "flex",
  justifyContent: "space-between",
  width: "85%",
});
const ServiceCard = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
});
const Title = styled.h3({
  textAlign: "center",
});
const Description = styled.p({
  textAlign: "center",
});
