import React, { useContext, useState } from "react";
import styled from "styled-components";

import PageTitle from "../components/PageTitle";
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import StyledButton from "../components/StyledButton";
import StyledInput from "../components/StyledInput";
import StyledTextArea from "../components/StyledTextArea";
import WhatsappFloatButton from "../components/WhatsappFloatButton";
import LoadingSpinner from "../components/LoadingSpinner";
import FeedbackMessage from "../components/FeedbackMessage";

import { contactInputs } from "../data/data.js";

import StyleContext from "../context/StyleContext";
import firebase from "../firebase/client.js";

export default function Contact() {
  const [message, setMessage] = useState({});
  const [feedbackMsg, setFeedbackMsg] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState(undefined);

  const { style } = useContext(StyleContext);

  const confirmForm = () => {
    setFeedbackMsg(undefined);
    setErrorMsg(undefined);
    if (message.nombre && (message.email || message.celular) && message.text) {
      firebase.addNewDoc(false, "messages", message);
      setMessage({});
      setFeedbackMsg("Gracias por contactarnos.");
    } else setErrorMsg("Algunos campos están incompletos.");
  };

  return (
    <Wrapper>
      <TopBar />
      {!style ? (
        <LoadingSpinner />
      ) : (
        <>
          {" "}
          <Container>
            <PageTitle text="Contacto" />
            <Text>Por consultas, dudas o cambios no dudes en contactarte</Text>
          </Container>
          <ContactForm>
            {contactInputs.map((ph) => {
              return (
                <StyledInput
                  key={ph}
                  onChangeFn={(e) =>
                    setMessage({
                      ...message,
                      [ph.toLowerCase()]: e.target.value,
                    })
                  }
                  val={message[ph.toLowerCase()]}
                  ph={ph}
                  width={"30%"}
                />
              );
            })}
            <StyledTextArea
              ph="Mensaje"
              val={message.text}
              onChange={(e) => setMessage({ ...message, text: e.target.value })}
            />
            {feedbackMsg && <FeedbackMessage type="ok" msg={feedbackMsg} />}
            {errorMsg && <FeedbackMessage type="err" msg={errorMsg} />}
            <StyledButton onClickFn={confirmForm} title="ENVIAR" />
          </ContactForm>
          <BottomBar />
        </>
      )}

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
