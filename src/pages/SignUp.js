import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import PageStructure from "../components/PageStructure";
import LoadingSpinner from "../components/LoadingSpinner";
import StyledInput from "../components/StyledInput";
import StyledButton from "../components/StyledButton";
import FeedbackMessage from "../components/FeedbackMessage";

import AdminContext from "../context/AdminContext";
import firebase from "../firebase/client.js";

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(undefined);
  const [feedbackMsg, setFeedbackMsg] = useState(undefined);
  const [createdAccount, setCreatedAccount] = useState(undefined);

  const { login } = useContext(AdminContext);

  const inputsData = [
    {
      ph: "E-mail",
      fn: (e) => setEmail(e.target.value),
      okd: false,
      val: email,
      type: "text",
    },
    {
      ph: "Contraseña",
      fn: (e) => setPassword(e.target.value),
      okd: false,
      val: password,
      type: "password",
    },
  ];

  const cleanInputs = () => {
    setPassword("");
    setEmail("");
  };

  const handleLogin = () => {
    const { email, password } = createdAccount;
    firebase
      .login(email, password)
      .then((res) => {
        if (typeof res == "object") {
          login(res);
          history.push("/admin");
        } else setErrorMsg("Los datos ingresados no son válidos");
      })
      .catch((err) => console.log(err));
    cleanInputs();
  };

  const handleCreateAccount = () => {
    setErrorMsg(undefined);
    setFeedbackMsg(undefined);
    if (email && password) {
      firebase
        .signUp(email, password)
        .then(() => {
          setFeedbackMsg("Cuenta creada exitosamente");
          setCreatedAccount({ email, password });
          setEmail("");
          setPassword("");
        })
        .catch((err) => setErrorMsg(err));
    } else setErrorMsg("Todos los campos deben estar completos");
  };

  return (
    <>
      {!login ? (
        <LoadingSpinner />
      ) : (
        <PageStructure title="Registrarse">
          <Container>
            {createdAccount ? (
              <StyledButton
                onClickFn={() => handleLogin()}
                title="Iniciar sesión"
              />
            ) : (
              <>
                {inputsData.map((data) => {
                  const { fn, okd, ph, type, val } = data;
                  return (
                    <StyledInput
                      OKD={okd}
                      key={ph}
                      onChangeFn={fn}
                      ph={ph}
                      val={val}
                      type={type}
                      width="185px"
                    />
                  );
                })}
                <FeedbackContainer>
                  {errorMsg && <FeedbackMessage msg={errorMsg} type="err" />}
                  {feedbackMsg && (
                    <FeedbackMessage msg={feedbackMsg} type="ok" />
                  )}
                </FeedbackContainer>
                <StyledButton
                  onClickFn={() => handleCreateAccount()}
                  title="Registrarse"
                />
              </>
            )}
          </Container>
        </PageStructure>
      )}
    </>
  );
}

const Container = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  marginBottom: "80px",
  minHeight: "260px",
  width: "90%",
});
const FeedbackContainer = styled.div({
  display: "grid",
  placeItems: "center",
  height: "35px",
  width: "100%",
});
