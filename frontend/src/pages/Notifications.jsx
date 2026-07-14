import {
  FaBell,
  FaFilm,
  FaRobot,
  FaHeart,
  FaBookmark,
  FaTimes
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const Notifications = () => {
const navigate = useNavigate();
const [notifications,setNotifications] = useState([]);

const getIcon = (type)=>{

if(type==="movie")
return <FaFilm/>;

if(type==="ai")
return <FaRobot/>;

if(type==="favorite")
return <FaHeart/>;

if(type==="watchlist")
return <FaBookmark/>;

return <FaBell/>;

};

useEffect(()=>{

const fetchNotifications = async()=>{

try{

const res = await axios.get(
"http://localhost:5000/api/notifications"
);

setNotifications(res.data);

}
catch(error){

console.log(error);

}

};

fetchNotifications();

},[]);





const removeNotification=(id)=>{

setNotifications(
notifications.filter(
(item)=>item._id!==id
)
);

};


return(

<div className="
min-h-screen
bg-[#141414]
text-white
px-10
pt-28
">
<button
onClick={()=>navigate(-1)}
className="
mb-6
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
flex
items-center
gap-4
mb-10
">

<FaBell
className="
text-[#E50914]
text-5xl
"
/>

<h1 className="
text-5xl
font-extrabold
">

Notifications

</h1>

</div>


{

notifications.length===0 ?

(

<div className="
text-center
text-gray-400
text-2xl
mt-20
">

No New Notifications 🔔

</div>

)

:

(

<div className="
max-w-4xl
space-y-5
">

{

notifications.map((notification)=>(

<div
key={notification._id}
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

<div className="
flex
items-center
gap-5
">

<div className="
text-[#E50914]
text-3xl
">

{getIcon(notification.type)}

</div>


<div>

<h2 className="
text-xl
font-bold
">

{notification.title}

</h2>


<p className="
text-gray-400
mt-2
">

{notification.message}

</p>

</div>

</div>


<button
onClick={()=>removeNotification(notification._id)}
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