import React, { useContext } from "react";
import styled from "styled-components";

import PageTitle from "../components/PageTitle";
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import StyledButton from "../components/StyledButton";
import StyledInput from "../components/StyledInput";
import WhatsappFloatButton from "../components/WhatsappFloatButton";

import { contactInputs } from "../data/data.js";

import StyleContext from "../context/StyleContext";

export default function Contact() {
  const { style } = useContext(StyleContext);
  const { secondaryColor } = style;

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
          return (
            <StyledInput key={ph} onChangeFn={() => {}} ph={ph} width={"30%"} />
          );
        })}
        <TextArea placeholder="Mensaje" secondary={secondaryColor} />
        <StyledButton onClickFn={confirmForm} title="ENVIAR" />
      </ContactForm>
      <BottomBar />
      <WhatsappFloatButton />
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
const TextArea = styled.textarea({
  backgroundColor: "transparent",
  border: (props) => `1px solid ${props.secondary}`,
  borderRadius: "15px",
  fontFamily: "ubuntu",
  maxHeight: "80px",
  maxWidth: "80%",
  minHeight: "80px",
  minWidth: "80%",
  padding: "5px 12px",
  textAlign: "center",
});
