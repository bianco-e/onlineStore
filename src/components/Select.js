import React, { useContext } from "react";
import styled from "styled-components";

import StyleContext from "../context/StyleContext";

export default function Select({ options, onChangeFn, width }) {
  const { style } = useContext(StyleContext);
  const { secondaryColor } = style;

  return (
    <SelectButton
      onChange={(e) => onChangeFn(e)}
      secondary={secondaryColor}
      width={width ? width : undefined}
    >
      {options.map((opt) => {
        return (
          <option key={opt.val} value={opt.val}>
            {opt.val}
          </option>
        );
      })}
    </SelectButton>
  );
}

const SelectButton = styled.select({
  border: (props) => `1px solid ${props.secondary}`,
  borderRadius: "9999px",
  backgroundColor: "transparent",
  cursor: "pointer",
  fontSize: "15px",
  padding: "8px 30px",
  textAlign: "center",
  width: (props) => props.width,
  mozAppearance: "none",
  webkitAppearance: "none",
  appearance: "none",
});
