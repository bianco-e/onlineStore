import React from "react";
import styled from "styled-components";
import ImageSlider from "../components/ImageSlider";
import TopBar from "../components/TopBar";
import PageTitle from "../components/PageTitle";
import Services from "../components/Services";
import HomeBanners from "../components/HomeBanners";
import HomeNews from "../components/HomeNews";
import BottomBar from "../components/BottomBar";
import WhatsappFloatButton from "../components/WhatsappFloatButton";

import prueba1 from "../images/prueba1.png";
import prueba2 from "../images/prueba2.png";
import prueba3 from "../images/prueba3.png";

export default function Home() {
  const sliderImages = [
    { original: prueba1 },
    { original: prueba2 },
    { original: prueba3 },
  ];
  return (
    <Wrapper>
      <TopBar />
      <ImageSlider images={sliderImages} />
      <PageTitle text="Bienvenid@s" />
      <Services />
      <HomeBanners />
      <HomeNews />
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
