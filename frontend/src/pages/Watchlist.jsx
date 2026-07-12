import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaStar } from "react-icons/fa";


const Watchlist = () => {


const navigate = useNavigate();



const watchlist =

JSON.parse(localStorage.getItem("watchlist")) || [];






return (


<div className="
min-h-screen
bg-[#141414]
text-white
px-10
py-8
">






<button

onClick={()=>navigate(-1)}

className="
flex
items-center
gap-3
bg-black/70
px-5
py-3
rounded-lg
hover:bg-[#E50914]
transition
mb-8
">

<FaArrowLeft/>

Back

</button>








<h1 className="
text-5xl
font-bold
mb-10
">

My Watchlist

</h1>








{

watchlist.length === 0

?

(

<div className="
h-96
flex
items-center
justify-center
">

<h2 className="
text-3xl
font-bold
text-gray-400
">

Your Watchlist is Empty

</h2>


</div>

)



:

(


<div className="
grid
grid-cols-2
md:grid-cols-4
gap-8
">


{

watchlist.map((movie)=>(



<div

key={movie.id}

onClick={()=>navigate(`/movie/${movie.id}`,{

state:{
movie:movie
}

})}

className="
bg-[#222]
rounded-xl
overflow-hidden
cursor-pointer
transition
hover:-translate-y-2
hover:shadow-2xl
">


<img

src={movie.image}

alt={movie.title}

className="
w-full
h-80
object-cover
"

/>





<div className="
p-4
">


<h2 className="
text-xl
font-bold
">

{movie.title}

</h2>





<div className="
flex
items-center
gap-2
text-yellow-400
mt-3
">

<FaStar/>

{movie.rating}

</div>




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


export default Watchlist;