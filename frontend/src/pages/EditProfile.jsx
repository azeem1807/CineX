
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";


const EditProfile = () => {

const navigate = useNavigate();


const existingUser =
JSON.parse(localStorage.getItem("user")) || {};



const [name,setName] = useState(
  existingUser.name || ""
);


const [profilePic,setProfilePic] = useState(
  existingUser.profilePic || ""
);

const [preview,setPreview] = useState(
  existingUser.profilePic || ""
);
const handleImageChange = (e)=>{

const file = e.target.files[0];

if(file){

const imageUrl = URL.createObjectURL(file);

setPreview(imageUrl);

setProfilePic(imageUrl);

}

};

const saveProfile = () => {


const updatedUser = {

...existingUser,

name,
profilePic

};



localStorage.setItem(
"user",
JSON.stringify(updatedUser)
);



navigate("/profile");


};



return (

<div className="
min-h-screen
bg-[#141414]
text-white
">


<Navbar user={existingUser}/>


<div className="
max-w-3xl
mx-auto
pt-28
px-6
">


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
mt-10
bg-[#1f1f1f]
rounded-3xl
p-10
border
border-[#333]
">


<h1 className="
text-3xl
font-bold
mb-8
">

Edit Profile

</h1>




<div className="
flex
justify-center
mb-8
">


<img

src={
preview ||
"https://cdn-icons-png.flaticon.com/512/149/149071.png"
}

className="
w-32
h-32
rounded-full
object-cover
border-4
border-[#E50914]
"

/>


</div>




<label className="
block
mb-2
text-gray-400
">

Name

</label>


<input

value={name}

onChange={(e)=>setName(e.target.value)}

className="
w-full
bg-[#292929]
p-4
rounded-xl
outline-none
mb-6
"

/>

<label className="
block
mt-4
bg-white/10
px-5
py-4
rounded-xl
text-center
cursor-pointer
hover:bg-white/20
transition
font-semibold
border
border-white/10
">
<FaUpload className="inline mr-2"/>
Choose Profile Image


<input

type="file"

accept="image/*"

onChange={handleImageChange}

className="hidden"

/>


</label>

<button

onClick={saveProfile}

className="
w-full
mt-6
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

<FaSave/>

Save Changes

</button>



</div>


</div>


</div>

);


};


export default EditProfile;

