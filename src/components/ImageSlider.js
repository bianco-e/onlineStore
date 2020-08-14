import React from "react";
import styled from "styled-components";
import prueba1 from "../images/prueba1.png";
import prueba2 from "../images/prueba2.png";
import prueba3 from "../images/prueba3.png";
import ImageGallery from "react-image-gallery";

export default function ImageSlider() {
  const images = [
    { original: prueba1 },
    { original: prueba2 },
    { original: prueba3 },
  ];

  return (
    <SlideWrapper>
      <Slider
        autoPlay={true}
        infinite={true}
        items={images}
        showBullets={true}
        showFullscreenButton={false}
        showThumbnails={false}
        showPlayButton={false}
        slideInterval={5000}
      />
    </SlideWrapper>
  );
}
const SlideWrapper = styled.section({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "450px",
  width: "90%",
});
const Slider = styled(ImageGallery)({
  width: "100%",
});
