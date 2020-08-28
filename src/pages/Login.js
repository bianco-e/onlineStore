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
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useContext(AdminContext);

  const inputsData = [
    {
      ph: "Usuario",
      fn: (e) => setUser(e.target.value),
      val: user,
      type: "text",
    },
    {
      ph: "Contraseña",
      fn: (e) => setPassword(e.target.value),
      val: password,
      type: "password",
    },
  ];

  const handleLogin = () => {
    firebase
      .login(user, password, login)
      .then((res) => {
        if (res) {
          history.push("/admin");
        } else setErrorMsg("Los datos ingresados son incorrectos");
      })
      .catch((err) => console.error(err));
    setPassword("");
    setUser("");
  };

  return (
    <Wrapper>
      {!login ? (
        "spinner"
      ) : (
        <Container>
          <Title>Iniciar sesión</Title>
          {errorMsg && <FeedbackMessage msg={errorMsg} type="err" />}
          {inputsData.map((data) => {
            const { fn, ph, type, val } = data;
            return (
              <StyledInput
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
            onClickFn={() => handleLogin()}
            title="INICIAR SESIÓN"
          />
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
const Title = styled.h1({
  margin: "0",
});
