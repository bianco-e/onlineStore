import React from "react";
import styled from "styled-components";

import StyledInput from "./StyledInput";

const sortStockBySizes = (stock) => stock.sort((a, b) => a.pos > b.pos);

export default function MultipleInput({ stock, setStock }) {
  const handleChange = (e, opt) => {
    const option = stock.find((element) => element.size == opt.size);
    setStock(
      stock
        .filter((element) => element.size != opt.size)
        .concat({ ...option, items: parseInt(e.target.value) })
    );
  };

  return (
    <Wrapper>
      {sortStockBySizes(stock).map((opt) => {
        return (
          <Label>
            {opt.size}
            <StyledInput
              onChangeFn={(e) => handleChange(e, opt)}
              type="number"
              val={opt.items}
              width="31px"
            />
          </Label>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div({
  display: "flex",
  justifyContent: "space-between",
  minWidth: "60%",
});
const Label = styled.label({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  fontSize: "11px",
});
