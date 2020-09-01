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

  const { login } = useContext(AdminContext);

  const cleanInputs = () => {
    setPassword("");
    setEmail("");
  };

  const handleLogin = () => {
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

  const inputsData = [
    {
      ph: "Usuario",
      fn: (e) => setEmail(e.target.value),
      okd: false,
      val: email,
      type: "text",
    },
    {
      ph: "Contraseña",
      fn: (e) => setPassword(e.target.value),
      okd: handleLogin,
      val: password,
      type: "password",
    },
  ];

  return (
    <Wrapper>
      {!login ? (
        "spinner"
      ) : (
        <Container>
          <Title>Iniciar sesión</Title>
          {errorMsg && <FeedbackMessage msg={errorMsg} type="err" />}
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
          <ButtonsGroup>
            <StyledButton
              onClickFn={() => handleLogin()}
              title="INICIAR SESIÓN"
            />
            <StyledButton
              onClickFn={() => history.push("/signup")}
              title="CREAR CUENTA"
            />
          </ButtonsGroup>
        </Container>
      )}
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
const ButtonsGroup = styled.div({
  display: "flex",
  justifyContent: "space-evenly",
  width: "40%",
});
const Title = styled.h1({
  margin: "0",
});
