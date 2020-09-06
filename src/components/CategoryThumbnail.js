import React from "react";
import styled from "styled-components";
import IconButton from "./IconButton";

export default function CategoryThumbnail({
  confirmToDeleteCategory,
  img,
  name,
  setDraggedVal,
  setCategoryToEdit,
}) {
  return (
    <Container draggable onDragStart={() => setDraggedVal(name)}>
      <Tricolon title="Arrastrá la categoría hasta el recuadro del banner que elijas">
        ⁝
      </Tricolon>
      <Image src={img} />
      <Name>{name}</Name>
      <IconButton onClickFn={() => confirmToDeleteCategory(name)} />
      <IconButton edit onClickFn={() => setCategoryToEdit(name)} />
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
  padding: "1px",
  position: "relative",
});
const Name = styled.span({
  alignItems: "center",
  display: "flex",
  fontSize: "14px",
  height: "100%",
  marginLeft: "10px",
  minWidth: "264px",
});
const Tricolon = styled.span({
  cursor: "grabbing",
  fontWeight: "750",
  fontSize: "18px",
  padding: "0 10px",
});
const Image = styled.img({
  height: "100%",
  width: "40px",
});
