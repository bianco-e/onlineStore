import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import LogOutSvg from "./svg/LogOutSvg";
import MenuIcon from "./svg/MenuIcon";

import StyleContext from "../context/StyleContext";
import AdminContext from "../context/AdminContext";

export default function AdminTopBar({ menuIcon, showTab }) {
  const history = useHistory();
  const { style } = useContext(StyleContext);
  const { primaryColor } = style;
  const { logout } = useContext(AdminContext);

  return (
    <Wrapper
      bgColor={primaryColor}
      jContent={menuIcon ? "space-between" : "flex-end"}
    >
      {menuIcon && (
        <Button onClick={() => showTab()}>
          <MenuIcon />
        </Button>
      )}
      <Button
        onClick={() => {
          history.push("/");
          logout();
        }}
      >
        <LogOutSvg />
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  backgroundColor: (props) => props.bgColor,
  display: "flex",
  justifyContent: (props) => props.jContent,
  right: "0",
  padding: "5px",
  position: "fixed",
  top: "0",
  width: "100%",
  zIndex: "5",
});
const Container = styled.div({
  position: "relative",
  width: "85%",
});
const Button = styled.button({
  background: "none",
  border: "0",
  cursor: "pointer",
  zIndex: "6",
});
