import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ImageSlider from "../components/ImageSlider";
import TopBar from "../components/TopBar";
import PageTitle from "../components/PageTitle";
import Services from "../components/Services";
import HomeBanners from "../components/HomeBanners";
import HomeNews from "../components/HomeNews";
import BottomBar from "../components/BottomBar";
import WhatsappFloatButton from "../components/WhatsappFloatButton";

import StyleContext from "../context/StyleContext";
import firebase from "../firebase/client.js";

export default function Home() {
  const [categories, setCategories] = useState(undefined);
  const [products, setProducts] = useState(undefined);
  const { style } = useContext(StyleContext);
  const { homeTitle } = style;

  useEffect(() => {
    firebase
      .getDocsFromCollection("categories")
      .then((cats) => setCategories(cats[0].categories));
    firebase.getPromotedProducts().then((prods) => setProducts(prods));
  }, []);

  const images = [
    {
      original:
        "https://ep01.epimg.net/elpais/imagenes/2019/10/30/album/1572424649_614672_1572453030_noticia_normal.jpg",
    },
    { original: "https://i.ytimg.com/vi/n_KrxgXrU4w/maxresdefault.jpg" },
    {
      original:
        "https://ep01.epimg.net/elpais/imagenes/2019/10/25/album/1572000664_599621_1572022503_noticia_normal.jpg",
    },
  ];

  return (
    <Wrapper>
      <TopBar />
      <ImageSlider images={images} />
      <PageTitle text={homeTitle} />
      <Services />
      {categories && <HomeBanners categories={categories} />}
      {products && <HomeNews products={products} />}
      <BottomBar />
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
