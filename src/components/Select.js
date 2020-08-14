import React from "react";
import styled from "styled-components";

export default function Select({ options, onChangeFn, pos }) {
  return (
    <SelectButton
      onChange={(e) => onChangeFn(e)}
      position={pos?.name}
      bottom={pos?.bottom}
      right={pos?.right}
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
  border: "1px solid black",
  borderRadius: "9999px",
  backgroundColor: "transparent",
  cursor: "pointer",
  fontSize: "15px",
  padding: "8px 30px",
  position: (props) => props.position || "relative",
  right: (props) => props.right,
  bottom: (props) => props.bottom,
  textAlign: "center",
  mozAppearance: "none",
  webkitAppearance: "none",
  appearance: "none",
});
