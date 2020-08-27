import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { gridOptions } from "../data/data.js";

export default function CategoriesDisplayThumbnail({
  allCategories,
  draggedVal,
  setAllCategories,
}) {
  const [n, setN] = useState(allCategories.length);

  useEffect(() => {
    setN(allCategories.length);
  }, [allCategories.length]);

  const handleDrop = (e) => {
    const target = allCategories.find((cat) => cat.ga == e.target.id);
    const draggedElement = allCategories.find((cat) => cat.name == draggedVal);
    if (target.name != draggedElement.name) {
      const editedCategories = allCategories
        .filter((cat) => cat.ga != e.target.id)
        .filter((cat) => cat.name != draggedVal)
        .concat({
          ...draggedElement,
          ga: target.ga,
        })
        .concat({ ...target, ga: draggedElement.ga });
      setAllCategories(editedCategories);
    }
  };

  return (
    <>
      <Title>Banner de inicio</Title>
      <Wrapper
        grid={gridOptions[n - 1]}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e)}
      >
        {allCategories.map((cat) => {
          const { ga, name } = cat;
          return (
            <Div ga={ga} id={ga} key={ga}>
              {name}
            </Div>
          );
        })}
      </Wrapper>
    </>
  );
}

const Title = styled.p({
  fontSize: "14px",
  fontWeight: "bold",
});
const Wrapper = styled.div({
  display: "grid",
  gridTemplateAreas: (props) => props.grid.gta,
  gridTemplateColumns: (props) => props.grid.gtc,
  gridTemplateRows: "repeat(2, 1fr)",
  gridGap: "2px",
  height: "100px",
  marginBottom: "15px",
  width: "240px",
});
const Div = styled.div({
  border: "1px solid black",
  display: "grid",
  fontSize: "8px",
  gridArea: (props) => props.ga,
  placeItems: "center",
});
