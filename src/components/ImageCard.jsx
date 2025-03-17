import React from 'react';
import loaderSvg from '../assets/images/loader.svg';
import downloadSvg from '../assets/images/download.svg';

const ImageCard = ({ image }) => {
  const downloadImage = () => {
    if (image.loading) return;
    
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `ai-image-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`img-card ${image.loading ? 'loading' : ''}`}>
      <img 
        src={image.loading ? loaderSvg : image.url} 
        alt={image.loading ? "Loading..." : "AI generated image"} 
      />
      {!image.loading && (
        <div className="download-btn" onClick={downloadImage}>
          <img src={downloadSvg} alt="Download" />
        </div>
      )}
    </div>
  );
};

export default ImageCard;