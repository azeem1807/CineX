import { useState } from "react";

const ForgotPassword =()=>{

const [email,setEmail]=useState("");

return(

<div className="
min-h-screen
bg-[#141414]
text-white
flex
items-center
justify-center
">

<div className="
bg-zinc-950
p-10
rounded-2xl
w-full
max-w-md
">

<h1 className="
text-3xl
font-bold
text-center
mb-6
">

Reset Password

</h1>


<input

type="email"

placeholder="Enter your email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="
w-full
bg-zinc-900
border
border-gray-700
rounded-lg
px-4
py-3
mb-5
"

/>


<button

className="
w-full
bg-red-600
py-3
rounded-lg
font-bold
"

>

Send Reset Link

</button>


</div>


</div>

)

}


export default ForgotPassword;