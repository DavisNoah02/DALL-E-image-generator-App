import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <Sparkles className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Imagify AI
              </span>
            </Link>
          </div>
          
          {/* Auth content */}
          {children}
        </div>
      </div>

      {/* Right side - Hero image */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:bg-gradient-to-br lg:from-primary/10 lg:to-purple-600/10">
        <div className="text-center space-y-6 p-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Transform Your Ideas Into Art
            </h1>
            <p className="text-xl text-muted-foreground max-w-md">
              Create stunning AI-generated images from simple text prompts. 
              Bring your imagination to life with our advanced image generation technology.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-border/50"></div>
            <div className="aspect-square bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg border border-border/50"></div>
            <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-border/50"></div>
            <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg border border-border/50"></div>
          </div>
        </div>
      </div>
    </div>
  )
} 