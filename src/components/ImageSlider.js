import React from "react";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";

export default function ImageSlider({ images }) {
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
});
