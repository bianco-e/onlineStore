import React, { useState } from "react";
import styled from "styled-components";
import StyledInput from "../components/StyledInput";
import StyledButton from "../components/StyledButton";
import firebase from "../firebase/client.js";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
    const accounts = firebase
      .login(user, password)
      .then((res) =>
        res
          ? history.push("/admin")
          : setErrorMsg("Los datos ingresados son incorrectos")
      )
      .catch((err) => console.error(err));
    setPassword("");
    setUser("");
  };

  return (
    <Wrapper>
      <Container>
        <Title>Iniciar sesión</Title>
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
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
        <StyledButton onClickFn={() => handleLogin()} title="INICIAR SESIÓN" />
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
const ErrorMessage = styled.span({
  backgroundColor: "pink",
  borderRadius: "10px",
  color: "red",
  fontSize: "14px",
  padding: "10px 16px",
});
const Title = styled.h1({
  margin: "0",
});
