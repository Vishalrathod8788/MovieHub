import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { getMovieDetails } from '../utils/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin animation-delay-150"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-3xl font-bold text-white mb-4">Movie Not Found</h2>
          <p className="text-gray-400 mb-8">The movie you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750/1f2937/ffffff?text=No+Image';

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-400';
    if (rating >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Navbar />
      
      {/* Backdrop Hero Section */}
      {backdropUrl && (
        <div 
          className="relative h-96 bg-cover bg-center"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-transparent to-gray-900/80"></div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Movie Poster */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <img 
                src={imageUrl} 
                alt={movie.title}
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              
              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <Link 
                  to={`/${id}/certification`}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  View Certifications
                </Link>
                
                <button className="w-full glass-effect text-white py-3 px-6 rounded-full font-semibold transition-all duration-300 hover:bg-white/20 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Add to Favorites
                </button>
                
                <button className="w-full glass-effect text-white py-3 px-6 rounded-full font-semibold transition-all duration-300 hover:bg-white/20 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share Movie
                </button>
              </div>
            </div>
          </div>
          
          {/* Movie Details */}
          <div className="lg:w-2/3">
            <div className="glass-effect rounded-2xl p-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                {movie.title}
              </h1>
              
              {movie.tagline && (
                <p className="text-xl text-gray-300 italic mb-6">
                  "{movie.tagline}"
                </p>
              )}
              
              {/* Rating and Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className={`text-2xl font-bold ${getRatingColor(movie.vote_average)}`}>
                      {movie.vote_average?.toFixed(1) || 'N/A'}
                    </span>
                  </div>
                  <span className="text-gray-400">({movie.vote_count?.toLocaleString()} votes)</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-3">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span 
                        key={genre.id}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Overview */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-4">Overview</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {movie.overview || 'No overview available for this movie.'}
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Movie Info</h4>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-blue-400">{movie.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Original Language:</span>
                      <span className="text-blue-400">{movie.original_language?.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Budget:</span>
                      <span className="text-blue-400">{formatCurrency(movie.budget)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue:</span>
                      <span className="text-blue-400">{formatCurrency(movie.revenue)}</span>
                    </div>
                  </div>
                </div>
                
                {movie.production_companies && movie.production_companies.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Production</h4>
                    <div className="space-y-2">
                      {movie.production_companies.slice(0, 3).map((company) => (
                        <div key={company.id} className="text-gray-300">
                          {company.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;