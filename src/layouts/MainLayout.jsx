import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Sparkles, 
  Image, 
  User, 
  LogOut, 
  Menu, 
  X,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const { currentUser, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Generate', href: '/generate', icon: Sparkles },
    { name: 'Collection', href: '/collection', icon: Image },
    { name: 'Profile', href: '/profile', icon: User },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-card border-r">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Imagify AI</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar - manual collapse/expand */}
      <div
        className={`hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:flex-col lg:bg-card lg:border-r transition-all duration-200 ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
        style={{ minHeight: '100vh' }}
      >
        {/* Collapse/Expand Button */}
        <div className={`flex items-center gap-2 p-4 border-b transition-all duration-200 ${sidebarCollapsed ? 'justify-center' : ''}`}>
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
          <Sparkles className="h-6 w-6 text-primary" />
          {!sidebarCollapsed && <span className="font-bold text-lg">Imagify AI</span>}
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
              >
                <Icon className="h-5 w-5" />
                {!sidebarCollapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>
        <div className={`p-4 border-t space-y-2 ${sidebarCollapsed ? 'flex flex-col items-center' : ''}`}>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start ${sidebarCollapsed ? 'justify-center' : ''}`}
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
            {!sidebarCollapsed && (darkMode ? 'Light Mode' : 'Dark Mode')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start text-destructive hover:text-destructive ${sidebarCollapsed ? 'justify-center' : ''}`}
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {!sidebarCollapsed && 'Logout'}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-200 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b bg-card">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-bold">Imagify AI</span>
          </div>
          <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Page content */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
} 