import React, { useState } from 'react';
import Header from './components/header';
import PromptForm from './components/PromptForm';
import ImageGallery from './components/ImageGallery';
import { generateImages } from './services/api';
import bgImage from './assets/images/background.jpg';
// import React from 'react';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateImages = async (prompt, quantity) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Create placeholder loading images
      const loadingImages = Array(quantity).fill().map((_, index) => ({
        id: `loading-${index}`,
        loading: true
      }));
      setImages(loadingImages);
      
      // Generate images
      const generatedImages = await generateImages(prompt, quantity);
      setImages(generatedImages);
      
    } catch (err) {
      console.error('Error generating images:', err);
      setError(err.message || 'Failed to generate images. Please try again.');
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <Header 
        backgroundImage={bgImage}
        onGenerateImages={handleGenerateImages}
        isLoading={isLoading}
      />
      
      <div className="container">
        {error && (
          <div className="error-message" >
            {error}
          </div>
        )}
      
        <ImageGallery images={images} />
      </div>
    </div>
  );
}
// function App() {
//   return (
//     <div >
//       <h1 >Hello, Welcome!</h1>
//     </div>
//   );
// }

export default App;