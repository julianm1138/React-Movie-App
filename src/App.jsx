import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import "./App.css";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

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

      if (data.Response === "false") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovies([]);
        return;
      }

      setMovies(data.results || []);
    } catch (error) {
      setErrorMessage(
        "An error occurred fetching movies... Please try again later"
      );
      console.error("error fetching movies", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearch);
  }, [debouncedSearch]);

  useDebounce(
    () => {
      setDebouncedSearch(searchBox);
    },
    600,
    [searchBox]
  );

  return (
    <main>
      <div>
        <header className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-4">
          <img src="src/assets/hero-img.png" />
          <h1 className="text-gradient-2 text-6xl font-bold">
            Find the Latest
            <span className="text-gradient"> Movies</span>
          </h1>
          <Search searchTerm={searchBox} setSearchTerm={setSearchBox} />
        </header>

        <section className="max-w-[80%] flex flex-col justify-center items-center mx-auto min-h-[600px]">
          <h2 className="my-10 p-5 text-4xl text-gradient text-center">
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
