import React from "react";
import ImageGallery from "react-image-gallery";

export default function ImageSlider({ images }) {
  return (
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
  );
}
