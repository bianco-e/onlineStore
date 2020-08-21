import React from "react";
import styled from "styled-components";

export default function AdminClients() {
  return (
    <Container>
      <Title>Clientes</Title>
    </Container>
  );
}

const Container = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  marginTop: "50px",
  minHeight: "100vh",
  width: "80%",
});
const Title = styled.h2({});
