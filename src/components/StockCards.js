import React from "react";
import styled from "styled-components";

export default function StockCards({ stock }) {
  return (
    <Container>
      {Object.entries(stock).map(([key, value]) => {
        return (
          <Card
            bgColor={value == 0 ? "rgba(152, 0, 11, .5)" : "#EEE"}
            key={key}
          >{`${value} ${key}`}</Card>
        );
      })}
    </Container>
  );
}

const Container = styled.div({
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
});
const Card = styled.span({
  background: (props) => props.bgColor,
  borderRadius: "5px",
  fontSize: "12px",
  margin: "0 2px",
  padding: "5px",
});
