import React, { useContext, useState } from "react";
import styled from "styled-components";

import PageStructure from "../components/PageStructure";
import LoadingSpinner from "../components/LoadingSpinner";
import StyledButton from "../components/StyledButton";
import StyledInput from "../components/StyledInput";
import StyledTextArea from "../components/StyledTextArea";
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
    <>
      {!style ? (
        <LoadingSpinner />
      ) : (
        <PageStructure title="Contacto">
          <Text>Por consultas, dudas o cambios no dudes en contactarte</Text>
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
                  width={"40%"}
                />
              );
            })}
            <StyledTextArea
              ph="Mensaje"
              val={message.text}
              onChangeFn={(e) =>
                setMessage({ ...message, text: e.target.value })
              }
            />
            {feedbackMsg && <FeedbackMessage type="ok" msg={feedbackMsg} />}
            {errorMsg && <FeedbackMessage type="err" msg={errorMsg} />}
            <StyledButton onClickFn={confirmForm} title="ENVIAR" />
          </ContactForm>
        </PageStructure>
      )}
    </>
  );
}

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
