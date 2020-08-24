import React from "react";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";

export default function ImageSlider() {
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
    <SlideWrapper>
      <ImageGallery
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
});
