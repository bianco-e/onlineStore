import React from "react";
import styled from "styled-components";
import GridLoader from "react-spinners/GridLoader";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function LoadingSpinner({ small }) {
  return (
    <Container margin={small ? "90px 0 0 0" : "150px 0 0 0"}>
      {small ? <PropagateLoader size={15} /> : <GridLoader />}
    </Container>
  );
}

const Container = styled.div({
  display: "grid",
  margin: (props) => props.margin,
  placeItems: "center",
});
