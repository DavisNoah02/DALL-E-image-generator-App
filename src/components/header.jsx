import React from 'react';

function Header({ onGenerateImages }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const prompt = event.target.elements.prompt.value;
    const quantity = parseInt(event.target.elements.quantity.value, 10);
    onGenerateImages(prompt, quantity);
  };

  return (
    <header className="bg-blue-600 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">AI Image Generator</h1>
        <p className="mb-6">Turn Your Imagination into Stunning Visuals in Seconds!</p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            name="prompt"
            className="w-full max-w-md p-2 border border-gray-300 rounded mb-4"
            placeholder="Describe your desired images in words"
            required
          />
          <div className="flex space-x-4">
            <select
              name="quantity"
              className="p-2 border border-gray-300 rounded"
              defaultValue="1"
              required
            >
              <option value="1">1 Image</option>
              <option value="2">2 Images</option>
              <option value="3">3 Images</option>
              <option value="4">4 Images</option>
            </select>
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded"
            >
              Generate
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
export default Header;