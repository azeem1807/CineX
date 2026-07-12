import { useNavigate } from "react-router-dom";

import {
  FaUserCircle,
  FaHeart,
  FaFilm,
  FaSignOutAlt,
  FaArrowLeft,
  FaEdit,
} from "react-icons/fa";


const Profile = () => {


const navigate = useNavigate();



const watchlist =
JSON.parse(localStorage.getItem("watchlist")) || [];


const favorites =
JSON.parse(localStorage.getItem("favorites")) || [];



const logout = () => {

localStorage.clear();

navigate("/");

};




return (

<div className="
min-h-screen
bg-[#141414]
text-white
px-6
py-8
">





{/* Back */}

<button

onClick={()=>navigate(-1)}

className="
flex
items-center
gap-3
bg-white/10
px-5
py-3
rounded-xl
hover:bg-[#E50914]
transition
"

>

<FaArrowLeft/>

Back

</button>







<div className="
max-w-5xl
mx-auto
mt-10
rounded-3xl
bg-[#1f1f1f]
shadow-2xl
border
border-[#333]
overflow-hidden
">






{/* Cover */}

<div className="
h-48
bg-gradient-to-r
from-[#E50914]
via-[#8b0000]
to-black
relative
">



<img
  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72"
  alt="profile"
  className="
  absolute
  left-1/2
  bottom-[-60px]
  transform
  -translate-x-1/2
  w-36
  h-36
  rounded-full
  border-8
  border-[#141414]
  object-cover
  "
/>


</div>









{/* Profile Details */}

<div className="
pt-20
pb-10
px-10
text-center
">



<h1 className="
text-4xl
font-extrabold
">

Jahnavi

</h1>



<p className="
mt-2
text-gray-400
">

jaanunemani@gmail.com

</p>





<button

className="
mt-5
flex
items-center
gap-3
mx-auto
bg-white/10
px-5
py-2
rounded-lg
hover:bg-white/20
transition
"

>

<FaEdit/>

Edit Profile

</button>





</div>









{/* Stats */}


<div className="
grid
md:grid-cols-2
gap-6
px-10
pb-10
">






<div className="
bg-[#292929]
rounded-2xl
p-6
flex
items-center
gap-5
hover:-translate-y-2
transition
">


<div className="
bg-[#E50914]
p-4
rounded-full
">

<FaFilm className="text-2xl"/>

</div>



<div>

<h2 className="
text-3xl
font-bold
">

{watchlist.length}

</h2>


<p className="
text-gray-400
">

My List Movies

</p>


</div>


</div>








<div className="
bg-[#292929]
rounded-2xl
p-6
flex
items-center
gap-5
hover:-translate-y-2
transition
">


<div className="
bg-red-600
p-4
rounded-full
">

<FaHeart className="text-2xl"/>

</div>



<div>

<h2 className="
text-3xl
font-bold
">

{favorites.length}

</h2>


<p className="
text-gray-400
">

Favorite Movies

</p>


</div>


</div>





</div>









{/* Actions */}


<div className="
flex
flex-col
md:flex-row
gap-5
px-10
pb-10
">





<button

onClick={()=>navigate("/watchlist")}

className="
flex-1
bg-[#E50914]
py-4
rounded-xl
font-bold
flex
justify-center
items-center
gap-3
hover:bg-[#B20710]
transition
"

>

<FaFilm/>

View My List

</button>








<button

onClick={()=>navigate("/favorites")}

className="
flex-1
bg-white/10
py-4
rounded-xl
font-bold
flex
justify-center
items-center
gap-3
hover:bg-white/20
transition
"

>

<FaHeart/>

Favorites

</button>








<button

onClick={logout}

className="
flex-1
bg-gray-700
py-4
rounded-xl
font-bold
flex
justify-center
items-center
gap-3
hover:bg-gray-600
transition
"

>

<FaSignOutAlt/>

Logout

</button>






</div>






</div>



</div>


);

};


export default Profile;