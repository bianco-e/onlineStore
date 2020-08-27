import React from "react";
import styled from "styled-components";
import DeleteSvg from "./svg/DeleteSvg";
import EditSvg from "./svg/EditSvg";

export default function IconButton({ edit, onClickFn }) {
  return (
    <Button right={edit ? "26px" : "1px"} onClick={() => onClickFn()}>
      {edit ? <EditSvg /> : <DeleteSvg width={18} />}
    </Button>
  );
}

const Button = styled.button({
  background: "none",
  border: "0",
  cursor: "pointer",
  position: "absolute",
  right: (props) => props.right,
  top: "3px",
});
