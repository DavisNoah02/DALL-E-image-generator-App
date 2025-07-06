# DALL-E Image Generator App

Turn your imagination into stunning visuals with this AI-powered image generator! This web application allows users to generate images from text prompts using DALL-E-like models, manage their image collections, and enjoy a modern, responsive UI.

## Features

- **AI Image Generation**: Generate images from custom text prompts in various styles (Realistic, Anime, Abstract, Digital Art, Watercolor, etc.).
- **Prompt Suggestions**: Get creative with built-in prompt ideas.
- **Multiple Aspect Ratios**: Choose from square, portrait, landscape, and wide formats.
- **User Authentication**: Sign up, log in, and manage your account securely with email/password or Google authentication (powered by Firebase).
- **Image Collection**: View and manage your previously generated images.
- **Download & Share**: Download generated images or share them easily.
- **Responsive UI**: Built with React, Tailwind CSS, and shadcn/ui for a modern look and feel.
- **Notifications**: User-friendly toast notifications for actions and errors.

## Demo
Live Link : https://imagify-ai-noa.vercel.app/



## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/DALL-E-image-generator-App.git
   cd DALL-E-image-generator-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   - Create a `.env` file in the root directory.
   - Add your OpenAI API key and Firebase config:
     ```
     VITE_OPENAI_API_KEY=your_openai_api_key
     VITE_FIREBASE_API_KEY=your_firebase_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_firebase_app_id
     ```

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **(Optional) Set up the backend API:**
   - The app expects an API endpoint at `http://localhost:8000/api/generate/` for image generation.
   - You can use your own backend or a provided example (not included in this repo).

## Usage

- **Sign Up / Log In**: Create an account or log in with Google.
- **Generate Images**: Enter a prompt, select style and aspect ratio, and generate images.
- **View Collection**: Access your previously generated images.
- **Download/Share**: Download images or share them as you like.

## Project Structure

```
src/
  App.jsx                # Main app and routing
  components/            # UI and feature components
    ImageGenerator.jsx   # Main image generation logic
    Login.jsx            # Login form
    SignUp.jsx           # Registration form
    ForgotPassword.jsx   # Password reset
    ui/                  # Reusable UI components (button, card, input, etc.)
  contexts/
    AuthContext.jsx      # Authentication logic and context
  services/
    api.js               # API calls for image generation
    storage.js           # (Optional) Storage utilities
  firebase.js            # Firebase configuration
  config.js              # API key config (uses Vite env variables)
  assets/                # Images and icons
  index.css              # Tailwind and global styles
  main.jsx               # App entry point
```

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui, Radix UI, React Router, React Toastify
- **Authentication**: Firebase Auth (Email/Password, Google)
- **API**: Expects a backend for image generation (e.g., OpenAI DALL-E API)
- **State Management**: React Context API

## Environment Variables

| Variable                      | Description                |
|-------------------------------|----------------------------|
| VITE_OPENAI_API_KEY           | OpenAI API Key             |
| VITE_FIREBASE_API_KEY         | Firebase API Key           |
| VITE_FIREBASE_AUTH_DOMAIN     | Firebase Auth Domain       |
| VITE_FIREBASE_PROJECT_ID      | Firebase Project ID        |
| VITE_FIREBASE_STORAGE_BUCKET  | Firebase Storage Bucket    |
| VITE_FIREBASE_MESSAGING_SENDER_ID | Firebase Messaging Sender ID |
| VITE_FIREBASE_APP_ID          | Firebase App ID            |

## Customization

- **Image Styles & Ratios**: Modify `imageStyles` and `ratios` in `ImageGenerator.jsx` to add or change available options.
- **Prompt Suggestions**: Update the `promptSuggestions` array for new ideas.

## License

This project is licensed under the [Apache 2.0 License](LICENSE).
