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

export default function Home() {
  return (
    <Wrapper>
      <TopBar />
      <ImageSlider />
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
