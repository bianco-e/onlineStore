import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import StyleContext from "../context/StyleContext";
import AdminContext from "../context/AdminContext";

export default function AdminTopBar() {
  const history = useHistory();
  const { style } = useContext(StyleContext);
  const { primaryColor, secondaryColor } = style;
  const { logout } = useContext(AdminContext);

  return (
    <Wrapper primary={primaryColor}>
      <Button
        onClick={() => {
          history.push("/");
          logout();
        }}
        secondary={secondaryColor}
      >
        Cerrar sesión
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  backgroundColor: (props) => props.primary,
  display: "flex",
  justifyContent: "flex-end",
  right: "0",
  padding: "5px",
  position: "fixed",
  top: "0",
  width: "100%",
  zIndex: "5",
});
const Button = styled.button({
  background: "none",
  border: "0",
  color: "black",
  cursor: "pointer",
  fontSize: "16px",
  padding: "8px",
  transition: "color .4s ease",
  ["&:hover"]: {
    color: (props) => props.secondary,
  },
});
