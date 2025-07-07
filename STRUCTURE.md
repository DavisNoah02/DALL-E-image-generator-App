# Imagify AI - Project Structure

This document outlines the restructured project architecture for the Imagify AI DALL-E-style image generator.

## 📁 Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── shared/          # Shared components (ProtectedRoute, etc.)
│   └── features/        # Feature-specific components
│       ├── auth/        # Authentication components
│       ├── image-generation/  # Image generation components
│       └── gallery/     # Gallery/collection components
├── pages/               # Page components
│   ├── auth/           # Authentication pages
│   │   ├── LoginPage.jsx
│   │   ├── SignUpPage.jsx
│   │   └── ForgotPasswordPage.jsx
│   ├── HomePage.jsx
│   ├── GeneratePage.jsx
│   ├── CollectionPage.jsx
│   └── ProfilePage.jsx
├── layouts/             # Layout components
│   ├── MainLayout.jsx   # Main app layout with sidebar
│   └── AuthLayout.jsx   # Authentication layout
├── contexts/            # React contexts
│   └── AuthContext.jsx  # Authentication context
├── hooks/               # Custom React hooks
│   ├── useLocalStorage.js
│   └── useDebounce.js
├── utils/               # Utility functions
│   └── index.js         # Common utilities
├── constants/           # Application constants
│   └── index.js         # App-wide constants
├── services/            # API and external services
│   ├── api.js           # API functions
│   └── storage.js       # Storage utilities
├── types/               # TypeScript types (future)
├── assets/              # Static assets
└── config/              # Configuration files
    ├── firebase.js
    └── constants.js
```

## 🏗️ Architecture Overview

### Feature-Based Organization
The project follows a feature-based structure where related functionality is grouped together:

- **Authentication**: Login, signup, password reset
- **Image Generation**: Prompt input, style selection, generation
- **Gallery**: Image collection, search, filters
- **Profile**: User settings, statistics

### Separation of Concerns
- **Pages**: Handle routing and page-level logic
- **Components**: Reusable UI elements
- **Layouts**: Page structure and navigation
- **Services**: External API calls and data management
- **Utils**: Helper functions and utilities
- **Hooks**: Custom React hooks for state management

## 🚀 Key Features

### Authentication System
- Email/password authentication
- Google OAuth integration
- Password reset functionality
- Protected routes

### Image Generation
- Text-to-image generation
- Multiple style options
- Aspect ratio selection
- Batch generation (1-4 images)
- Prompt suggestions

### Image Management
- User image collection
- Search and filtering
- Download and sharing
- Favorites system
- Image deletion

### User Experience
- Responsive design
- Dark mode support
- Toast notifications
- Loading states
- Error handling

## 🔧 Development Guidelines

### File Naming
- Use PascalCase for components: `ImageGenerator.jsx`
- Use camelCase for utilities: `formatDate.js`
- Use kebab-case for CSS classes: `image-card`

### Import Organization
```javascript
// 1. React imports
import { useState, useEffect } from 'react'

// 2. Third-party libraries
import { toast } from 'react-toastify'

// 3. Internal components
import { Button } from '@/components/ui/button'

// 4. Utilities and constants
import { formatDate } from '@/utils'
import { ROUTES } from '@/constants'

// 5. Relative imports
import './Component.css'
```

### Component Structure
```javascript
// 1. Imports
// 2. Component definition
// 3. State and hooks
// 4. Event handlers
// 5. Effects
// 6. Render
```

### State Management
- Use React Context for global state (auth)
- Use local state for component-specific data
- Use localStorage for user preferences
- Use custom hooks for reusable logic

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🔗 Path Aliases

The project uses path aliases for cleaner imports:

- `@/` → `src/`
- `@components/` → `src/components/`

Example usage:
```javascript
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { formatDate } from '@/utils'
```

## 📱 Responsive Design

The application is built with mobile-first responsive design:

- **Mobile**: Single column layout, collapsible sidebar
- **Tablet**: Two-column layout, expanded sidebar
- **Desktop**: Multi-column layout, persistent sidebar

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library built on Radix UI
- **Custom CSS**: Component-specific styles when needed

## 🔐 Security

- Protected routes for authenticated users
- Input validation and sanitization
- Secure API calls with proper error handling
- Firebase security rules for data protection

## 🚀 Future Enhancements

- TypeScript migration
- Advanced image editing features
- Social sharing integration
- User collaboration features
- Advanced analytics and insights
- Mobile app development 