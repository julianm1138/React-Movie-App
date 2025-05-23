import Rating from "../assets/Rating.svg";
import NoPoster from "../assets/No-Poster.png";

function MovieCard({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) {
  return (
    <div className=" movie-card flex justify-center items-center flex-col gap-y-2 hover:brightness-120">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : NoPoster
        }
        alt={title}
        className="text-white w-60"
      />
      <p className="mt-4 text-gradient text-md text-center">{title}</p>
      <div className="flex items-center gap-x-2 text-gradient">
        <div className="flex items-center">
          <img
            className="w-5 h-5 mr-1"
            src={Rating}
            loading="lazy"
            alt="star icon"
          />
          <p className="tracking-wider mr-2">{vote_average.toFixed(1)}</p>
          <span className="text-white">•</span>
        </div>
        <span>{release_date.split("-")[0]}</span>
        <span className="text-white">•</span>
        <p>{original_language}</p>
      </div>
    </div>
  );
}

export default MovieCard;
