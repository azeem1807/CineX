import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

import {
  FaSearch,
  FaStar,
  FaTimes,
  FaFire,
  FaHistory,
} from "react-icons/fa";

import {
  searchMovies,
  getTrendingMovies,
} from "../services/tmdb";

const Search = () => {
  const navigate = useNavigate();
const { user } = useAuth();

const searchHistoryKey = user
  ? `searchHistory_${user.id}`
  : null;

  const [query, setQuery] = useState("");

  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

const [trending, setTrending] = useState([]);

useEffect(() => {

  if (searchHistoryKey) {
  const saved =
    JSON.parse(localStorage.getItem(searchHistoryKey)) || [];

  setHistory(saved);
}


}, [searchHistoryKey]);

useEffect(() => {
  const timer = setTimeout(() => {
    if (query.trim() !== "") {
      loadMovies();
    } else {
      setMovies([]);
    }
  }, 500);

  return () => clearTimeout(timer);
}, [query, searchHistoryKey]);


  const saveHistory = (text) => {

  if (!text.trim()) return;

 if (!searchHistoryKey) return;

let oldHistory =
JSON.parse(localStorage.getItem(searchHistoryKey)) || [];

  oldHistory = oldHistory.filter(
    (item) => item !== text
  );

  oldHistory.unshift(text);

  oldHistory = oldHistory.slice(0, 8);

 localStorage.setItem(
searchHistoryKey,
JSON.stringify(oldHistory)
);

  setHistory(oldHistory);

};
  const loadMovies = async () => {
    setLoading(true);

    try {
      const data = await searchMovies(query);

      setMovies(data);

if (data.length > 0) {

  saveHistory(query);

}
    } catch (err) {
      console.log(err);
      setMovies([]);
    }

    setLoading(false);
  };
  useEffect(() => {

  const loadTrending = async () => {

    try {

      const data = await getTrendingMovies();

      setTrending(data.slice(0, 8));

    } catch (error) {

      console.log(error);

    }

  };

  loadTrending();

}, []);

  return (
    <div className="min-h-screen bg-[#141414] text-white">

     <Navbar user={user} />

      <div className="pt-28 px-8 md:px-16">

        <h1 className="text-5xl font-bold">
          Search Movies
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          Search over thousands of movies from TMDB
        </p>

        <div className="mt-10 relative max-w-2xl">

          <FaSearch
            className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-gray-400
            text-xl
            "
          />

          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
            w-full
            bg-[#202020]
            border
            border-[#333]
            rounded-full
            py-5
            pl-14
            pr-6
            text-lg
            outline-none
            focus:border-red-600
            transition
            "
          />
{query && (

<button

onClick={() => {

setQuery("");

setMovies([]);

}}

className="
absolute
right-5
top-1/2
-translate-y-1/2
text-gray-400
hover:text-white
transition
text-xl
"

>

<FaTimes />

</button>

)}
        </div>
         {query === "" && (

<div className="mt-14 grid md:grid-cols-2 gap-12">

{/* Recent */}

<div>

<div className="flex items-center justify-between">

<h2 className="flex items-center gap-3 text-2xl font-bold">

<FaHistory className="text-red-600" />

Recent Searches

</h2>

{

history.length > 0 && (

<button

onClick={() => {

if (searchHistoryKey) {
  localStorage.removeItem(searchHistoryKey);
}

setHistory([]);

}}

className="
text-red-500
hover:text-red-400
font-medium
transition
"

>

Clear All

</button>

)

}

</div>

<div className="mt-6 flex flex-wrap gap-3">

{

history.length === 0 ?

(

<p className="text-gray-500">

No recent searches

</p>

)

:

history.map((item,index)=>(

<button

key={index}

onClick={()=>setQuery(item)}

className="

bg-[#202020]

hover:bg-[#E50914]

transition

px-5

py-3

rounded-full

"

>

{item}

</button>

))

}

</div>

</div>

{/* Trending */}

<div>

<h2 className="flex items-center gap-3 text-2xl font-bold">

<FaFire className="text-red-600"/>

Trending Today

</h2>

<div className="mt-6 flex flex-wrap gap-3">

{

trending.map((movie)=>(

<button

key={movie.id}

onClick={()=>navigate(`/movie/${movie.id}`)}

className="

bg-[#202020]

hover:bg-[#E50914]

transition

px-5

py-3

rounded-full

"

>

{movie.title}

</button>

))

}

</div>

</div>

</div>

)}
        {loading && (
          <div className="mt-16 flex justify-center">
            <Loader />
          </div>
        )}
      {!loading && query !== "" && movies.length === 0 && (
  <div className="text-center mt-20">

    <h2 className="text-3xl font-bold">
      No Movies Found
    </h2>

    <p className="text-gray-400 mt-4">
      Try searching with another movie name.
    </p>

  </div>
)}

{!loading && movies.length > 0 && (

<div
className="
grid
grid-cols-2
md:grid-cols-4
lg:grid-cols-5
gap-7
mt-14
"
>

{movies.map((movie)=>(

<div

key={movie.id}

onClick={()=>navigate(`/movie/${movie.id}`)}

className="
group
cursor-pointer
overflow-hidden
rounded-2xl
bg-[#1b1b1b]
transition
duration-300
hover:-translate-y-2
hover:shadow-2xl
"

>

<img

src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}

alt={movie.title}

className="
w-full
h-80
object-cover
group-hover:scale-110
transition
duration-500
"

/>

<div className="p-4">

<h2
className="
font-bold
text-lg
line-clamp-1
"
>

{movie.title}

</h2>

<div
className="
flex
items-center
justify-between
mt-3
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

<FaStar/>

{movie.vote_average?.toFixed(1)}

</div>

<span className="text-gray-400">

{movie.release_date?.slice(0,4)}

</span>

</div>

</div>

</div>

))}

</div>

)}
      </div>

    </div>
  );
};

export default Search;