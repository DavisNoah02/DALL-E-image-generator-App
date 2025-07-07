export const IMAGE_STYLES = [
  { id: 'realistic', name: 'Realistic', icon: 'Image' },
  { id: 'anime', name: 'Anime', icon: 'Sparkles' },
  { id: 'abstract', name: 'Abstract', icon: 'Grid3x3' },
  { id: 'digital', name: 'Digital Art', icon: 'Zap' },
  { id: 'watercolor', name: 'Watercolor', icon: 'Award' }
]

export const ASPECT_RATIOS = [
  { id: 'square', name: '1:1', value: 'aspect-square' },
  { id: 'portrait', name: '2:3', value: 'aspect-[2/3]' },
  { id: 'landscape', name: '3:2', value: 'aspect-[3/2]' },
  { id: 'wide', name: '16:9', value: 'aspect-video' }
]

export const PROMPT_SUGGESTIONS = [
  "A serene mountain lake at sunset with reflections",
  "Futuristic cyberpunk city with neon lights",
  "Cute animal friends having a tea party",
  "Abstract geometric patterns in vibrant colors",
  "Underwater scene with bioluminescent creatures",
  "Vintage robot reading a book in a library",
  "Space cat floating among stars and planets",
  "Magical forest with glowing mushrooms and fireflies"
]

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  GENERATE: '/generate',
  COLLECTION: '/collection',
  PROFILE: '/profile'
}

export const API_ENDPOINTS = {
  GENERATE_IMAGES: '/api/generate',
  GET_USER_IMAGES: '/api/images',
  DELETE_IMAGE: '/api/images',
  UPDATE_IMAGE: '/api/images'
}

export const STORAGE_KEYS = {
  USER_PREFERENCES: 'user_preferences',
  RECENT_PROMPTS: 'recent_prompts',
  FAVORITE_STYLES: 'favorite_styles'
}

export const TOAST_MESSAGES = {
  GENERATION_SUCCESS: 'Images generated successfully!',
  GENERATION_ERROR: 'Failed to generate images. Please try again.',
  LOGIN_SUCCESS: 'Login successful!',
  LOGIN_ERROR: 'Invalid email or password.',
  SIGNUP_SUCCESS: 'Registration successful! Please login.',
  SIGNUP_ERROR: 'Registration failed. Please try again.',
  LOGOUT_SUCCESS: 'Logged out successfully',
  IMAGE_DOWNLOADED: 'Image downloaded!',
  LINK_COPIED: 'Link copied to clipboard!',
  IMAGE_DELETED: 'Image deleted successfully',
  DELETE_ERROR: 'Failed to delete image'
} 