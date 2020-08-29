import React, { useEffect, useState } from "react";
import styled from "styled-components";

import StyledButton from "./StyledButton";
import Messages from "./Messages";

import firebase from "../firebase/client.js";

export default function AdminClients() {
  const [messages, setMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    firebase
      .getDocsFromCollection("messages")
      .then((msgs) => setMessages(msgs));
  }, []);

  return (
    <Container>
      <Title>Clientes</Title>
      <StyledButton
        title="Ver mensajes"
        onClickFn={() => setShowMessages(!showMessages)}
      />
      {showMessages &&
        (!messages.length ? (
          <Text>No hay mensajes</Text>
        ) : (
          <Messages msgs={messages} />
        ))}
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
const Text = styled.p({});
