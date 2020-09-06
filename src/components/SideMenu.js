import React from "react";
import styled from "styled-components";
import { sections } from "../data/data.js";
import { useHistory } from "react-router-dom";

export default function SideMenu() {
  const history = useHistory();
  return (
    <>
      {sections.map((section, i) => {
        const { endpoint, name } = section;
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
    </>
  );
}

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
