import React from "react";
import styled from "styled-components";

export default function ColorsCards({ button, setColors, colors }) {
  return (
    <Container>
      {colors.map((col) => (
        <Card key={col}>
          {col}
          {button && (
            <CloseButton
              onClick={() => setColors(colors.filter((color) => color != col))}
            >
              x
            </CloseButton>
          )}
        </Card>
      ))}
    </Container>
  );
}

const Card = styled.span({
  background: "#EEE",
  borderRadius: "5px",
  fontSize: "12px",
  margin: "0 2px",
  padding: "3px 5px",
  paddingRight: "20px",
  position: "relative",
});
const CloseButton = styled.button({
  background: "none",
  border: "0",
  color: "#AAA",
  cursor: "pointer",
  fontSize: "10px",
  padding: "0",
  position: "absolute",
  right: "4px",
  top: "1px",
});
const Container = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexWrap: "wrap",
});
