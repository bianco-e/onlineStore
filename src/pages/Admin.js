import React from "react";
import styled from "styled-components";
import AdminPanel from "../components/AdminPanel";
import AdminTopBar from "../components/AdminTopBar";
import AdminHome from "../components/AdminHome";

export default function Admin({ Child }) {
  return (
    <Wrapper>
      <AdminPanel />
      <AdminTopBar />
      <Container>{Child ? <Child /> : <AdminHome />}</Container>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "flex-start",
  display: "flex",
  justifyContent: "flex-start",
  minHeight: "100vh",
  width: "100%",
});
const Container = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  margin: "50px 10px 0 210px",
  minHeight: "100vh",
  position: "relative",
  width: "100%",
});
