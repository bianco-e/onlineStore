import React, { useState } from "react";
import styled from "styled-components";
import ProductBanner from "./ProductBanner";
import { gridOptions } from "../data/data.js";

export default function HomeBanners({ categories }) {
  const [n, setN] = useState(categories.length - 1);

  return (
    <Wrapper grid={gridOptions[n]}>
      {categories.map((category) => {
        const { endpoint, ga, img, name } = category;
        return (
          <ProductBanner
            endpoint={endpoint}
            ga={ga}
            img={img}
            key={name}
            name={name}
          />
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div({
  display: "grid",
  gridGap: "20px",
  gridTemplateAreas: (props) => props.grid.gta,
  gridTemplateColumns: (props) => props.grid.gtc,
  gridTemplateRows: (props) => props.grid.gtr || "repeat(2, 1fr)",
  height: "450px",
  padding: "20px 0",
  width: "90%",
});
