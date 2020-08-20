import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import BrushSvg from "./svg/BrushSvg";
import WrenchSvg from "./svg/WrenchSvg";

export default function AdminPanel() {
  const history = useHistory();
  const buttons = [
    { endpoint: "/admin", title: "Inicio" },
    { endpoint: "/admin/estadisticas", title: "Estadísticas" },
    { endpoint: undefined, Logo: WrenchSvg, title: "Administrar" },
    { endpoint: "/admin/categorias", title: "Categorías" },
    { endpoint: "/admin/productos", title: "Productos" },
    { endpoint: "/admin/clientes", title: "Clientes" },
    { endpoint: "/admin/ventas", title: "Ventas" },
    { endpoint: undefined, Logo: BrushSvg, title: "Personalizar" },
    { endpoint: "/admin/diseño", title: "Diseño" },
  ];

  const renderPanelSections = (arr) => {
    return arr.map(({ endpoint, Logo, title }) => {
      if (!endpoint) {
        return (
          <PanelTitle key={title}>
            <Logo width={25} height={70} />
            {title}
          </PanelTitle>
        );
      }
      return (
        <Button key={title} onClick={() => history.push(endpoint)}>
          {title}
        </Button>
      );
    });
  };

  return (
    <Wrapper>
      <Title>ONLINE STORE</Title>
      {renderPanelSections(buttons)}
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
const Title = styled.h3({
  margin: "64px 0 14px 0",
});
const PanelTitle = styled.div({
  alignItems: "center",
  color: "#777",
  display: "flex",
  fontWeight: "800",
});
const Button = styled.button({
  background: "none",
  border: "0",
  color: "black",
  cursor: "pointer",
  fontSize: "16px",
  padding: "8px 0 0 25px",
  transition: "color .4s ease",
  ["&:hover"]: {
    color: "#FFA07A",
  },
});
