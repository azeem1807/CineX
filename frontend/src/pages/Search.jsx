import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaStar,
} from "react-icons/fa";

import NotFound from "./NotFound";

const movies = [
  {
    id: 1,
    title: "RRR",
    rating: "8.0",
    image:
      "https://image.tmdb.org/t/p/w500/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg",
  },
  {
    id: 2,
    title: "KGF Chapter 2",
    rating: "8.3",
    image:
      "https://image.tmdb.org/t/p/w500/khNVygolU0TxLIDWff5tQlAhZ23.jpg",
  },
  {
    id: 3,
    title: "Jawan",
    rating: "7.8",
    image:
      "https://image.tmdb.org/t/p/w500/jFt1gS4BGHlK8xt76Y81Alp4dbt.jpg",
  },
  {
    id: 4,
    title: "Spider-Man No Way Home",
    rating: "8.2",
    image:
      "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  },
  {
    id: 5,
    title: "Interstellar",
    rating: "8.7",
    image:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: 6,
    title: "Inception",
    rating: "8.8",
    image:
      "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  },
  {
    id: 7,
    title: "The Batman",
    rating: "7.8",
    image:
      "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    id: 8,
    title: "Doctor Strange",
    rating: "7.5",
    image:
      "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
  },
  {
    id: 9,
    title: "Oppenheimer",
    rating: "8.6",
    image:
      "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
  },
  {
    id: 10,
    title: "Joker",
    rating: "8.1",
    image:
      "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  },
  {
    id: 11,
    title: "Avengers Endgame",
    rating: "8.4",
    image:
      "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
  },
  {
    id: 12,
    title: "Harry Potter",
    rating: "8.0",
    image:
      "https://image.tmdb.org/t/p/w500/hziiv14OpD73u9gAak4XDDfBKa2.jpg",
  },
];

const Search = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#141414] text-white px-10 pt-28">
      <h1 className="text-5xl font-bold mb-10">
        Search Movies
      </h1>

      <div className="flex items-center bg-[#333] rounded-lg px-5 py-3 max-w-xl">
        <FaSearch className="text-gray-400" />

        <input
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none ml-4 w-full text-lg"
        />
      </div>

      {/* Show Not Found */}
      {search !== "" && filteredMovies.length === 0 ? (
        <NotFound />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="bg-[#222] rounded-xl overflow-hidden cursor-pointer transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-bold">
                  {movie.title}
                </h2>

                <div className="flex items-center gap-2 mt-3 text-yellow-400">
                  <FaStar />
                  {movie.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;