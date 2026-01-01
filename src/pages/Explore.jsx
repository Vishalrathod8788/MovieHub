import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import MovieCard from '../components/MovieCard.jsx';
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../utils/api';

const Explore = () => {
  const [activeFilter, setActiveFilter] = useState('popular');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const filters = [
    { 
      key: 'popular', 
      label: 'Popular', 
      fetch: getPopularMovies,
      icon: '🔥',
      description: 'Most popular movies right now'
    },
    { 
      key: 'top_rated', 
      label: 'Top Rated', 
      fetch: getTopRatedMovies,
      icon: '⭐',
      description: 'Highest rated movies of all time'
    },
    { 
      key: 'upcoming', 
      label: 'Upcoming', 
      fetch: getUpcomingMovies,
      icon: '🎬',
      description: 'Coming soon to theaters'
    },
  ];

  useEffect(() => {
    fetchMovies(activeFilter);
  }, [activeFilter]);

  const fetchMovies = async (filterKey) => {
    setLoading(true);
    try {
      const filter = filters.find(f => f.key === filterKey);
      const data = await filter.fetch();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const activeFilterData = filters.find(f => f.key === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Explore Movies
            </h1>
            <p className="text-gray-300 text-lg">
              Discover movies by categories and find your next favorite
            </p>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`group relative px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === filter.key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{filter.icon}</span>
                  <span>{filter.label}</span>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {filter.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Movies Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center">
              <span className="text-4xl mr-3">{activeFilterData?.icon}</span>
              {activeFilterData?.label} Movies
            </h2>
            <p className="text-gray-400 text-lg">
              {activeFilterData?.description}
            </p>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-gray-400">Sort by:</span>
            <select className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
              <option value="release_date">Release Date</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin animation-delay-150"></div>
            </div>
          </div>
        ) : movies.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Load More Movies
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Movies Found</h3>
            <p className="text-gray-400">Unable to load {activeFilterData?.label.toLowerCase()} movies at the moment.</p>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                10M+
              </div>
              <div className="text-gray-300">Movies & TV Shows</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                500K+
              </div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-pink-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                1M+
              </div>
              <div className="text-gray-300">Reviews & Ratings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;