import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import Explore from './pages/Explore.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import Certification from './pages/Certification.jsx';
import TestAPI from './pages/TestAPI.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/test",
      element: <TestAPI />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/explore",
      element: <Explore />,
    },
    {
      path: "/:id",
      element: <MovieDetails />,
    },
    {
      path: "/:id/certification",
      element: <Certification />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
