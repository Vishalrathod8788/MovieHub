import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/300x450/1f2937/ffffff?text=No+Image';

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-500';
    if (rating >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Link to={`/${movie.id}`} className="group block">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group-hover:ring-2 group-hover:ring-blue-500 group-hover:ring-opacity-50">
        {/* Movie Poster */}
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={movie.title}
            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-black bg-opacity-80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className={`text-sm font-bold ${getRatingColor(movie.vote_average)}`}>
              {movie.vote_average?.toFixed(1) || 'N/A'}
            </span>
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {movie.title}
          </h3>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(movie.release_date)}
            </span>

            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {movie.vote_count || 0}
            </span>
          </div>

          {movie.overview && (
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {movie.overview}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;