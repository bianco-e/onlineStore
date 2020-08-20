import React from "react";
import styled from "styled-components";
import AdminPanel from "../components/AdminPanel";
import AdminTopBar from "../components/AdminTopBar";

export default function Admin({ Child }) {
  return (
    <Wrapper>
      <AdminPanel />
      <AdminTopBar />
      {Child && <Child />}
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
});
