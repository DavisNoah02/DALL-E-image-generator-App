import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getUserImages, deleteImage, toggleFavorite } from '@/services/api'
import { Download, Share2, Trash2, Search, Filter, Heart, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'react-toastify'

export default function CollectionPage() {
  const [savedImages, setSavedImages] = useState([])
  const [filteredImages, setFilteredImages] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const { currentUser } = useAuth()

  const filters = [
    { id: 'all', name: 'All Images' },
    { id: 'recent', name: 'Recent' },
    { id: 'favorites', name: 'Favorites' },
    { id: 'realistic', name: 'Realistic' },
    { id: 'anime', name: 'Anime' },
    { id: 'abstract', name: 'Abstract' },
    { id: 'digital', name: 'Digital Art' },
    { id: 'watercolor', name: 'Watercolor' }
  ]

  useEffect(() => {
    if (currentUser) {
      loadUserImages()
    }
  }, [currentUser])

  useEffect(() => {
    filterImages()
  }, [savedImages, searchTerm, selectedFilter])

  const loadUserImages = async () => {
    try {
      setLoading(true)
      const response = await getUserImages(currentUser.uid)
      setSavedImages(response.images || [])
    } catch (error) {
      console.error('Error loading images:', error)
      toast.error('Failed to load images')
    } finally {
      setLoading(false)
    }
  }

  const filterImages = () => {
    let filtered = savedImages

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(image => 
        image.prompt?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by selected filter
    if (selectedFilter !== 'all') {
      switch (selectedFilter) {
        case 'recent':
          filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          break
        case 'favorites':
          filtered = filtered.filter(image => image.favorite)
          break
        default:
          filtered = filtered.filter(image => image.style === selectedFilter)
          break
      }
    }

    setFilteredImages(filtered)
  }

  const handleDeleteImage = async (imageId) => {
    try {
      await deleteImage(imageId, currentUser.uid)
      await loadUserImages()
      toast.success('Image deleted successfully')
    } catch (error) {
      console.error('Error deleting image:', error)
      toast.error('Failed to delete image')
    }
  }

  const downloadImage = (url, filename) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename || 'ai-generated-image.jpg'
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
          text: 'Generated with Imagify AI 🤖',
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

  const handleToggleFavorite = async (imageId) => {
    try {
      await toggleFavorite(imageId, currentUser.uid)
      await loadUserImages() // Reload to get updated favorite status
      toast.success('Favorite updated successfully')
    } catch (error) {
      console.error('Error toggling favorite:', error)
      toast.error('Failed to toggle favorite')
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Collection</h1>
        <p className="text-muted-foreground">
          Manage and organize your AI-generated images
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by prompt..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
            >
              {filter.name}
            </Button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          {filteredImages.length} of {savedImages.length} images
        </div>
      </div>

      {/* Images Grid */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-muted-foreground mb-4">
            {searchTerm || selectedFilter !== 'all' 
              ? 'No images match your search criteria'
              : 'No images in your collection yet'
            }
          </div>
          {!searchTerm && selectedFilter === 'all' && (
            <Button asChild>
              <a href="/generate">Start Creating</a>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <Card key={image.id} className="overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={image.url}
                    alt={image.prompt || 'Generated image'}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => downloadImage(image.url, image.filename)}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => shareImage(image.url)}
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleToggleFavorite(image.id)}
                      >
                        <Heart className={`h-3 w-3 ${image.favorite ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteImage(image.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {image.prompt || 'No prompt available'}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {image.style || 'Unknown style'}
                    </Badge>
                    {image.createdAt && (
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(image.createdAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 