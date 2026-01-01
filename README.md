# MovieHub - React Movie Database App

A modern movie database application built with React, Redux Toolkit, and Tailwind CSS. Browse popular movies, search for specific titles, and explore detailed movie information.

## Features

- **Home Page**: Display popular movies with an intuitive navbar
- **Search Functionality**: Search movies with query parameters (`/search?q=movie-name`)
- **Explore Page**: Browse movies by categories (Popular, Top Rated, Upcoming)
- **Movie Details**: Detailed information about each movie
- **Certifications**: View movie ratings and certificates by region
- **Responsive Design**: Mobile-friendly interface
- **React Router v6**: Client-side routing with dynamic URLs

## Tech Stack

- **React 18**: Modern React with hooks
- **Redux Toolkit**: State management
- **React Router v6**: Navigation and routing
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **TMDB API**: The Movie Database API for movie data

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MovieHub
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

4. Get your API key from [The Movie Database](https://www.themoviedb.org/settings/api)

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js       # Navigation bar
│   └── MovieCard.js    # Movie card component
├── pages/              # Page components
│   ├── Home.js         # Home page
│   ├── Search.js       # Search page
│   ├── Explore.js      # Explore page
│   ├── MovieDetails.js # Movie details page
│   └── Certification.js # Certification page
├── store/              # Redux store
│   ├── store.js        # Store configuration
│   └── movieSlice.js   # Movie state slice
├── utils/              # Utility functions
│   └── api.js          # API functions
└── App.jsx             # Main app component
```

## Routes

- `/` - Home page with popular movies
- `/search` - Search page
- `/search?q=query` - Search results
- `/explore` - Explore movies by category
- `/:id` - Movie details page
- `/:id/certification` - Movie certifications

## API Integration

The app uses The Movie Database (TMDB) API to fetch:
- Popular movies
- Top rated movies
- Upcoming movies
- Movie search results
- Detailed movie information
- Movie certifications by region

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
