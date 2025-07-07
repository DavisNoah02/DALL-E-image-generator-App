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
            <Link to="/generate">Start Creating</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
            <Link to="/collection">View Gallery</Link>
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

      {/* How it Works Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <span className="text-4xl">📝</span>
              <h4 className="font-semibold mt-4 mb-2">1. Enter Your Prompt</h4>
              <p className="text-sm text-muted-foreground">Describe your idea in detail. The more creative, the better!</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <span className="text-4xl">🎨</span>
              <h4 className="font-semibold mt-4 mb-2">2. Choose Style & Generate</h4>
              <p className="text-sm text-muted-foreground">Pick an art style and aspect ratio, then let AI do the magic.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <span className="text-4xl">📥</span>
              <h4 className="font-semibold mt-4 mb-2">3. Download & Share</h4>
              <p className="text-sm text-muted-foreground">Save your favorite images or share them with friends instantly.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Example Prompts */}
      <div className="text-center mb-20">
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

      {/* Testimonials Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="italic mb-4">“Imagify AI turned my wildest ideas into beautiful art in seconds. The styles are amazing!”</p>
              <div className="font-semibold">— Alex P.</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <p className="italic mb-4">“The prompt suggestions are so creative. I love sharing my gallery with friends!”</p>
              <div className="font-semibold">— Priya S.</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <p className="italic mb-4">“Super easy to use and the results are stunning. Highly recommend for any creative!”</p>
              <div className="font-semibold">— Jordan W.</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Is Imagify AI free to use?</h4>
            <p className="text-muted-foreground">Yes! You can generate and download images for free. Some advanced features may require an account.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Can I use the images commercially?</h4>
            <p className="text-muted-foreground">You can use generated images for personal and non-commercial projects. For commercial use, please check our terms of service.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">What styles are available?</h4>
            <p className="text-muted-foreground">We offer a variety of styles including Realistic, Anime, Abstract, Digital Art, and Watercolor.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">How do I save or share my images?</h4>
            <p className="text-muted-foreground">After generating, you can download images or share them directly to social media from your gallery.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
