import {
  FaPlay,
  FaPlus,
  FaStar,
} from "react-icons/fa";
import {useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { genreMap, genres } from "../utils/genreMap";


import {
  discoverMovies,
  getMovieTrailer
} from "../services/tmdb";

const languageMap = {
  en:"English",
  hi:"Hindi",
  te:"Telugu",
  ta:"Tamil",
  ml:"Malayalam",
  kn:"Kannada",
  ja:"Japanese",
  ko:"Korean",
};
const MovieCard = ({movie}) => {

const navigate = useNavigate();


return(

<div

onClick={()=>navigate(
`/movie/${movie.id}`,
{
state:{
movie
}
}
)}

className="
group
overflow-hidden
rounded-xl
bg-[#222]
cursor-pointer
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
h-80
w-full
object-cover
group-hover:scale-110
transition
"

/>



<div className="p-4">


<h3 className="
text-xl
font-bold
">

{movie.title}

</h3>
<p className="text-sm text-gray-400 mt-1">
{movie.release_date?.split("-")[0]}
</p>
<p className="
text-sm
text-gray-400
mt-1
">
🌐 {languageMap[movie.original_language] || movie.original_language}
</p>

<div className="
mt-2
flex
items-center
gap-2
text-yellow-400
">

<FaStar/>

{movie.vote_average?.toFixed(1)}

</div>
<p className="text-sm text-gray-400 mt-2">
{
movie.genre_ids
?.slice(0,2)
.map(id=>genreMap[id])
.join(" • ")
}
</p>

</div>


</div>

)

};



const MovieSkeleton = () => {


return(

<div
className="
bg-[#222]
rounded-xl
overflow-hidden
animate-pulse
"
>

<div
className="
h-80
w-full
bg-gray-700
"
/>


<div className="p-4">

<div
className="
h-5
bg-gray-700
rounded
w-3/4
mb-3
"
/>


<div
className="
h-4
bg-gray-700
rounded
w-1/3
"
/>


<div
className="
h-4
bg-gray-700
rounded
w-1/2
mt-3
"
/>


</div>


</div>

)

};

const MovieSection = ({title,data}) => {


return(

<section className="
px-10
py-8
">


<h2 className="
text-3xl
font-bold
mb-6
">

{title}

</h2>



<div className="
grid
grid-cols-2
md:grid-cols-4
gap-6
">


{

data.length === 0

?

Array(4)
.fill(0)
.map((_,index)=>(

<MovieSkeleton

key={index}

/>

))

:

data.map(movie=>(

<MovieCard

key={movie.id}

movie={movie}

/>

))

}



</div>



</section>

)

};
const Home = () => {

const navigate = useNavigate();
const {user}=useAuth();

const [trending,setTrending] = useState([]);

const [popular,setPopular] = useState([]);

const [topRated,setTopRated] = useState([]);
const [selectedGenre, setSelectedGenre] = useState("");


const [selectedLanguage, setSelectedLanguage] = useState("en");
const languages = [
  { name: "English", code: "en" },
  { name: "Hindi", code: "hi" },
  { name: "Telugu", code: "te" },
  { name: "Tamil", code: "ta" },
  { name: "Malayalam", code: "ml" },
  { name: "Kannada", code: "kn" },
  { name: "Japanese", code: "ja" },
  { name: "Korean", code: "ko" }
];

useEffect(()=>{

  if(user){

    const savedGenre = localStorage.getItem(
      `selectedGenre_${user.id}`
    );


    const savedLanguage = localStorage.getItem(
      `selectedLanguage_${user.id}`
    );


    if(savedGenre){
      setSelectedGenre(savedGenre);
    }


    if(savedLanguage){
      setSelectedLanguage(savedLanguage);
    }

  }

},[user]);

useEffect(()=>{


const loadMovies = async () => {

  const trendingMovies = await discoverMovies({
    genre: selectedGenre,
    language: selectedLanguage,
    sortBy: "popularity.desc",
  });

 const popularMovies = await discoverMovies({
  genre: selectedGenre,
  language: selectedLanguage,
  sortBy: "vote_count.desc",
});

  const topMovies = await discoverMovies({
    genre: selectedGenre,
    language: selectedLanguage,
    sortBy: "vote_average.desc",
  });

  setTrending(trendingMovies);
  setPopular(popularMovies);
  setTopRated(topMovies);

};
loadMovies();

},[selectedGenre, selectedLanguage]);

return(

<div className="
min-h-screen
bg-[#141414]
text-white
">

<Navbar
 user={user}
/>

<div className="px-10 py-5">

  <div className="flex items-center justify-between mb-5">

    <h2 className="text-lg font-semibold text-white">
      🎭 Browse by Genre
    </h2>

    <div className="flex items-center gap-3">

      <span className="text-sm text-gray-400">
        🌐 Preferred Language
      </span>

      <select
        value={selectedLanguage}
  onChange={(e)=>{

const value = e.target.value;

setSelectedLanguage(value);

if(user){
localStorage.setItem(
`selectedLanguage_${user.id}`,
value
);
}

}}
        className="
          bg-[#1c1c1c]
          text-white
          text-sm
          px-4
          py-2
          rounded-lg
          border
          border-red-500/20
          outline-none
          hover:border-red-500/50
          transition
        "
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>

    </div>

  </div>

  <div className="flex flex-wrap justify-center gap-3">

    {genres.map((genre) => (

  <button
    key={genre.id}
onClick={() => {

setSelectedGenre(genre.id);

if(user){

localStorage.setItem(
`selectedGenre_${user.id}`,
genre.id
);

}

}}
    className={`
      px-4
      py-1.5
      text-sm
      font-medium
      rounded-full
      border
      border-red-500/30
      transition-all
      duration-300
      ${
        selectedGenre === genre.id
          ? "bg-red-600/20 text-red-300 border-red-500"
          : "bg-white/5 text-gray-300 hover:bg-red-600/10 hover:border-red-500/50 hover:text-white"
      }
    `}
  >
    {genre.name}
  </button>

))}

  </div>

</div>
{/* HERO */}


<section

className="
min-h-screen
flex
items-center
px-10
bg-cover
bg-center
"

style={{

backgroundImage: trending[0] ?

`
linear-gradient(
to right,
#141414 25%,
transparent
),
url(
https://image.tmdb.org/t/p/original${trending[0]?.backdrop_path}
)
`

:
"none"

}}

>


<div className="
max-w-xl
pt-20
">


<h1 className="
text-6xl
font-bold
">

{trending[0]?.title}

</h1>



<p className="
mt-5
text-lg
text-gray-300
">

{trending[0]?.overview}

</p>





<div className="
mt-7
flex
gap-4
">


<button

onClick={async () => {
  const trailer = await getMovieTrailer(trending[0]?.id);

  if (!trailer) return;

  const url = `https://www.youtube.com/watch?v=${trailer.key}`;

  window.open(url, "_blank");
}}

className="
flex
items-center
gap-3
bg-[#E50914]
px-7
py-3
rounded-md
font-bold
hover:bg-[#B20710]
"

>

<FaPlay/>

Watch Trailer

</button>




<button

onClick={()=>navigate("/watchlist")}

className="
flex
items-center
gap-3
bg-white/20
px-7
py-3
rounded-md
font-bold
"

>

<FaPlus/>

My List


</button>


</div>



</div>


</section>


<MovieSection
title="Trending Now"
data={trending}
/>

<MovieSection
title="Popular Movies"
data={popular}
/>

<MovieSection
title="Top Rated"
data={topRated}
/>


</div>


)

};


export default Home;