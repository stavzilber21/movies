# Movie App

A movie browsing app that allows users to view popular movies, now playing movies, and favorite movies. The app uses Redux for state management, Redux Saga for side effects, and React Router for navigation.

## Features:
- Displays popular movies, movies that are currently playing, and user's favorite movies.
- Allows users to navigate using keyboard shortcuts.
- Fetches movie data from an external API (The Movie Database API).
- Error handling for API requests.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`.

## Keyboard Navigation

Use the following keyboard shortcuts to navigate within the app:

### Filter Navigation:
- **Arrow Left**: Move to the previous filter (e.g., from "Popular" to "Airing Now").
- **Arrow Right**: Move to the next filter (e.g., from "Airing Now" to "My Favorites").
- **Enter**: Select the current filter and switch to the movie list.
- **Escape**: Go back to the filter bar from the movie list.

### Movie List Navigation:
- **Arrow Up**: Move up to the previous movie in the list.
- **Arrow Down**: Move down to the next movie in the list.
- **Enter**: Select the currently highlighted movie and view its details.
- **Escape**: Return to the filter bar from the movie list.

## Built With:
- React
- Redux
- Redux Saga
- React Router
- The Movie Database API 
