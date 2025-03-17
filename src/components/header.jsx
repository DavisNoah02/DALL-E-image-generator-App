import React from 'react';
import PromptForm from './PromptForm';

function Header({ backgroundImage, onGenerateImages, isLoading }) {
    const handleSubmit = (event) => {
      event.preventDefault();
      const prompt = event.target.elements.prompt.value;
      const quantity = parseInt(event.target.elements.quantity.value, 10);
      onGenerateImages(prompt, quantity);
    };
  
    return (
      <header style={{ backgroundImage: `url(${backgroundImage})` }}>
        <h1>DALL-E Image Generator</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="prompt" placeholder="Enter prompt" required />
          <input type="number" name="quantity" min="1" max="10" defaultValue="1" required />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </form>
      </header>
    );
  }
  
  export default Header;