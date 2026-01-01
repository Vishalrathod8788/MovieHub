import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { getMovieCertifications, getMovieDetails } from '../utils/api';

const Certification = () => {
  const { id } = useParams();
  const [certifications, setCertifications] = useState([]);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [certData, movieData] = await Promise.all([
          getMovieCertifications(id),
          getMovieDetails(id)
        ]);
        setCertifications(certData.results || []);
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getReleaseTypeLabel = (type) => {
    const types = {
      1: { label: 'Premiere', icon: '🎆', color: 'bg-purple-500' },
      2: { label: 'Theatrical (Limited)', icon: '🎭', color: 'bg-blue-500' },
      3: { label: 'Theatrical', icon: '🎬', color: 'bg-green-500' },
      4: { label: 'Digital', icon: '📱', color: 'bg-indigo-500' },
      5: { label: 'Physical', icon: '💿', color: 'bg-gray-500' },
      6: { label: 'TV', icon: '📺', color: 'bg-red-500' }
    };
    return types[type] || { label: 'Unknown', icon: '❓', color: 'bg-gray-400' };
  };

  const getCertificationColor = (cert) => {
    if (!cert) return 'bg-gray-500';
    const rating = cert.toLowerCase();
    if (['g', 'u', 'all'].includes(rating)) return 'bg-green-500';
    if (['pg', 'pg-13', '12', '12a'].includes(rating)) return 'bg-yellow-500';
    if (['15', '16', 'r'].includes(rating)) return 'bg-orange-500';
    if (['18', 'nc-17', 'x'].includes(rating)) return 'bg-red-500';
    return 'bg-blue-500';
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <Link 
            to={`/${id}`}
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Movie Details
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Movie Certifications
              </h1>
              {movie && (
                <p className="text-gray-300 text-lg">
                  Ratings and certificates for "{movie.title}"
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {certifications.length > 0 ? (
          <div className="space-y-8">
            {certifications.map((cert, index) => (
              <div key={index} className="glass-effect rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">
                      {cert.iso_3166_1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {getCountryName(cert.iso_3166_1)}
                    </h3>
                    <p className="text-gray-400">
                      {cert.release_dates?.length || 0} release{cert.release_dates?.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                
                {cert.release_dates?.map((release, idx) => {
                  const releaseType = getReleaseTypeLabel(release.type);
                  return (
                    <div key={idx} className="bg-black/20 rounded-xl p-6 mb-4 last:mb-0 border border-white/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Certification */}
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold text-white ${getCertificationColor(release.certification)}`}>
                              {release.certification || 'Not Rated'}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Certification</p>
                            <p className="text-white font-medium">
                              {release.certification || 'Not Rated'}
                            </p>
                          </div>
                        </div>
                        
                        {/* Release Date */}
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Release Date</p>
                            <p className="text-white font-medium">
                              {release.release_date ? new Date(release.release_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              }) : 'N/A'}
                            </p>
                          </div>
                        </div>
                        
                        {/* Release Type */}
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className={`w-10 h-10 ${releaseType.color} rounded-full flex items-center justify-center`}>
                              <span className="text-white text-lg">{releaseType.icon}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Release Type</p>
                            <p className="text-white font-medium">{releaseType.label}</p>
                          </div>
                        </div>
                        
                        {/* Language */}
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                              </svg>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Language</p>
                            <p className="text-white font-medium">
                              {release.iso_639_1?.toUpperCase() || 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {release.note && (
                        <div className="mt-4 p-4 bg-blue-600/10 border border-blue-500/20 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                              <p className="text-sm text-gray-400 mb-1">Additional Note</p>
                              <p className="text-blue-300">{release.note}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Certification Data</h3>
            <p className="text-gray-400 mb-8">
              Certification information is not available for this movie.
            </p>
            <Link to={`/${id}`} className="btn-primary">
              Back to Movie Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get country name from ISO code
const getCountryName = (isoCode) => {
  const countries = {
    'US': 'United States',
    'GB': 'United Kingdom', 
    'CA': 'Canada',
    'AU': 'Australia',
    'DE': 'Germany',
    'FR': 'France',
    'IT': 'Italy',
    'ES': 'Spain',
    'JP': 'Japan',
    'KR': 'South Korea',
    'IN': 'India',
    'BR': 'Brazil',
    'MX': 'Mexico',
    'RU': 'Russia',
    'CN': 'China'
  };
  return countries[isoCode] || isoCode;
};

export default Certification;