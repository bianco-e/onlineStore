import React from "react";
import styled from "styled-components";
import SettableImageThumbnail from "./SettableImageThumbnail";

export default function CategoryInput({
  img,
  imgOnChangeFn,
  inputOnChangeFn,
  inputVal,
}) {
  return (
    <Container>
      <SettableImageThumbnail
        src={img}
        onChangeFn={(e) => imgOnChangeFn(e.target.files[0])}
      />
      <Input
        onChange={(e) => inputOnChangeFn(e, inputVal)}
        placeholder="Agregar nombre"
        value={inputVal}
      />
    </Container>
  );
}

const Container = styled.div({
  alignItems: "center",
  border: "1px solid #DDD",
  borderRadius: "10px",
  display: "flex",
  height: "35px",
  marginBottom: "12px",
  padding: "1px 2px",
  position: "relative",
});
const Input = styled.input({
  border: "0",
  cursor: "pointer",
  fontSize: "14px",
  height: "100%",
  width: "230px",
});
