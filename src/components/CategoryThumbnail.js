import React from "react";
import styled from "styled-components";
import DeleteSvg from "./svg/DeleteSvg";

export default function CategoryThumbnail({
  draggable,
  deleteFn,
  id,
  img,
  inputOnChangeFn,
  inputVal,
}) {
  return (
    <Container draggable={draggable && "true"}>
      {draggable && <DragTricolon>⁝</DragTricolon>}
      <Img src={img} />
      <Input
        value={inputVal}
        onChange={(e) => inputOnChangeFn(e.target.value)}
        placeholder="Agregar nombre"
      />
      {draggable && (
        <RemoveButton onClick={() => deleteFn(id)}>
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
const Img = styled.img({
  height: "85%",
  width: "35px",
});
const DragTricolon = styled.span({
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
