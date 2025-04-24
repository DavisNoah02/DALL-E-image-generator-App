import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { generateImages, getUserImages } from '../services/api';
import { Download, Share2, Image, History, Heart, Settings, LogOut, Sparkles, Award, Grid3x3, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageCount, setImageCount] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [savedImages, setSavedImages] = useState([]);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('generate');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [aspectRatio, setAspectRatio] = useState('square');
  const [showTips, setShowTips] = useState(true);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const imageStyles = [
    { id: 'realistic', name: 'Realistic', icon: <Image size={16} /> },
    { id: 'anime', name: 'Anime', icon: <Sparkles size={16} /> },
    { id: 'abstract', name: 'Abstract', icon: <Grid3x3 size={16} /> },
    { id: 'digital', name: 'Digital Art', icon: <Zap size={16} /> },
    { id: 'watercolor', name: 'Watercolor', icon: <Award size={16} /> }
  ];

  const ratios = [
    { id: 'square', name: '1:1', value: 'aspect-square' },
    { id: 'portrait', name: '2:3', value: 'aspect-[2/3]' },
    { id: 'landscape', name: '3:2', value: 'aspect-[3/2]' },
    { id: 'wide', name: '16:9', value: 'aspect-video' }
  ];

  const promptSuggestions = [
    "A serene mountain lake at sunset with reflections",
    "Futuristic cyberpunk city with neon lights",
    "Cute animal friends having a tea party",
    "Abstract geometric patterns in vibrant colors",
    "Underwater scene with bioluminescent creatures"
  ];

  useEffect(() => {
    if (currentUser) {
      loadUserImages();
    }
  }, [currentUser]);

  const loadUserImages = async () => {
    try {
      const response = await getUserImages(currentUser.uid);
      setSavedImages(response.images || []);
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }
    setError('');
    setIsGenerating(true);
    
    // Enhanced prompt with style
    const enhancedPrompt = `${prompt} - ${selectedStyle} style`;
    
    try {
      const result = await generateImages(enhancedPrompt, imageCount, currentUser.uid);
      setGeneratedImages(result.imageUrls);
      await loadUserImages();
    } catch {
      setError('Failed to generate images. Try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `ai-generated-${selectedStyle}-image.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareImage = async (url) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this AI-generated image!',
          text: `Generated with AI in ${selectedStyle} style 🤖`,
          url,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const applyPromptSuggestion = (suggestion) => {
    setPrompt(suggestion);
  };

  const getRatioClass = () => {
    const ratio = ratios.find(r => r.id === aspectRatio);
    return ratio ? ratio.value : 'aspect-square';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
          <div className="flex items-center gap-2">
            <Sparkles className="text-indigo-600" size={28} />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              IMAGIFY AI
            </h1>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <div className="text-sm text-gray-600 px-3 py-1 bg-gray-100 rounded-full">
              {currentUser?.email}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
            >
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex mb-6 bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => setActiveTab('generate')}
            className={`flex-1 py-3 flex justify-center items-center gap-2 text-sm font-medium ${
              activeTab === 'generate' 
                ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-500' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Sparkles size={18} /> Create
          </button>
          <button
            onClick={() => setActiveTab('collection')}
            className={`flex-1 py-3 flex justify-center items-center gap-2 text-sm font-medium ${
              activeTab === 'collection' 
                ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-500' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <History size={18} /> Collection
          </button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {activeTab === 'generate' && (
          <>
            {/* Generator Form */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className=" bg-gray-80  p-4 rounded-lg">
                  <label className="block text-lg font-medium text-gray-700 mb-1">
                    Describe your image
                  </label>
                  <textarea
                    className="w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm min-h-24 bg-gray-100"
                    placeholder="Describe the image you want to generate in detail..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    required
                  ></textarea>
                </div>

                {showTips && (
                  <div className="bg-blue-50 rounded-lg p-4 relative">
                    <button 
                      className="absolute top-2 right-2 text-blue-400 hover:text-blue-600"
                      onClick={() => setShowTips(false)}
                    >
                      ✕
                    </button>
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Pro Tips</h3>
                    <p className="text-xs text-blue-700 mb-2">
                      Be specific with details like lighting, perspective, mood, and setting for better results.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {promptSuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => applyPromptSuggestion(suggestion)}
                          className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded-full"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Style
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {imageStyles.map((style) => (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => setSelectedStyle(style.id)}
                          className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                            selectedStyle === style.id
                              ? 'bg-indigo-100 text-indigo-700 ring-1 ring-indigo-300'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {style.icon} {style.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aspect Ratio
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ratios.map((ratio) => (
                        <button
                          key={ratio.id}
                          type="button"
                          onClick={() => setAspectRatio(ratio.id)}
                          className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                            aspectRatio === ratio.id
                              ? 'bg-indigo-100 text-indigo-700 ring-1 ring-indigo-300'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {ratio.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Images
                    </label>
                    <select
                      className="w-full rounded-lg border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      value={imageCount}
                      onChange={(e) => setImageCount(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>{n} image{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} /> Generate Images
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Generated Images */}
            {generatedImages.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles size={18} className="text-indigo-600" />
                  Your Generated Images
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generatedImages.map((url, i) => (
                    <div key={i} className="group relative bg-white rounded-xl shadow-md overflow-hidden">
                      <div className={`${getRatioClass()} w-full overflow-hidden`}>
                        <img 
                          src={url} 
                          alt={`Generated ${i}`} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <div className="flex justify-between items-center">
                          <button 
                            onClick={() => downloadImage(url)} 
                            className="text-sm bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white px-3 py-1 rounded-full flex items-center gap-1 transition-colors"
                          >
                            <Download size={14} /> Download
                          </button>
                          <button 
                            onClick={() => shareImage(url)} 
                            className="text-sm bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white px-3 py-1 rounded-full flex items-center gap-1 transition-colors"
                          >
                            <Share2 size={14} /> Share
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {activeTab === 'collection' && (
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <History size={18} className="text-indigo-600" />
              Your Collection
            </h2>
            
            {savedImages.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <Image size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-gray-500 mb-2">Your collection is empty</h3>
                <p className="text-gray-400 text-sm mb-4">Generate some awesome images to see them here</p>
                <button
                  onClick={() => setActiveTab('generate')}
                  className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-200"
                >
                  <Sparkles size={16} /> Create Images
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedImages.map((image, index) => (
                  <div key={index} className="group relative bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="aspect-square w-full overflow-hidden">
                      <img 
                        src={image.url} 
                        alt={`Saved ${index}`} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                      <div className="flex justify-end">
                        <button className="h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-rose-500 hover:bg-white">
                          <Heart size={16} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-white/90 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md">
                          {new Date(image.created_at?.seconds * 1000).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => downloadImage(image.url)} 
                            className="h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white"
                          >
                            <Download size={14} />
                          </button>
                          <button 
                            onClick={() => shareImage(image.url)} 
                            className="h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white"
                          >
                            <Share2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>IMAGIFY AI - Create beautiful images with the power of AI</p>
        </footer>
      </div>
    </div>
  );
};

export default ImageGenerator;