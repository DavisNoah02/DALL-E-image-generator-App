import React from 'react';
import ImageCard from './ImageCard';

const ImageGallery = ({ images }) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="img-gallery">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
};

export default ImageGallery;