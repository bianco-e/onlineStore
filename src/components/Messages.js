import React from "react";
import styled from "styled-components";

export default function Messages({ msgs }) {
  return (
    <Wrapper>
      {msgs.map(({ nombre, celular, email, text }) => {
        return (
          <Wrapper>
            <Container>
              <Text fWeight="bold">{nombre}</Text>
              <Text>{email && `Email: ${email}`}</Text>
              <Text>{celular && `Celular: ${celular}`}</Text>
            </Container>
            <Text fSize="13px">{text}</Text>
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
  border: "1px solid #EEE",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-evenly",
  marginTop: "20px",
  width: "90%",
});
const Text = styled.p({
  fontSize: (props) => props.fSize || "15px",
  fontWeight: (props) => props.fWeight,
});
