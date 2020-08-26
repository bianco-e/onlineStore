import React, { useEffect } from "react";
import styled from "styled-components";
import { sections } from "../data/data.js";
import { useHistory } from "react-router-dom";
import CloseButton from "./CloseButton";

export default function SideMenuModal({ showModal, setShowModal }) {
  useEffect(() => {
    showModal && document.addEventListener("click", handleModal);
    return () => {
      document.removeEventListener("click", handleModal);
    };
  }, [showModal]);

  const handleModal = () => setShowModal(!showModal);
  const history = useHistory();
  return (
    <Wrapper>
      <CloseButton onClickFn={() => setShowModal(!showModal)} corner="right" />
      {sections.map((sec, i) => {
        const { endpoint, name } = sec;
        return (
          <LinkButton
            borTop={i < 1 && "1px solid #000"}
            key={name}
            onClick={() => history.push(endpoint)}
          >
            {name}
          </LinkButton>
        );
      })}
      <LoginButton onClick={() => history.push("/login")}>
        Iniciar sesión
      </LoginButton>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  backgroundColor: "#FFA07A",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  justifyContent: "center",
  left: "0",
  padding: "20px",
  position: "fixed",
  top: "0",
  width: "335px",
  zIndex: "100",
});
const LinkButton = styled.button({
  background: "none",
  border: "0",
  borderBottom: "1px solid #000",
  borderTop: (props) => props.borTop,
  color: "black",
  cursor: "pointer",
  fontSize: "17px",
  padding: "20px 0",
  transition: "color .4s ease",
  width: "100%",
  ["&:hover"]: {
    color: "#777",
  },
});
const LoginButton = styled.button({
  background: "none",
  border: "0",
  color: "#777",
  cursor: "pointer",
  fontSize: "17px",
  padding: "30px 0",
  transition: "color .4s ease",
  width: "100%",
  ["&:hover"]: {
    color: "#000",
  },
});
