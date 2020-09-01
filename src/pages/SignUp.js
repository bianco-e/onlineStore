import React, { useContext, useState } from "react";
import styled from "styled-components";
import StyledInput from "../components/StyledInput";
import StyledButton from "../components/StyledButton";
import FeedbackMessage from "../components/FeedbackMessage";

import firebase from "../firebase/client.js";
import { useHistory } from "react-router-dom";
import AdminContext from "../context/AdminContext";

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");
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
    firebase
      .signUp(email, password)
      .then(() => {
        setFeedbackMsg("Cuenta creada exitosamente");
        setCreatedAccount({ email, password });
        setEmail("");
        setPassword("");
      })
      .catch((err) => setErrorMsg(err));
  };

  return (
    <Wrapper>
      <Container>
        <Title>Crear cuenta</Title>
        {errorMsg && <FeedbackMessage msg={errorMsg} type="err" />}
        {feedbackMsg && <FeedbackMessage msg={feedbackMsg} type="ok" />}
        {createdAccount ? (
          <StyledButton onClickFn={() => handleLogin()} title="INGRESAR" />
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
            <StyledButton
              onClickFn={() => handleCreateAccount()}
              title="CONFIRMAR"
            />
          </>
        )}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  display: "grid",
  height: "100vh",
  placeItems: "center",
});
const Container = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  height: "70vh",
  justifyContent: "space-between",
  width: "90%",
});
const Title = styled.h1({
  margin: "0",
});
