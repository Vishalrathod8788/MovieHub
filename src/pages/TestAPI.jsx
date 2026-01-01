import { useState } from 'react';

const TestAPI = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    console.log('API Key:', API_KEY);

    try {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
      console.log('URL:', url);

      const response = await fetch(url);
      console.log('Response status:', response.status);

      const data = await response.json();
      console.log('Data:', data);

      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">API Test</h1>
      <button
        onClick={testAPI}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        disabled={loading}
      >
        {loading ? 'Testing...' : 'Test API'}
      </button>

      {result && (
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default TestAPI;