import search from "../assets/search.svg";

function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center gap-3 w-full max-w-md">
        <img className="w-5" src={search} alt="search icon" />
        <input
          className="text-white p-2 rounded-lg w-full bg-gray-800"
          type="text"
          placeholder="Search thousands of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Search;
