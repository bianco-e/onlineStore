import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import TopBar from "../components/TopBar";
import PageTitle from "../components/PageTitle";
import Services from "../components/Services";
import HomeBanners from "../components/HomeBanners";
import HomeNews from "../components/HomeNews";
import BottomBar from "../components/BottomBar";
import WhatsappFloatButton from "../components/WhatsappFloatButton";
import LoadingSpinner from "../components/LoadingSpinner";

import StyleContext from "../context/StyleContext";
import firebase from "../firebase/client.js";

export default function Home() {
  const [categories, setCategories] = useState(undefined);
  const [products, setProducts] = useState(undefined);
  const { style } = useContext(StyleContext);
  const { homeTitle } = style;

  useEffect(() => {
    firebase
      .getDocByID("categories", "categories")
      .then((cats) => setCategories(cats.categories));
    firebase.getPromotedProducts().then((prods) => setProducts(prods));
  }, []);

  return (
    <Wrapper>
      {!products ? (
        <LoadingSpinner />
      ) : (
        <>
          <TopBar />
          <PageTitle text={homeTitle} />
          <Services />
          {categories && <HomeBanners categories={categories} />}
          {products && <HomeNews products={products} />}
          <BottomBar />
        </>
      )}
      <WhatsappFloatButton />
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  width: "100%",
});
