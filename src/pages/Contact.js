import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import { saleProducts } from "../data/data.js";

export default function Contact() {
  const contactInputs = ["Nombre", "Email", "Teléfono"];

  const confirmForm = () => {};

  return (
    <Wrapper>
      <TopBar />
      <Container>
        <PageTitle text="Contacto" />
        <Text>Por consultas, dudas o cambios no dudes en contactarte</Text>
      </Container>
      <ContactForm>
        {contactInputs.map((ph) => {
          return <Input key={ph} placeholder={ph} />;
        })}
        <TextArea placeholder="Mensaje" />
        <SendButton onClick={() => confirmForm()}>ENVIAR</SendButton>
      </ContactForm>
      <BottomBar />
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  width: "100%",
});
const Container = styled.section({
  marginTop: "150px",
  position: "relative",
  width: "90%",
});
const ContactForm = styled.section({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  height: "300px",
  justifyContent: "space-between",
  marginBottom: "120px",
  padding: "20px 0",
  width: "90%",
});
const Text = styled.p({
  textAlign: "center",
});
const SendButton = styled.button({
  border: "1px solid #FFA07A",
  borderRadius: "9999px",
  backgroundColor: "#FFA07A",
  color: "white",
  cursor: "pointer",
  fontSize: "12px",
  padding: "8px 20px",
  transition: "background-color .6s ease",
  transition: "all .6s ease",
  ["&:hover"]: {
    backgroundColor: "rgba(250, 250, 250, .7)",
    border: "1px solid #FFA07A",
    color: "#FFA07A",
  },
});
const Input = styled.input({
  backgroundColor: "transparent",
  border: "1px solid #777",
  borderRadius: "9999px",
  padding: "8px 12px",
  width: "80%",
});
const TextArea = styled.textarea({
  backgroundColor: "transparent",
  border: "1px solid #777",
  borderRadius: "15px",
  fontFamily: "ubuntu",
  maxHeight: "80px",
  maxWidth: "80%",
  minHeight: "80px",
  minWidth: "80%",
  padding: "5px 12px",
});
