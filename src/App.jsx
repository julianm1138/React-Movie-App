import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";
import "./App.css";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import heroImg from "./assets/hero-img.png";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchBox, setSearchBox] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const fetchMovies = async (query = "") => {
    setLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${BASE_URL}/search/movie?query=${encodeURI(query)}`
        : `${BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      setMovies(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      setErrorMessage(
        "An error occurred fetching movies... Please try again later"
      );
      console.error("error fetching movies", error);
    } finally {
      setLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  useDebounce(
    () => {
      setDebouncedSearch(searchBox);
    },
    600,
    [searchBox]
  );
  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src={heroImg} />
          <h1 className="text-gradient-2 text-6xl font-bold">
            Find the Latest
            <span className="text-gradient"> Movies</span>
          </h1>
          <Search searchTerm={searchBox} setSearchTerm={setSearchBox} />
        </header>
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2 className="text-4xl text-gradient font-bold text-center -mt-10">
              Currently Trending
            </h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id} className="relative ">
                  <p className="fancy-text">{index + 1}</p>
                  <img
                    src={movie.poster_url}
                    alt={`${movie.movie_title}`}
                    className="w-25"
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2 className="text-center text-gradient font-bold text-3xl">
            All Movies
          </h2>

          {loading ? (
            <div className="mb-12">
              <Spinner />
            </div>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="lg:grid lg:grid-cols-4 sm:grid sm:grid-cols-1">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
