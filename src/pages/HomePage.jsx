import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Palette, Download } from "lucide-react"
import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center py-20">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Imagify AI
          </h1>
        </div>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Transform your imagination into stunning visuals with our advanced AI image generator. Create, customize, and
          collect beautiful images from simple text prompts.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/generate">Start Creating</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
            <Link href="/collection">View Gallery</Link>
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card>
          <CardContent className="p-6 text-center">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">Generate high-quality images in seconds</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Palette className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Multiple Styles</h3>
            <p className="text-sm text-muted-foreground">Choose from various artistic styles and formats</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Download className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Easy Download</h3>
            <p className="text-sm text-muted-foreground">Save and manage your creations effortlessly</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">AI Powered</h3>
            <p className="text-sm text-muted-foreground">Advanced AI technology for stunning results</p>
          </CardContent>
        </Card>
      </div>

      {/* Example Prompts */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-8">Get Inspired</h2>
        <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
          {[
            "A futuristic cityscape at sunset",
            "Magical forest with glowing mushrooms",
            "Abstract geometric patterns in neon colors",
            "Vintage robot reading a book",
            "Underwater palace with coral gardens",
            "Space cat floating among stars",
          ].map((prompt, index) => (
            <Badge key={index} variant="secondary" className="text-sm py-2 px-4">
              {prompt}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
} 