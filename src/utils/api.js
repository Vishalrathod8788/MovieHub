const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const searchMovies = async (query) => {
  console.log('API_KEY:', API_KEY ? 'Present' : 'Missing');
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
  console.log('Search URL:', url);
  const response = await fetch(url);
  return handleResponse(response);
};

export const getMovieDetails = async (id) => {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
  console.log('Movie details URL:', url);
  const response = await fetch(url);
  return handleResponse(response);
};

export const getPopularMovies = async () => {
  console.log('API_KEY:', API_KEY ? 'Present' : 'Missing');
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
  console.log('Popular movies URL:', url);
  const response = await fetch(url);
  return handleResponse(response);
};

export const getTopRatedMovies = async () => {
  const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`;
  const response = await fetch(url);
  return handleResponse(response);
};

export const getUpcomingMovies = async () => {
  const url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`;
  const response = await fetch(url);
  return handleResponse(response);
};

export const getMovieCertifications = async (id) => {
  const url = `${BASE_URL}/movie/${id}/release_dates?api_key=${API_KEY}`;
  const response = await fetch(url);
  return handleResponse(response);
};