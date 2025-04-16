function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex justify-center">
      <img src="src\assets\search.svg" alt="search icon" />
      <input
        className="text-white"
        type="text"
        placeholder="Search thousands of movies"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default Search;
