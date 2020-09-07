import React, { useContext, useState } from "react";
import styled from "styled-components";

import PageStructure from "../components/PageStructure";
import LoadingSpinner from "../components/LoadingSpinner";
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

  const buttonsData = [
    {
      fn: handleLogin,
      title: "Iniciar sesión",
    },
    {
      fn: () => history.push("/signup"),
      title: "Crear cuenta",
    },
  ];

  return (
    <>
      {!login ? (
        <LoadingSpinner />
      ) : (
        <PageStructure title="Iniciar sesión">
          <Container>
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
              {errorMsg && (
                <FeedbackMessage msg={errorMsg} type="err" width="230px" />
              )}
              {buttonsData.map(({ fn, title }) => {
                return (
                  <StyledButton
                    onClickFn={() => fn()}
                    title={title}
                    width="150px"
                  />
                );
              })}
            </ButtonsGroup>
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
  justifyContent: "space-evenly",
  height: "270px",
  width: "90%",
});
const ButtonsGroup = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  minHeight: "110px",
  justifyContent: "space-between",
  width: "40%",
});
const Title = styled.h1({
  margin: "0",
});
