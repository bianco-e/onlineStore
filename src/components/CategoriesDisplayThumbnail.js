import React, { useEffect, useState } from "react";
import styled from "styled-components";

const createArr = (arr, num) => {
  do {
    arr.push({ num });
    num--;
  } while (num > 0);
  return arr;
};

export default function CategoriesDisplayThumbnail({ draggedVal, n }) {
  const [array, setArray] = useState([]);
  useEffect(() => setArray(createArr([], n)), [n]);

  const handleDrop = (e) => {
    const divID = e.target.id;
    const elementToChange = array.find((el) => el.num == divID);
    const newElement = { ...elementToChange, content: draggedVal };
    const idx = array.indexOf(elementToChange);
    array.splice(idx, 1, newElement);
    setArray([...array]);
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
      <Wrapper grid={options[n - 1]}>
        {array.map((pos, i) => (
          <Div
            ga={`p${i + 1}`}
            id={pos.num}
            key={pos.num}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e)}
          >
            {pos.content}
          </Div>
        ))}
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
