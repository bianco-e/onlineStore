import React from "react";
import styled from "styled-components";
import ProductBanner from "./ProductBanner";
import { categories } from "../data/data.js";

export default function HomeBanners() {
  return (
    <Wrapper>
      {categories.map((cat) => {
        const { endpoint, ga, img, title } = cat;
        return (
          <ProductBanner
            endpoint={endpoint}
            ga={ga}
            img={img}
            key={title}
            title={title}
          />
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div({
  display: "grid",
  gridTemplateAreas: "'p1 p3 p4' 'p1 p2 p2'",
  gridTemplateRows: "repeat(2, 1fr)",
  gridGap: "20px",
  gridTemplateColumns: "1.3fr 0.85fr 0.85fr",
  height: "450px",
  padding: "20px 0",
  width: "90%",
});
