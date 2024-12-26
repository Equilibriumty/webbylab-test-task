# Movies Management App

A React Native mobile application built with Expo for managing movies. This app allows users to create, search, and manage their movie collection.

## 🚀 Tech Stack

- **Framework:** [Expo](https://expo.dev/) (v52)
- **Language:** TypeScript
- **UI Framework:** React Native
- **Navigation:** Expo Router
- **State Management:** React Query (TanStack Query)
- **Form Handling:** React Hook Form with Zod validation
- **Styling:** Native components with Expo styling
- **Testing:** Jest
- **Linting:** Biome

## 📁 Project Structure

```
.
├── app/                    # Main application screens and navigation
│   ├── (authenticated)     # Protected routes requiring authentication
│   │   ├── (tabs)         # Bottom tab navigation screens
│   │   └── movie          # Individual movie routes
│   └── login.tsx          # Authentication screen
├── components/            # Reusable UI components
├── lib/                   # Core utilities and business logic
│   ├── api/              # API integration layer
│   └── validations/      # Form validation schemas
├── assets/               # Static assets (images, fonts)
├── constants/            # App-wide constants
├── hooks/                # Custom React hooks
└── scripts/             # Utility scripts
```

## 🛠️ Setup and Installation

1. **Prerequisites**
   - Node.js (LTS version)
   - npm or yarn
   - iOS Simulator or Android Emulator
   - Expo Go app for physical device testing

2. **Installation**
   ```bash
   # Clone the repository
   git clone [repository-url]

   # Install dependencies
   npm install

   # Start the development server
   npm start
   ```

3. **Running on Devices**
   - iOS: `npm run ios`
   - Android: `npm run android`
   - Web: `npm run web`

## 🏗️ Architecture

### Navigation
The app uses Expo Router for file-based navigation with the following structure:
- Public routes (login)
- Protected routes (authenticated)
  - Tab-based navigation for main features
  - Stack navigation for detailed views

### State Management
- React Query for server state management
- Secure storage for authentication tokens
- Form state handled by React Hook Form

### API Integration
- Axios for HTTP requests
- Centralized API client configuration
- Type-safe API responses

### UI/UX
- Native components enhanced with Expo libraries
- Responsive layouts
- Haptic feedback integration
- Blur effects and modern UI elements

## 📱 Features

- User authentication
- Movie creation and management
- Movie search functionality
- Responsive and modern UI
- Form validation
- Secure data storage

## 🔧 Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run on web browser
- `npm run lint` - Run linting
- `npm test` - Run tests
- `npm run reset-project` - Reset project to initial state

## 📝 Environment Variables

Create a `.env` file in the root directory with the following variables:
```
EXPO_PUBLIC_API_URL=your_api_url_here
```

