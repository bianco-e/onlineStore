import React from "react";
import styled from "styled-components";
import DeleteSvg from "./svg/DeleteSvg";
import EditSvg from "./svg/EditSvg";
import LinkSvg from "./svg/LinkSvg";

export default function IconButton({ edit, link, onClickFn }) {
  return (
    <Button
      right={link ? "51px" : edit ? "26px" : "1px"}
      onClick={() => onClickFn()}
    >
      {link ? <LinkSvg /> : edit ? <EditSvg /> : <DeleteSvg />}
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
