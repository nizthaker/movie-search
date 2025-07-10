# Movie Search App

A React Native application for searching and browsing movies. The app provides a user-friendly interface to discover movies with features like search functionality, popular movies listing, sorting by name, release date, or ratings, and detailed movie views, all with support for dark and light modes powered by a context-based theming system.

<img width="366" alt="image" src="https://github.com/user-attachments/assets/7aff7c50-54f4-416d-adfe-faf8bb9a2410" /> <img width="368" alt="image" src="https://github.com/user-attachments/assets/c1703526-5b8f-4536-be49-47a90b731d1a" />




## Project Structure

```
api/                  # API-related files and requests
app/                  # Main application screens and navigation
components/           # Reusable UI components
├── MovieCard.tsx     # Movie card display component
└── SearchBar.tsx     # Search input component
context/              # Context providers for global state management
├── ThemeContext.tsx  # Theme context provider
├── theme.ts          # Theme definitions and utilities
hooks/                # Custom React hooks
└── useThemeColor.tsx # Hook for accessing theme colors
movie/                # Movie-related screens and routes
├── [id].tsx          # Dynamic route for individual movie details
├── _layout.tsx       # Layout configuration for movie screens
└── index.tsx         # Main movie listing screen
util/                 # Utility functions
├── date.ts           # Date formatting helpers
├── debounce.ts       # Debounce function implementation
└── util.ts           # Movie sorting utility

```

## Key Features

- **Movie Search:** Quickly find movies using the search bar.
- **Popular Movies Listing:** View a list of trending/popular movies on the home screen.
- **Movie Sorting:** Sort movies by Name, Release Date, or Ratings.
- **Movie Details:** Tap on a movie to see detailed information.
- **Dark & Light Theme:** Toggle between dark and light modes with context-based theming.

## Technologies Used

- React Native
- TypeScript
- TMDB API for movie data
- React Context API for theming

## Getting Started

### Prerequisites

- Node.js and npm/yarn installed
- React Native development environment set up (for iOS/Android)

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:nizthaker/movie-search.git
   cd movie-search
   ```

2. Install dependencies:
   ```bash
    yarn install
    # or
    npm install
   ```
3. Add your TMDB API key in a .env file at the root:
   ```bash
   TMDB_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
    npm start
    # or
    yarn start
   ```
5. Run the app on your desired platform (iOS/Android/web) using Expo or React Native CLI.
