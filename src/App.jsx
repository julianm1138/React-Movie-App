import { useState } from "react";
import "./App.css";
import Search from "./components/Search";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main>
      <header>
        <img src="src\assets\hero-img.png" />
        <h1 className="text-5xl font-bold pb-4">
          Find <span className="text-gradient">Movies</span> You'll Enjoy
        </h1>
      </header>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </main>
  );
}

export default App;
