import React, { useState } from "react";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import StyledInput from "../components/StyledInput";
import StyledButton from "../components/StyledButton";
import firebase from "../firebase/client.js";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

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
    setPassword("");
    setUser("");
  };

  return (
    <Wrapper>
      <Container>
        <PageTitle text="my onlinestore" />
        {inputsData.map((data) => {
          const { fn, ph, type, val } = data;
          return (
            <StyledInput
              key={ph}
              onChangeFn={fn}
              ph={ph}
              val={val}
              type={type}
              width="200px"
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
  height: "70%",
  justifyContent: "space-between",
  width: "90%",
});
