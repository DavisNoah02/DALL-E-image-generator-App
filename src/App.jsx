import React, { useState } from 'react';
import Header from './components/header';
import ImageGallery from './components/ImageGallery';
import img1 from './assets/images/background.jpg';

function App() {
  const [images, setImages] = useState([]);

  const handleGenerateImages = (prompt, quantity) => {
    // Placeholder for image generation logic
    const generatedImages = Array.from({ length: quantity }, (_, index) => ({
      id: index,
      src: img1,
    }));
    setImages(generatedImages);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Header onGenerateImages={handleGenerateImages} />
      <ImageGallery images={images} />
    </div>
  );
}

export default App;