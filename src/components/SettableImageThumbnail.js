import React from "react";
import styled from "styled-components";

export default function SettableImageThumbnail({ onChangeFn, src }) {
  return (
    <Label>
      <Img src={src} />
      <ImgInput onChange={(e) => onChangeFn(e)} type="file" />
    </Label>
  );
}

const Label = styled.label({
  cursor: "pointer",
  display: "grid",
  height: "85%",
  placeItems: "center",
  width: "35px",
});
const Img = styled.img({
  height: "100%",
  width: "35px",
});
const ImgInput = styled.input({
  display: "none",
});
