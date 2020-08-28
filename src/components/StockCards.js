import React from "react";
import styled from "styled-components";

export default function StockCards({ stock }) {
  const colors = {
    out: "rgba(152, 0, 11, .5)",
    low: "rgba(247, 129, 40, .5)",
    ok: "#EEE",
  };

  return (
    <Container>
      {Object.entries(stock).map(([key, value]) => {
        return (
          <Card
            bgColor={
              value < 1 ? colors.out : value < 3 ? colors.low : colors.ok
            }
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
