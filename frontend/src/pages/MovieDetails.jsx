import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { genreMap } from "../utils/genreMap";
import { useAuth } from "../context/AuthContext";

import {
  getMovieDetails,
  getMovieCast,
  getMovieTrailer,
  getMovieStatus,
  getWatchProviders,
  getSimilarMovies,
} from "../services/tmdb";

import {
  FaArrowLeft,
  FaPlus,
  FaHeart,
  FaStar,
  FaClock,
  FaPlay,
} from "react-icons/fa";
const languageMap = {
  en: "English",
  hi: "Hindi",
  te: "Telugu",
  ta: "Tamil",
  ml: "Malayalam",
  kn: "Kannada",
  ja: "Japanese",
  ko: "Korean",
};

const MovieDetails = () => {
  const navigate = useNavigate();
const { user } = useAuth();
  const { id } = useParams();





  const watchlistKey = user
  ? `watchlist_${user.id}`
  : null;


const favoriteKey = user
  ? `favorites_${user.id}`
  : null;

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [status, setStatus] = useState(null);

  const [providers, setProviders] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const loadMovie = async () => {
      const details = await getMovieDetails(id);

      const actors = await getMovieCast(id);

      const trailerData = await getMovieTrailer(id);

      const movieStatus = await getMovieStatus(id);

      const ott = await getWatchProviders(id);

      const similarMovies = await getSimilarMovies(id);

      setMovie(details);
      const watchlist =
JSON.parse(
localStorage.getItem(watchlistKey)
) || [];


const favorites =
JSON.parse(
localStorage.getItem(favoriteKey)
) || [];


setAdded(
watchlist.some(
(item)=>item.id === details.id
)
);


setFavorite(
favorites.some(
(item)=>item.id === details.id
)
);

      setCast(actors.slice(0, 10));

      setTrailer(trailerData);
      setStatus(movieStatus);

      setProviders(ott);
      setSimilar(similarMovies.slice(0, 8));
    };

    loadMovie();
  }, [id]);

