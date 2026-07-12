import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaStar,
  FaHeart
} from "react-icons/fa";


const Favourite = () => {


  const navigate = useNavigate();


  const [favorites,setFavorites] = useState([]);



  useEffect(()=>{


    const saved =
    JSON.parse(localStorage.getItem("favorites")) || [];


    setFavorites(saved);


  },[]);





  const removeFavorite = (id)=>{


    const updated =
    favorites.filter(
      movie=>movie.id !== id
    );


    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );


    setFavorites(updated);


  };






return(

<div

className="
min-h-screen
bg-[#141414]
text-white
px-10
py-10
"

>


<button

onClick={()=>navigate(-1)}

className="
flex
items-center
gap-3
bg-white/20
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





<h1

className="
text-5xl
font-bold
mt-10
flex
items-center
gap-4
"

>

<FaHeart className="text-[#E50914]"/>

My Favourite Movies

</h1>






{

favorites.length === 0 ?

(

<div

className="
h-[50vh]
flex
items-center
justify-center
text-3xl
text-gray-400
"

>

No Favourite Movies Added

</div>

)


:


(

<div

className="
grid
grid-cols-2
md:grid-cols-4
gap-8
mt-10
"

>


{

favorites.map(movie=>(


<div

key={movie.id}

className="
bg-[#222]
rounded-xl
overflow-hidden
hover:-translate-y-2
transition
"

>


<img

src={movie.image}

alt={movie.title}

className="
w-full
h-80
object-cover
cursor-pointer
"

onClick={()=>navigate(
`/movie/${movie.id}`,
{
state:{movie}
}
)}

/>



<div className="p-4">


<h2

className="
text-xl
font-bold
"

>

{movie.title}

</h2>





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

{movie.rating}

</div>





<button

onClick={()=>removeFavorite(movie.id)}

className="
mt-4
w-full
bg-[#E50914]
py-2
rounded-lg
font-bold
hover:bg-[#B20710]
"

>

Remove

</button>



</div>



</div>


))


}


</div>


)


}



</div>


);


};


export default Favourite;