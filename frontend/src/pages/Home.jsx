import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaPlay,
  FaPlus,
  FaStar,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";


const movies = [

{
id:1,
title:"RRR",
rating:"8.0",
year:"2022",
runtime:"3h 7m",

genre:[
"Action",
"Drama",
"History"
],

image:
"https://image.tmdb.org/t/p/w500/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg",

banner:
"https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",

description:
"A fearless story of two revolutionaries who fight against British rule.",

cast:[
"N.T. Rama Rao Jr.",
"Ram Charan",
"Alia Bhatt"
]

},


{
id:2,
title:"KGF Chapter 2",
rating:"8.3",
year:"2022",
runtime:"2h 48m",

genre:[
"Action",
"Crime"
],

image:
"https://image.tmdb.org/t/p/w500/khNVygolU0TxLIDWff5tQlAhZ23.jpg",

banner:
"https://image.tmdb.org/t/p/original/khNVygolU0TxLIDWff5tQlAhZ23.jpg",

description:
"Rocky continues his journey to rule Kolar Gold Fields.",

cast:[
"Yash",
"Sanjay Dutt",
"Raveena Tandon"
]

},


{
id:3,
title:"Jawan",
rating:"7.8",
year:"2023",
runtime:"2h 49m",

genre:[
"Action",
"Thriller"
],

image:
"https://image.tmdb.org/t/p/w500/jFt1gS4BGHlK8xt76Y81Alp4dbt.jpg",

banner:
"https://image.tmdb.org/t/p/original/jFt1gS4BGHlK8xt76Y81Alp4dbt.jpg",

description:
"A man with a mysterious past fights injustice.",

cast:[
"Shah Rukh Khan",
"Nayanthara"
]

},


{
id:4,
title:"Spider-Man No Way Home",
rating:"8.2",
year:"2021",
runtime:"2h 28m",

genre:[
"Action",
"Adventure"
],

image:
"https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",

banner:
"https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",

description:
"Spider-Man faces villains from different universes.",

cast:[
"Tom Holland",
"Zendaya"
]

},{
id:5,
title:"Interstellar",
rating:"8.7",
year:"2014",
runtime:"2h 49m",

genre:[
"Sci-Fi",
"Adventure"
],

image:
"https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",

banner:
"https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",

description:
"Explorers travel through space to find a new home for humanity.",

cast:[
"Matthew McConaughey",
"Anne Hathaway"
]

},


{
id:6,
title:"Inception",
rating:"8.8",
year:"2010",
runtime:"2h 28m",

genre:[
"Action",
"Sci-Fi"
],

image:
"https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",

banner:
"https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",

description:
"A thief enters dreams and steals secrets.",

cast:[
"Leonardo DiCaprio",
"Tom Hardy"
]

},


{
id:7,
title:"The Batman",
rating:"7.8",
year:"2022",
runtime:"2h 56m",

genre:[
"Action",
"Crime"
],

image:
"https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",

banner:
"https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",

description:
"Batman investigates corruption in Gotham.",

cast:[
"Robert Pattinson",
"Zoë Kravitz"
]

},


{
id:8,
title:"Doctor Strange",
rating:"7.5",
year:"2016",
runtime:"1h 55m",

genre:[
"Fantasy",
"Action"
],

image:
"https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",

banner:
"https://image.tmdb.org/t/p/original/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",

description:
"A surgeon discovers magical powers.",

cast:[
"Benedict Cumberbatch",
"Rachel McAdams"
]

}

];





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

src={movie.image}

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



<div className="
mt-2
flex
items-center
gap-2
text-yellow-400
">

<FaStar/>

{movie.rating}

</div>


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

};const Home = () => {

const navigate = useNavigate();


return(

<div className="
min-h-screen
bg-[#141414]
text-white
">



{/* NAVBAR */}



<nav className="
fixed
top-0
z-50
w-full
flex
items-center
justify-between
bg-black/80
px-10
py-5
backdrop-blur-lg
">


<h1 className="
text-4xl
font-extrabold
text-[#E50914]
">

Cine

<span className="text-white">
X
</span>

</h1>





<div className="
hidden
md:flex
gap-8
text-gray-300
">


<span>
Home
</span>


<span>
Movies
</span>


<span>
Series
</span>



<span

onClick={()=>navigate("/watchlist")}

className="
cursor-pointer
hover:text-white
">

My List

</span>


<span

onClick={()=>navigate("/favorites")}

className="
cursor-pointer
hover:text-[#E50914]
">

Favorites

</span>
<span
onClick={()=>navigate("/ai-recommendations")}
className="
cursor-pointer
hover:text-white
"
>
AI Picks
</span>


</div>







<div className="
flex
items-center
gap-5
">


<div

onClick={()=>navigate("/search")}

className="
flex
items-center
bg-[#333]
rounded-lg
px-4
py-2
cursor-pointer
">


<FaSearch className="text-gray-400"/>


<input

placeholder="Search"

readOnly

className="
ml-3
w-28
bg-transparent
outline-none
"

/>


</div>





<FaBell

onClick={()=>navigate("/notifications")}

className="
text-xl
cursor-pointer
hover:text-[#E50914]
transition
"

/>



<FaUserCircle

onClick={()=>navigate("/profile")}

className="
text-3xl
cursor-pointer
hover:text-[#E50914]
"

/>


</div>



</nav>







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

backgroundImage:

`
linear-gradient(
to right,
#141414 25%,
transparent
),
url(
https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg
)
`

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

Avengers Endgame

</h1>



<p className="
mt-5
text-lg
text-gray-300
">

Experience movies, series and blockbuster entertainment with CineX.

</p>





<div className="
mt-7
flex
gap-4
">


<button

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

Watch Now


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

data={movies.slice(0,4)}

/>




<MovieSection

title="Popular Movies"

data={movies.slice(4,8)}

/>



</div>


)

};


export default Home;