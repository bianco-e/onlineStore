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
      {Child ? <Child /> : <AdminHome />}
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
});