const [added,setAdded] = useState(false);
const [favorite,setFavorite] = useState(false);

 const addToWatchlist = () => {

if (!movie || !user) return;


  const oldList =
    JSON.parse(
      localStorage.getItem(watchlistKey)
    ) || [];


  const exists =
    oldList.some(
      (item)=>item.id === movie.id
    );


  if(!exists){

    localStorage.setItem(
      watchlistKey,
      JSON.stringify([
        ...oldList,
        movie
      ])
    );

  }


  setAdded(true);

};

  const addFavorite = () => {

if (!movie || !user) return;


  const oldFavorites =
    JSON.parse(
      localStorage.getItem(favoriteKey)
    ) || [];


  const exists =
    oldFavorites.some(
      (item)=>item.id === movie.id
    );


  if(!exists){

    localStorage.setItem(
      favoriteKey,
      JSON.stringify([
        ...oldFavorites,
        movie
      ])
    );

  }


  setFavorite(true);

};

  if (!movie) {
    return (
      <div
        className="
min-h-screen
bg-[#141414]
text-white
flex
items-center
justify-center
"
      >
        <div
className="
relative
w-16
h-16
"
>

<div
className="
absolute
inset-0
rounded-full
border-4
border-red-500/30
"
>
</div>


<div
className="
absolute
inset-0
rounded-full
border-4
border-red-600
border-t-transparent
animate-spin
shadow-lg
shadow-red-600/50
"
>
</div>


</div>
      </div>
    );
  }

  return (
    <div
      className="
min-h-screen
bg-[#141414]
text-white
"
    >
      <button
        onClick={() => navigate(-1)}
        className="
fixed
top-6
left-6
z-50
flex
items-center
gap-3
bg-black/70
px-5
py-3
rounded-lg
hover:bg-[#E50914]
transition
"
      >
        <FaArrowLeft />
        Back
      </button>

      <section
        className="
min-h-screen
pt-24
px-10
flex
items-center
bg-cover
bg-center
"
        style={{
          backgroundImage: `
linear-gradient(
to right,
#141414 20%,
#141414dd 55%,
transparent
),
url(https://image.tmdb.org/t/p/original${movie.backdrop_path})
`,
        }}
      >
        <div
          className="
flex
gap-10
items-center
max-w-6xl
"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="
hidden
md:block
w-72
h-[430px]
rounded-2xl
object-cover
shadow-2xl
"
          />

          <div className="max-w-xl">
            <h1
              className="
text-6xl
font-extrabold
"
            >
              {movie.title}
            </h1>

            <div
              className="
flex
gap-6
mt-6
items-center
text-gray-300
"
            >
              <span>{movie.release_date?.slice(0, 4)}</span>

              <span
                className="
flex
items-center
gap-2
"
              >
                <FaClock />

                {movie.runtime ? `${movie.runtime} min` : "N/A"}
              </span>

              <div
                className="
flex
items-center
gap-3
"
              >
                <div
                  className="
flex
items-center
gap-2
text-yellow-400
"
                >
                  <FaStar />

                  <span className="text-white font-bold">
                    {movie.vote_average?.toFixed(1)}
                  </span>
                </div>

                <div
                  className="
w-24
h-2
bg-gray-700
rounded-full
overflow-hidden
"
                >
                  <div
                    className="
h-full
bg-yellow-400
rounded-full
"
                    style={{
                      width: `${movie.vote_average * 10}%`,
                    }}
                  />
                </div>
              </div>
              <span
                className="
text-green-400
font-bold
"
              >
                {status?.status === "Released"
                  ? "✅ Released"
                  : "⏳ " + status?.status}
              </span>
            </div>

            <div
              className="
flex
gap-3
mt-6
flex-wrap
"
            >
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="
bg-[#E50914]
px-4
py-2
rounded-full
"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <p
              className="
mt-7
text-lg
text-gray-300
leading-8
"
            >
              {movie.overview}
            </p>

            {
providers?.flatrate && (

<div className="mt-8">

<h3
className="
text-2xl
font-bold
mb-4
"
>
Available On
</h3>


<div
className="
flex
gap-5
items-center
flex-wrap
"
>

{
providers.flatrate.map((ott)=>(

<div

key={ott.provider_id}

className="
flex
flex-col
items-center
gap-2
"
>

<img

src={
`https://image.tmdb.org/t/p/w200${ott.logo_path}`
}

alt={ott.provider_name}

title={ott.provider_name}

className="
w-14
h-14
rounded-xl
object-cover
"
/>


<span
className="
text-xs
text-gray-400
text-center
"
>

{ott.provider_name}

</span>


</div>

))

}

</div>


</div>

)
}

            <div
              className="
flex
flex-wrap
gap-3
mt-8
"
            >
              {/* Watch Trailer */}

              <button
                onClick={() => {
                  if (trailer) {
                   window.open(
`https://www.youtube.com/watch?v=${trailer.key}`,
"_blank",
"noopener,noreferrer"
);
                  }
                }}
                className="
group
flex
items-center
gap-2
bg-gradient-to-r
from-red-600
to-red-800
px-5
py-2.5
rounded-lg
text-sm
font-semibold
shadow-md
shadow-red-600/30
hover:scale-105
transition
duration-300
"
              >
                <FaPlay
                  size={14}
                  className="
group-hover:scale-110
transition
"
                />
                Watch Trailer
              </button>

              {/* Watchlist */}

              <button
                onClick={addToWatchlist}
                className="
flex
items-center
gap-2
bg-white/10
backdrop-blur-md
border
border-white/20
px-5
py-2.5
rounded-lg
text-sm
font-semibold
hover:bg-white/20
hover:scale-105
transition
duration-300
"
              >
                <FaPlus size={14} />

                {added ? "Added" : "My List"}
              </button>

              {/* Favourite */}

              <button
                onClick={addFavorite}
                className={`

flex
items-center
gap-2
px-5
py-2.5
rounded-lg
text-sm
font-semibold
border
transition
duration-300
hover:scale-105

${
  favorite
    ? "bg-red-600 border-red-600"
    : "bg-transparent border-red-500 text-red-400"
}

`}
              >
                <FaHeart size={14} />

                {favorite ? "Liked" : "Favourite"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="
px-10
py-10
"
      >
        <h2
          className="
text-3xl
font-bold
mb-6
"
        >
          Cast
        </h2>

        <div
          className="
flex
flex-wrap
gap-5
"
        >
          <div
            className="
grid
grid-cols-2
md:grid-cols-5
gap-6
"
          >
            {cast.map((actor) => (
              <div
                key={actor.id}
                className="
bg-[#222]
rounded-xl
overflow-hidden
hover:-translate-y-2
transition
duration-300
"
              >
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                      : "https://via.placeholder.com/300"
                  }
                  className="
w-full
h-56
object-cover
"
                />

                <div className="p-4">
                  <h3
                    className="
font-bold
"
                  >
                    {actor.name}
                  </h3>

                  <p
                    className="
text-sm
text-gray-400
mt-1
"
                  >
                    {actor.character}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="
px-10
py-10
"
      >
        <h2
          className="
text-3xl
font-bold
mb-6
"
        >
          You May Also Like
        </h2>

        <div
          className="
grid
grid-cols-2
md:grid-cols-4
gap-6
"
        >
          {similar.map((movie) => (
            <div
              key={movie.id}
              onClick={() => {
                navigate(`/movie/${movie.id}`);
                window.scrollTo(0, 0);
              }}
              className="
bg-[#222]
rounded-xl
overflow-hidden
cursor-pointer
hover:-translate-y-2
transition
"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="
h-80
w-full
object-cover
"
              />

              <div className="p-4">

<h3
className="
font-bold
text-lg
"
>
{movie.title}
</h3>


<p
className="
text-sm
text-gray-400
mt-1
"
>
{movie.release_date?.split("-")[0]}
</p>
<p
className="
text-sm
text-gray-400
mt-2
"
>

🌐 {languageMap[movie.original_language] || "Unknown"}

</p>


<div
className="
mt-2
flex
items-center
gap-2
text-yellow-400
"
>

<FaStar/>

<span>
{movie.vote_average?.toFixed(1)}
</span>

</div>



<p
className="
text-sm
text-gray-400
mt-2
"
>

{
movie.genre_ids
?.slice(0,2)
.map(id=>genreMap[id])
.join(" • ")
}

</p>





</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MovieDetails;
