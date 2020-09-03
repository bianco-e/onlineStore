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
    <>
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
    </>
  );
}

const Title = styled.h2({});
const Text = styled.p({});
