import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";


const Register = () => {


const [showPassword,setShowPassword] = useState(false);

const [showConfirmPassword,setShowConfirmPassword] = useState(false);


const navigate = useNavigate();



return (

<div className="
relative
flex
min-h-screen
items-center
justify-center
overflow-hidden
bg-[#141414]
">


{/* Background Glow */}

<div className="
absolute
-left-40
top-20
h-96
w-96
rounded-full
bg-[#E50914]/20
blur-[140px]
" />


<div className="
absolute
-right-40
bottom-10
h-96
w-96
rounded-full
bg-[#B20710]/20
blur-[160px]
" />





{/* Register Card */}

<div className="
relative
z-10
w-full
max-w-md
rounded-2xl
border
border-white/10
bg-black/70
p-10
shadow-2xl
backdrop-blur-lg
">





{/* Logo */}

<div className="
mb-8
text-center
">


<h1 className="
text-5xl
font-extrabold
tracking-wide
text-[#E50914]
">

Cine

<span className="text-white">
X
</span>


</h1>


<p className="
mt-3
text-sm
text-gray-400
">

Create your CineX account

</p>


</div>







{/* Full Name */}

<div className="mb-5">


<label className="
mb-2
block
text-sm
text-gray-300
">

Full Name

</label>


<input

type="text"

placeholder="Enter your name"

className="
w-full
rounded-md
border
border-gray-700
bg-[#333333]
px-4
py-3
text-white
outline-none
focus:border-[#E50914]
"

 />


</div>







{/* Email */}

<div className="mb-5">


<label className="
mb-2
block
text-sm
text-gray-300
">

Email

</label>


<input

type="email"

placeholder="Enter your email"

className="
w-full
rounded-md
border
border-gray-700
bg-[#333333]
px-4
py-3
text-white
outline-none
focus:border-[#E50914]
"

 />


</div>







{/* Password */}

<div className="mb-5">


<label className="
mb-2
block
text-sm
text-gray-300
">

Password

</label>



<div className="relative">


<input

type={showPassword ? "text" : "password"}

placeholder="Create password"

className="
w-full
rounded-md
border
border-gray-700
bg-[#333333]
px-4
py-3
pr-12
text-white
outline-none
focus:border-[#E50914]
"

/>



<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

className="
absolute
right-4
top-1/2
-translate-y-1/2
text-gray-400
hover:text-white
"

>

{
showPassword
?
<FaEyeSlash/>
:
<FaEye/>
}

</button>


</div>


</div>







{/* Confirm Password */}


<div className="mb-5">


<label className="
mb-2
block
text-sm
text-gray-300
">

Confirm Password

</label>



<div className="relative">


<input

type={
showConfirmPassword
?
"text"
:
"password"
}

placeholder="Confirm password"

className="
w-full
rounded-md
border
border-gray-700
bg-[#333333]
px-4
py-3
pr-12
text-white
outline-none
focus:border-[#E50914]
"

/>




<button

type="button"

onClick={()=>
setShowConfirmPassword(!showConfirmPassword)
}

className="
absolute
right-4
top-1/2
-translate-y-1/2
text-gray-400
hover:text-white
"

>


{
showConfirmPassword
?
<FaEyeSlash/>
:
<FaEye/>
}


</button>



</div>


</div>








{/* Terms */}

<div className="mb-6">


<label className="
flex
items-center
gap-2
text-sm
text-gray-400
">


<input type="checkbox"/>


I agree to Terms & Conditions


</label>


</div>








{/* Create Account Button */}


<button

onClick={()=>navigate("/")}

className="
w-full
h-12
rounded-md
bg-[#E50914]
font-semibold
text-white
transition
hover:bg-[#B20710]
"

>

Create Account

</button>







{/* Login Link */}


<p className="
mt-8
text-center
text-sm
text-gray-400
">


Already have an account?


<span

onClick={()=>navigate("/")}

className="
ml-2
cursor-pointer
font-semibold
text-[#E50914]
hover:text-white
"

>

Sign In

</span>



</p>





</div>


</div>


);


};


export default Register;