import React, { useState } from "react";
import styled from "styled-components";

import StyledInput from "./StyledInput";

export default function MultipleChoice({ options, stock, setStock }) {
  return (
    <Wrapper>
      {options.map((opt) => {
        return (
          <>
            <Text>{opt}</Text>
            <StyledInput
              onChangeFn={(e) => setStock({ ...stock, [opt]: e.target.value })}
              type="number"
              val={stock[opt.toLowerCase()]}
              width="35px"
            />
          </>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div({
  display: "flex",
  justifyContent: "space-between",
});
const Text = styled.p({
  fontSize: "10px",
  margin: "0",
});
