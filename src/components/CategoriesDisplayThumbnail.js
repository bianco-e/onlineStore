import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
    const existingElement = allCategories.find((cat) => cat.name == draggedVal);
    const existingElIdx = allCategories.indexOf(existingElement);
    const targetIdx = allCategories.indexOf(target);
    allCategories.splice(existingElIdx, 1, {
      ...existingElement,
      ga: target.ga,
    });
    allCategories.splice(targetIdx, 1, { ...target, ga: existingElement.ga });
    setAllCategories([...allCategories]);
  };

  const options = [
    {
      gta: "'p1 p1' 'p1 p1'",
      gtc: "repeat(2, 1fr)",
    },
    {
      gta: "'p1 p2' 'p1 p2'",
      gtc: "repeat(2, 1fr)",
    },
    {
      gta: "'p1 p2' 'p1 p3'",
      gtc: "repeat(2, 1fr)",
    },
    {
      gta: "'p1 p2 p3' 'p1 p4 p4'",
      gtc: "1.3fr 0.85fr 0.85fr",
    },
    {
      gta: "'p1 p2 p3' 'p1 p4 p5'",
      gtc: "1.3fr 0.85fr 0.85fr",
    },
    {
      gta: "'p1 p2 p3' 'p6 p4 p5'",
      gtc: "1.3fr 0.85fr 0.85fr",
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
