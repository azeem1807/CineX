
import {
  FaBell,
  FaFilm,
  FaRobot,
  FaHeart,
  FaTimes
} from "react-icons/fa";

import { useState } from "react";


const Notifications = () => {


const [notifications,setNotifications] = useState([

{
id:1,
icon:<FaFilm/>,
title:"New Movie Added",
message:"Avengers Endgame is now available on CineX."
},

{
id:2,
icon:<FaRobot/>,
title:"AI Recommendation",
message:"New movies are recommended based on your taste."
},

{
id:3,
icon:<FaHeart/>,
title:"Favourite Update",
message:"Your favourite movies list has been updated."
}

]);



const removeNotification=(id)=>{

setNotifications(

notifications.filter(

(item)=>item.id!==id

)

);

};



return(

<div

className="
min-h-screen
bg-[#141414]
text-white
px-10
pt-28
"

>


<div

className="
flex
items-center
gap-4
mb-10
"

>


<FaBell

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

Notifications

</h1>


</div>




{

notifications.length===0 ?

(

<div

className="
text-center
text-gray-400
text-2xl
mt-20
"

>

No New Notifications 🔔

</div>

)

:

(

<div

className="
max-w-4xl
space-y-5
"

>


{

notifications.map((notification)=>(


<div

key={notification.id}

className="
flex
items-center
justify-between
bg-[#222]
p-6
rounded-2xl
hover:bg-[#2d2d2d]
transition
"

>


<div

className="
flex
items-center
gap-5
"

>


<div

className="
text-[#E50914]
text-3xl
"

>

{notification.icon}

</div>



<div>


<h2

className="
text-xl
font-bold
"

>

{notification.title}

</h2>



<p

className="
text-gray-400
mt-2
"

>

{notification.message}

</p>


</div>


</div>





<button

onClick={()=>removeNotification(notification.id)}

className="
text-gray-400
hover:text-red-500
text-xl
"

>

<FaTimes/>

</button>



</div>


))


}



</div>


)

}


</div>

);


};


export default Notifications;