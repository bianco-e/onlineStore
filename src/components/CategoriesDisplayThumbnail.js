import React, { useEffect } from "react";
import styled from "styled-components";

const createArr = (arr, n) => {
  let counter = 1;
  while (n >= counter) {
    arr.push({ ga: `p${counter}` });
    counter++;
  }
  return arr;
};

export default function CategoriesDisplayThumbnail({
  categoriesOrder,
  draggedVal,
  n,
  setCategoriesOrder,
}) {
  useEffect(() => setCategoriesOrder(createArr([], n)), [n]);

  const handleDrop = (e) => {
    const elementToChange = categoriesOrder.find((el) => el.ga == e.target.id);
    const newElement = { ...elementToChange, content: draggedVal };
    const idx = categoriesOrder.indexOf(elementToChange);

    const existingElement = categoriesOrder.find(
      (el) => el.content == draggedVal
    );
    if (existingElement) {
      const idx = categoriesOrder.indexOf(existingElement);
      categoriesOrder.splice(idx, 1, {
        ...existingElement,
        content: elementToChange.content,
      });
    }
    categoriesOrder.splice(idx, 1, newElement);
    setCategoriesOrder([...categoriesOrder]);
  };

  const options = [
    {
      gta: "'p1 p1' 'p1 p1'",
      gtc: "repeat(2, 1fr)",
      gtr: "repeat(2, 1fr)",
    },
    {
      gta: "'p1 p2' 'p1 p2'",
      gtc: "repeat(2, 1fr)",
      gtr: "repeat(2, 1fr)",
    },
    {
      gta: "'p1 p2' 'p1 p3'",
      gtc: "repeat(2, 1fr)",
      gtr: "repeat(2, 1fr)",
    },
    {
      gta: "'p1 p2 p3' 'p1 p4 p4'",
      gtc: "1.3fr 0.85fr 0.85fr",
      gtr: "repeat(2, 1fr)",
    },
    {
      gta: "'p1 p2 p3' 'p1 p4 p5'",
      gtc: "1.3fr 0.85fr 0.85fr",
      gtr: "repeat(2, 1fr)",
    },
    {
      gta: "'p1 p2 p3' 'p6 p4 p5'",
      gtc: "1.3fr 0.85fr 0.85fr",
      gtr: "repeat(2, 1fr)",
    },
  ];

  return (
    <>
      <Title>Banner de inicio</Title>
      <Wrapper
        grid={options[n - 1]}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e)}
      >
        {categoriesOrder.map((pos) => {
          const { ga, content } = pos;
          return (
            <Div ga={ga} id={ga} key={ga}>
              {content}
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
  gridTemplateRows: (props) => props.grid.gtr,
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
