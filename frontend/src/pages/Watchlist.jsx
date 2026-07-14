import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaStar, FaTrash } from "react-icons/fa";
import { genreMap } from "../utils/genreMap";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

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
const Watchlist = () => {


const navigate = useNavigate();


const {user}=useAuth();

const watchlistKey = user
? `watchlist_${user.id}`
:null;

const [movies,setMovies] = useState([]);
useEffect(()=>{

  if(user){

    const savedMovies =
      JSON.parse(
        localStorage.getItem(`watchlist_${user.id}`)
      ) || [];

    setMovies(savedMovies);

  }

},[user]);
const removeMovie = (id)=>{

const updated = movies.filter(
(movie)=>movie.id !== id
);


setMovies(updated);


if(watchlistKey){

localStorage.setItem(
watchlistKey,
JSON.stringify(updated)
);

}
};





return (


<div
className="
min-h-screen
bg-[#141414]
text-white
">
<Navbar
 user={user}
/>
<div className="max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-10">




<h1 className="
text-4xl
md:text-5xl
font-bold
mb-10
">

My Watchlist 🎬

</h1>




{

movies.length === 0

?

(

<div
className="
flex
items-center
justify-center
h-[65vh]
"
>

<div className="text-center">

  <h2 className="text-4xl font-bold">
    Your Watchlist is Empty
  </h2>

  <p className="text-gray-400 mt-4 text-lg">
    Save your favorite movies to watch later.
  </p>

  <button
    onClick={() => navigate("/home")}
    className="
    mt-8
    bg-[#E50914]
    hover:bg-red-700
    px-8
    py-3
    rounded-lg
    font-semibold
    transition
    "
  >
    Browse Movies
  </button>

</div>


</div>

)



:

(


<div className="
grid
grid-cols-2
md:grid-cols-3
lg:grid-cols-5
gap-6
">


{

movies.map((movie)=>(



<div

key={movie.id}

className="
group
relative
bg-zinc-900
border
border-white/5
rounded-xl
overflow-hidden
cursor-pointer
transition
duration-300
hover:-translate-y-2
hover:shadow-2xl
"

onClick={() => navigate(`/movie/${movie.id}`)}

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

<button

onClick={(e)=>{

e.stopPropagation();

removeMovie(movie.id);

}}

className="
absolute
top-3
right-3
bg-red-600
p-3
rounded-full
opacity-0
group-hover:opacity-100
transition-all
duration-300
hover:scale-110
shadow-lg
"

>

<FaTrash size={14}/>

</button>
<div className="
p-4
">


<h2
className="
text-lg
font-bold
"
>
{movie.title}
</h2>


<p className="
text-sm
text-gray-400
mt-1
">
{movie.release_date?.split("-")[0]}
</p>


<div
className="
flex
items-center
gap-2
text-yellow-400
mt-2
"
>

<FaStar/>

{movie.vote_average?.toFixed(1)}

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


<p
className="
text-sm
text-gray-400
mt-1
"
>

🌐 {languageMap[movie.original_language] || "Unknown"}

</p>

</div>





</div>



))

}



</div>


)

}

</div>
</div>


);


};

export default Watchlist;