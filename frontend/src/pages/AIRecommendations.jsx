import { useState } from "react";

import {
  FaRobot,
  FaStar,
  FaMagic,
} from "react-icons/fa";


const movies = [

{
id:1,
title:"RRR",
genre:["Action","Drama"],
rating:"8.0",
image:
"https://image.tmdb.org/t/p/w500/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg",
match:"98%",
reason:"Because you love powerful action and emotional stories."
},

{
id:2,
title:"KGF Chapter 2",
genre:["Action","Crime"],
rating:"8.3",
image:
"https://image.tmdb.org/t/p/w500/khNVygolU0TxLIDWff5tQlAhZ23.jpg",
match:"96%",
reason:"Perfect for action lovers and intense characters."
},

{
id:3,
title:"Interstellar",
genre:["Sci-Fi","Adventure"],
rating:"8.7",
image:
"https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
match:"97%",
reason:"Recommended for your interest in space and science fiction."
},

{
id:4,
title:"Inception",
genre:["Sci-Fi","Thriller"],
rating:"8.8",
image:
"https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
match:"95%",
reason:"A mind-bending thriller selected by AI."
},

{
id:5,
title:"Avengers Endgame",
genre:["Action","Adventure"],
rating:"8.4",
image:
"https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
match:"99%",
reason:"A blockbuster recommendation for superhero fans."
},

{
id:6,
title:"Harry Potter",
genre:["Fantasy","Adventure"],
rating:"8.0",
image:
"https://image.tmdb.org/t/p/w500/hziiv14OpD73u9gAak4XDDfBKa2.jpg",
match:"94%",
reason:"A magical fantasy experience recommended for you."
}

];


const genres = [

"Action",
"Sci-Fi",
"Adventure",
"Fantasy",
"Thriller",
"Crime"

];



const AIRecommendations =()=>{


const [selectedGenre,setSelectedGenre] = useState("");

const [recommendations,setRecommendations] = useState([]);



const getRecommendations =()=>{


const result = movies.filter((movie)=>

movie.genre.includes(selectedGenre)

);


setRecommendations(result);


};



return(

<div

className="
min-h-screen
bg-[#141414]
text-white
px-10
pt-28
pb-10
"

>


{/* Header */}

<div

className="
text-center
mb-12
"

>


<div

className="
flex
justify-center
items-center
gap-4
"

>


<FaRobot

className="
text-[#E50914]
text-5xl
"

/>



<h1

className="
text-5xl
font-extrabold
"

>

AI Movie Recommendations

</h1>


</div>



<p

className="
mt-5
text-gray-400
text-lg
"

>

Tell AI your mood and discover movies made for you ✨

</p>


</div>
{/* Genre Selection */}

<div

className="
bg-[#222]
rounded-2xl
p-8
max-w-5xl
mx-auto
shadow-2xl
"

>


<h2

className="
text-2xl
font-bold
mb-6
flex
items-center
gap-3
"

>


<FaMagic

className="
text-[#E50914]
"

/>


Choose Your Favourite Genre


</h2>




<div

className="
flex
flex-wrap
gap-4
"

>


{

genres.map((genre)=>(


<button

key={genre}

onClick={()=>setSelectedGenre(genre)}

className={

`
px-6
py-3
rounded-full
font-semibold
transition

${
selectedGenre===genre

?

"bg-[#E50914]"

:

"bg-[#333] hover:bg-[#555]"

}

`

}

>


{genre}


</button>


))

}


</div>





<button

onClick={getRecommendations}

className="
mt-8
w-full
bg-[#E50914]
py-4
rounded-xl
font-bold
text-lg
hover:bg-[#B20710]
transition
"

>

🤖 Get AI Recommendations

</button>



</div>






{/* Recommendation Results */}

{

recommendations.length > 0 &&

(


<div

className="
mt-14
"

>


<h2

className="
text-4xl
font-bold
mb-8
"

>

✨ Recommended For You

</h2>





<div

className="
grid
grid-cols-1
md:grid-cols-3
gap-8
"

>


{

recommendations.map((movie)=>(


<div

key={movie.id}

className="
bg-[#222]
rounded-2xl
overflow-hidden
transition
duration-300
hover:-translate-y-3
hover:shadow-2xl
"

>


<img

src={movie.image}

alt={movie.title}

className="
w-full
h-96
object-cover
"

/>



<div

className="
p-5
"

>


<h3

className="
text-2xl
font-bold
"

>

{movie.title}

</h3>




<div

className="
flex
items-center
justify-between
mt-4
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

{movie.rating}


</div>




<span

className="
bg-green-600
px-3
py-1
rounded-full
font-bold
"

>

{movie.match}

</span>


</div>
<p

className="
mt-5
text-gray-400
leading-7
"

>

{movie.reason}

</p>



</div>



</div>


))


}



</div>



</div>


)


}



</div>


);

};


export default AIRecommendations;