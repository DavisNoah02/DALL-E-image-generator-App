import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ThemeToggle({ className = '' }) {
  const [darkMode, setDarkMode] = useState(() =>
    typeof window !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : false
  )

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setDarkMode((prev) => !prev)}
    >
      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
} 