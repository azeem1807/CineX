import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  FaArrowLeft,
  FaPlus,
  FaHeart,
  FaStar,
  FaClock
} from "react-icons/fa";


const MovieDetails = () => {


const navigate = useNavigate();

const location = useLocation();


const movie = location.state?.movie;





const [added,setAdded] = useState(()=>{

const saved =
JSON.parse(localStorage.getItem("watchlist")) || [];


return saved.some(
(item)=>item.id === movie?.id
);

});





const [favorite,setFavorite] = useState(()=>{


const saved =
JSON.parse(localStorage.getItem("favorites")) || [];


return saved.some(
(item)=>item.id === movie?.id
);


});







const addToWatchlist =()=>{


if(!movie) return;


const oldList =
JSON.parse(localStorage.getItem("watchlist")) || [];



const exists =
oldList.some(
(item)=>item.id === movie.id
);



if(!exists){


localStorage.setItem(

"watchlist",

JSON.stringify(
[
...oldList,
movie
]
)

);


}


setAdded(true);


};









const addFavorite =()=>{


if(!movie) return;


const oldFavorites =
JSON.parse(localStorage.getItem("favorites")) || [];



const exists =
oldFavorites.some(
(item)=>item.id === movie.id
);



if(!exists){


localStorage.setItem(

"favorites",

JSON.stringify(
[
...oldFavorites,
movie
]
)

);


}


setFavorite(true);


};







if(!movie){


return(

<div className="
min-h-screen
bg-[#141414]
text-white
flex
items-center
justify-center
">


<h1 className="
text-4xl
font-bold
">

Movie Not Found

</h1>


</div>

);

}







return(


<div className="
min-h-screen
bg-[#141414]
text-white
">





<button

onClick={()=>navigate(-1)}

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

<FaArrowLeft/>

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

backgroundImage:

`
linear-gradient(
to right,
#141414 20%,
#141414dd 55%,
transparent
),
url(${movie.banner})
`

}}

>



<div className="
flex
gap-10
items-center
max-w-6xl
">





<img

src={movie.image}

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



<h1 className="
text-6xl
font-extrabold
">

{movie.title}

</h1>





<div className="
flex
gap-6
mt-6
items-center
text-gray-300
">


<span>
{movie.year}
</span>


<span className="
flex
items-center
gap-2
">

<FaClock/>

{movie.runtime}

</span>



<span className="
flex
items-center
gap-2
text-yellow-400
">

<FaStar/>

{movie.rating}

</span>


</div>








<div className="
flex
gap-3
mt-6
flex-wrap
">


{

movie.genre.map((g,index)=>(


<span

key={index}

className="
bg-[#E50914]
px-4
py-2
rounded-full
"

>

{g}

</span>


))

}


</div>








<p className="
mt-7
text-lg
text-gray-300
leading-8
">

{movie.description}

</p>







<div className="
flex
gap-5
mt-8
">





<button

onClick={addToWatchlist}

className="
flex
items-center
gap-3
bg-white/20
px-7
py-3
rounded-lg
font-bold
hover:bg-white/30
"

>

<FaPlus/>

{

added
?
"Added"
:
"My List"

}


</button>








<button

onClick={addFavorite}

className="
flex
items-center
gap-3
bg-[#E50914]
px-7
py-3
rounded-lg
font-bold
hover:bg-[#B20710]
"

>

<FaHeart/>

{

favorite
?
"Added"
:
"Favourite"

}


</button>





</div>





</div>


</div>



</section>









<section className="
px-10
py-10
">


<h2 className="
text-3xl
font-bold
mb-6
">

Cast

</h2>





<div className="
flex
flex-wrap
gap-5
">


{

movie.cast.map((actor,index)=>(


<div

key={index}

className="
bg-[#222]
px-6
py-4
rounded-xl
"

>

{actor}

</div>


))

}



</div>


</section>





</div>


);


};


export default MovieDetails;