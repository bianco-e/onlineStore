import React from "react";
import styled from "styled-components";
import AdminPanel from "../components/AdminPanel";

export default function Admin() {
  return (
    <Wrapper>
      <AdminPanel />
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
});
