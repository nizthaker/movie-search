# Movie Search App

A React Native application for searching and browsing movies. The app provides a user-friendly interface to discover movies with features like search functionality and detailed movie views.

## Project Structure

```
api/                  # API-related files and requests
app/                  # Main application screens and navigation
components/           # Reusable UI components
├── MovieCard.tsx     # Movie card display component
└── SearchBar.tsx     # Search input component
movie/                # Movie-related screens and routes
├── [id].tsx          # Dynamic route for individual movie details
├── _layout.tsx       # Layout configuration for movie screens
└── index.tsx         # Main movie listing screen
util/                 # Utility functions
├── date.ts           # Date formatting helpers
└── debounce.ts       # Debounce function implementation

```

## Key Features

- **Movie Search:** Quickly find movies using the search bar.
- **Movie Listing:** Browse through a list of trending or searched movies.
- **Movie Details:** Tap on a movie to see detailed information.

## Technologies Used

- React Native
- TypeScript
- TMDB API for movie data

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
