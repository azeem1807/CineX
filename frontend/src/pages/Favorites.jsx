import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

import {
  FaStar,
  FaHeart
} from "react-icons/fa";

import { genreMap } from "../utils/genreMap";


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



const Favourite = () => {


const navigate = useNavigate();


const {user}=useAuth();
const [favorites,setFavorites] = useState([]);


const favoriteKey = user
? `favorites_${user.id}`
:null;


useEffect(()=>{

if(user){

const saved =
JSON.parse(
localStorage.getItem(`favorites_${user.id}`)
) || [];


setFavorites(saved);

}

},[user]);
const removeFavorite = (id)=>{

const updated = favorites.filter(
(movie)=>movie.id !== id
);
setFavorites(updated);


if(favoriteKey){

localStorage.setItem(
favoriteKey,
JSON.stringify(updated)
);

}

};
return(


<div

className="
min-h-screen
bg-[#141414]
text-white
"

>

<Navbar
user={user}
/>
<div className="
max-w-7xl
mx-auto
px-6
md:px-10
pt-24
pb-10
">





<h1

className="
text-4xl
md:text-5xl
font-bold
mb-10
flex
items-center
gap-4
"

>

<FaHeart className="text-[#E50914]"/>

My Favourite Movies

</h1>





{

favorites.length === 0

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


<FaHeart

className="
text-6xl
text-[#E50914]
mx-auto
mb-6
"

/>


<h2 className="
text-4xl
font-bold
">

No Favourite Movies

</h2>


<p className="
text-gray-400
mt-4
text-lg
">

Add movies you love to your favourites.

</p>



<button

onClick={()=>navigate("/home")}

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


<div

className="
grid
grid-cols-2
md:grid-cols-3
lg:grid-cols-5
gap-6
"

>


{

favorites.map((movie)=>(


<div

key={movie.id}


className="
group
relative
bg-[#222]
rounded-xl
overflow-hidden
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


onClick={()=>navigate(`/movie/${movie.id}`)}


className="
w-full
h-80
object-cover
"

/>




<button

onClick={(e)=>{

e.stopPropagation();

removeFavorite(movie.id);

}}


className="
absolute
top-3
right-3
opacity-0
group-hover:opacity-100
bg-red-600
p-3
rounded-full
transition
hover:bg-red-700
"

>

<FaHeart size={14}/>

</button>





<div className="p-4">



<h2

className="
text-lg
font-bold
"

>

{movie.title}

</h2>




<p

className="
text-sm
text-gray-400
mt-1
"

>

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


export default Favourite;