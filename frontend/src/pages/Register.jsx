import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import toast from "react-hot-toast";

const Register = () => {


const [showPassword,setShowPassword] = useState(false);

const [showConfirmPassword,setShowConfirmPassword] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [agreeTerms, setAgreeTerms] = useState(false);

const [loading, setLoading] = useState(false);
const [errors, setErrors] = useState({});
const [apiError, setApiError] = useState("");


const navigate = useNavigate();

const validate = () => {
  const newErrors = {};

  if (!name.trim()) {
    newErrors.name = "Full name is required";
  }

  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Invalid email address";
  }

  if (!password) {
    newErrors.password = "Password is required";
  } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  if (!confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  if (!agreeTerms) {
    newErrors.terms = "Please accept Terms & Conditions";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  setLoading(true);
  setApiError("");

  try {
    const { data } = await registerUser({
      name: name.trim(),
      email: email.trim(),
      password,
    });

   if (data.success) {

  toast.success("Account created successfully!");

  setTimeout(() => {
    navigate("/");
  }, 1500);

}
  } catch (err) {
    const message =
  err.response?.data?.message || "Registration failed";

setApiError(message);

toast.error(message);
  } finally {
    setLoading(false);
  }
};


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
{/* API Error */}
{apiError && (
  <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-400">
    {apiError}
  </div>
)}
<form onSubmit={handleSubmit}>
  


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
  value={name}
  onChange={(e) => setName(e.target.value)}

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
 {errors.name && (
  <p className="mt-1 text-xs text-red-500">
    {errors.name}
  </p>
)}


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
  value={email}
  onChange={(e) => setEmail(e.target.value)}

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

{errors.email && (
  <p className="mt-1 text-xs text-red-500">
    {errors.email}
  </p>
)}
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
  value={password}
  onChange={(e) => setPassword(e.target.value)}

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

{errors.password && (
  <p className="mt-1 text-xs text-red-500">
    {errors.password}
  </p>
)}

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
  type={showConfirmPassword ? "text" : "password"}
  placeholder="Confirm password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}

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


{errors.confirmPassword && (
  <p className="mt-1 text-xs text-red-500">
    {errors.confirmPassword}
  </p>
)}

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


<input
  type="checkbox"
  checked={agreeTerms}
  onChange={(e) => setAgreeTerms(e.target.checked)}
/>


I agree to Terms & Conditions


</label>
{errors.terms && (
  <p className="mt-2 text-xs text-red-500">
    {errors.terms}
  </p>
)}

</div>


{/* Create Account Button */}


<button

type="submit"
disabled={loading}
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

{loading ? "Creating Account..." : "Create Account"}

</button>

</form>




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