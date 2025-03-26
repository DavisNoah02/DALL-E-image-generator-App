import React from 'react';

function ImageGallery({ images }) {
  return (
    <section className="container mx-auto px-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="img_card bg-white rounded-lg shadow-md overflow-hidden">
            <img src={image.src} alt="generated" className="w-full h-48 object-cover" />
            <a href={image.src} download className="download_btn block text-center p-2 bg-green-500 text-white">
              Download
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ImageGallery;