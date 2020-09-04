import React from "react";
import styled from "styled-components";

import IconButton from "./IconButton";

export default function Messages({ deleteMessage, msgs }) {
  return (
    <Wrapper>
      {msgs.map(({ id, nombre, celular, email, text }) => {
        return (
          <Wrapper key={id}>
            <Container>
              <IconButton onClickFn={() => deleteMessage(id)} />
              <Text fWeight="bold">{nombre}</Text>
              <Text fSize="13px">{email && `Email: ${email}`}</Text>
              <Text fSize="13px">{celular && `Celular: ${celular}`}</Text>
            </Container>
            <Text fSize="11px">{text}</Text>
          </Wrapper>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  width: "80%",
});
const Container = styled.div({
  alignItems: "center",
  border: "1px solid #EEE",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-evenly",
  marginTop: "20px",
  position: "relative",
  width: "90%",
});
const Text = styled.p({
  fontSize: (props) => props.fSize || "15px",
  fontWeight: (props) => props.fWeight,
});
