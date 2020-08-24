import React from "react";
import styled from "styled-components";
import DeleteSvg from "./svg/DeleteSvg";
import SettableImageThumbnail from "./SettableImageThumbnail";

export default function CategoryThumbnail({
  draggable,
  deleteFn,
  img,
  imgOnChangeFn,
  inputValSetter,
  inputVal,
  setDraggedVal,
}) {
  return (
    <Container
      draggable={draggable && "true"}
      onDragStart={() => setDraggedVal(inputVal)}
    >
      {draggable && (
        <TricolonSpan title="Arrastrá la categoría hasta el recuadro del banner que elijas">
          ⁝
        </TricolonSpan>
      )}
      <SettableImageThumbnail src={img} onChangeFn={(e) => imgOnChangeFn(e)} />
      <Input
        onChange={(e) => inputValSetter(e.target.value)}
        placeholder="Agregar nombre"
        value={inputVal}
      />
      {draggable && (
        <RemoveButton onClick={() => deleteFn(inputVal)}>
          <DeleteSvg width={17} />
        </RemoveButton>
      )}
    </Container>
  );
}

const Container = styled.div({
  alignItems: "center",
  border: "1px solid #DDD",
  display: "flex",
  height: "35px",
  marginBottom: "12px",
});
const Input = styled.input({
  cursor: "pointer",
  fontSize: "14px",
  height: "100%",
  width: "230px",
});
const TricolonSpan = styled.span({
  cursor: "grabbing",
  fontWeight: "750",
  fontSize: "18px",
  padding: "0 10px",
});
const RemoveButton = styled.button({
  background: "none",
  border: "0",
  cursor: "pointer",
});
