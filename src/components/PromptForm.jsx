import React, { useState } from 'react';

const PromptForm = ({ onGenerateImages, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [quantity, setQuantity] = useState(4);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    
    onGenerateImages(prompt, quantity);
  };

  return (
    <form className="generate-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="prompt-input"
        placeholder="Describe your desired images in words"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        required
      />
      <div className="control">
        <select 
          className="img-quantity" 
          value={quantity} 
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          <option value={1}>1 Image</option>
          <option value={2}>2 Images</option>
          <option value={3}>3 Images</option>
          <option value={4}>4 Images</option>
        </select>
        <button 
          type="submit" 
          className="generate-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </div>
    </form>
  );
};

export default PromptForm;