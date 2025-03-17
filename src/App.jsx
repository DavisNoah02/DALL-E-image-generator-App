import React from 'react';
import img1 from './assets/images/background.jpg';
import img2 from './assets/images/background.jpg';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <section className="image_generator container mx-auto px-4">
        <div className="content bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-4">AI Image Generator</h1>
          <p className="text-center mb-6">Turn Your Imagination into Stunning Visuals in Seconds!</p>
          <form className="generate_form">
            <input
              type="text"
              className="prompt_input w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Describe your desired images in words"
              required
            />
            <div className="control flex justify-between items-center">
              <select className="img_quantity p-2 border border-gray-300 rounded">
                <option value="1">1 Image</option>
                <option value="2">2 Images</option>
                <option value="3">3 Images</option>
                <option value="4">4 Images</option>
              </select>
              <button type="submit" className="generate_btn bg-blue-500 text-white p-2 rounded">
                Generate
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="img_gallery container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Image cards will go here */}
          <section className="img_gallery container mx-auto px-4 mt-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="img_card bg-white rounded-lg shadow-md overflow-hidden">
    <img src={img1} alt="generated" className="w-full h-48 object-cover" />
      <a href="#" className="download_btn block text-center p-2 bg-green-500 text-white">
        Download
      </a>
    </div>
    <div className="img_card bg-white rounded-lg shadow-md overflow-hidden">
    <img src={img2}  alt="generated" className="w-full h-48 object-cover" />
      <a href="#" className="download_btn block text-center p-2 bg-green-500 text-white">
        Download
      </a>
    </div>
    {/* Repeat for other images */}
  </div>
</section>
        </div>
      </section>
    </div>
  );
}

export default App;