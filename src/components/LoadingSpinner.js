import React from "react";
import styled from "styled-components";
import GridLoader from "react-spinners/GridLoader";

export default function LoadingSpinner() {
  return (
    <Container>
      <GridLoader />
    </Container>
  );
}

const Container = styled.div({
  display: "grid",
  margin: "150px 0 0 0",
  placeItems: "center",
});
