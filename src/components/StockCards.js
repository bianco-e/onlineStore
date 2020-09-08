import React from "react";
import styled from "styled-components";

const colors = {
  out: "rgba(152, 0, 11, .5)",
  low: "rgba(247, 129, 40, .5)",
  ok: "#EEE",
};

const sortStockBySizes = (stock) => stock.sort((a, b) => a.pos > b.pos);

export default function StockCards({ stock }) {
  return (
    <Container>
      {sortStockBySizes(stock).map(({ size, items }) => {
        const { out, low, ok } = colors;
        return (
          <Card
            bgColor={items < 1 ? out : items < 3 ? low : ok}
            key={size}
          >{`${items} ${size}`}</Card>
        );
      })}
    </Container>
  );
}

const Container = styled.div({
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
});
const Card = styled.span({
  background: (props) => props.bgColor,
  borderRadius: "5px",
  fontSize: "11px",
  marginRight: "3px",
  padding: "5px",
});
