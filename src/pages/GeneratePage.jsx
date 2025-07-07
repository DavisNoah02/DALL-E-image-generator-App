import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { generateImages, getUserImages } from '@/services/api'
import { Download, Share2, Image, Sparkles, Award, Grid3x3, Zap, RotateCcw } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'react-toastify'

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('')
  const [imageCount, setImageCount] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState([])
  const [savedImages, setSavedImages] = useState([])
  const [error, setError] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('realistic')
  const [aspectRatio, setAspectRatio] = useState('square')
  const [showTips, setShowTips] = useState(true)
  const { currentUser } = useAuth()

  const imageStyles = [
    { id: 'realistic', name: 'Realistic', icon: <Image size={16} /> },
    { id: 'anime', name: 'Anime', icon: <Sparkles size={16} /> },
    { id: 'abstract', name: 'Abstract', icon: <Grid3x3 size={16} /> },
    { id: 'digital', name: 'Digital Art', icon: <Zap size={16} /> },
    { id: 'watercolor', name: 'Watercolor', icon: <Award size={16} /> }
  ]

  const ratios = [
    { id: 'square', name: '1:1', value: 'aspect-square' },
    { id: 'portrait', name: '2:3', value: 'aspect-[2/3]' },
    { id: 'landscape', name: '3:2', value: 'aspect-[3/2]' },
    { id: 'wide', name: '16:9', value: 'aspect-video' }
  ]

  const promptSuggestions = [
    "A serene mountain lake at sunset with reflections",
    "Futuristic cyberpunk city with neon lights",
    "Cute animal friends having a tea party",
    "Abstract geometric patterns in vibrant colors",
    "Underwater scene with bioluminescent creatures"
  ]

  useEffect(() => {
    if (currentUser) {
      loadUserImages()
    }
  }, [currentUser])

  const loadUserImages = async () => {
    try {
      const response = await getUserImages(currentUser.uid)
      setSavedImages(response.images || [])
    } catch (error) {
      console.error('Error loading images:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.')
      return
    }
    setError('')
    setIsGenerating(true)
    
    // Enhanced prompt with style
    const enhancedPrompt = `${prompt} - ${selectedStyle} style`
    
    try {
      const result = await generateImages(enhancedPrompt, imageCount, currentUser.uid)
      setGeneratedImages(result.imageUrls)
      await loadUserImages()
      toast.success('Images generated successfully!')
    } catch (error) {
      setError('Failed to generate images. Try again.')
      toast.error('Failed to generate images')
    } finally {
      setIsGenerating(false)
    }
  }

  const regenerateLastPrompt = () => {
    if (prompt.trim()) {
      handleSubmit({ preventDefault: () => {} })
    }
  }

  const downloadImage = (url) => {
    const link = document.createElement('a')
    link.href = url
    link.download = `ai-generated-${selectedStyle}-image.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Image downloaded!')
  }

  const shareImage = async (url) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this AI-generated image!',
          text: `Generated with AI in ${selectedStyle} style 🤖`,
          url,
        })
      } catch (err) {
        console.error('Share failed:', err)
      }
    } else {
      navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard!')
    }
  }

  const applyPromptSuggestion = (suggestion) => {
    setPrompt(suggestion)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Generate Images</h1>
        <p className="text-muted-foreground">
          Transform your ideas into stunning AI-generated images
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Generator Form */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Prompt Input */}
            <div className="space-y-2">
              <label className="text-lg font-medium">
                Describe your image
              </label>
              <textarea
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-24 resize-none"
                placeholder="Describe the image you want to generate in detail..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
            </div>

            {/* Prompt Suggestions */}
            {showTips && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Try these prompts:
                </label>
                <div className="flex flex-wrap gap-2">
                  {promptSuggestions.map((suggestion, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => applyPromptSuggestion(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Style Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Style</label>
              <div className="flex flex-wrap gap-2">
                {imageStyles.map((style) => (
                  <Button
                    key={style.id}
                    type="button"
                    variant={selectedStyle === style.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStyle(style.id)}
                    className="flex items-center gap-2"
                  >
                    {style.icon}
                    {style.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Aspect Ratio</label>
              <div className="flex gap-2">
                {ratios.map((ratio) => (
                  <Button
                    key={ratio.id}
                    type="button"
                    variant={aspectRatio === ratio.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAspectRatio(ratio.id)}
                  >
                    {ratio.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Image Count */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Images</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((count) => (
                  <Button
                    key={count}
                    type="button"
                    variant={imageCount === count ? "default" : "outline"}
                    size="sm"
                    onClick={() => setImageCount(count)}
                  >
                    {count}
                  </Button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                type="submit" 
                className="flex-1" 
                disabled={isGenerating || !prompt.trim()}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Images
                  </>
                )}
              </Button>
              {prompt.trim() && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={regenerateLastPrompt}
                  disabled={isGenerating}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Generated Images */}
      {generatedImages.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Generated Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {generatedImages.map((imageUrl, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={imageUrl}
                    alt={`Generated image ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadImage(imageUrl)}
                        className="flex-1"
                      >
                        <Download className="mr-1 h-3 w-3" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => shareImage(imageUrl)}
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 