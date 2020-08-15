import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

export default function AdminPanel() {
  const history = useHistory();
  const buttons = [
    { endpoint: "/admin", title: "Inicio" },
    { endpoint: "/admin/", title: "Estadísticas" },
    { endpoint: "/admin/categorias", title: "Categorías" },
    { endpoint: "/admin/productos", title: "Productos" },
  ];

  return (
    <Wrapper>
      <Title>ONLINE STORE</Title>
      {buttons.map(({ endpoint, title }) => {
        return <Button onClick={() => history.push(endpoint)}>{title}</Button>;
      })}
    </Wrapper>
  );
}
const Wrapper = styled.div({
  alignItems: "flex-start",
  boxShadow: "inset -5px 0 20px #FFA07A",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  justifyContent: "flex-start",
  padding: "10px 20px",
  width: "195px",
});
const Title = styled.h2({
  margin: "10px 0",
});
const Button = styled.button({
  background: "none",
  border: "0",
  color: "black",
  cursor: "pointer",
  fontSize: "16px",
  padding: "8px 0",
  transition: "color .4s ease",
  ["&:hover"]: {
    color: "#FFA07A",
  },
});
