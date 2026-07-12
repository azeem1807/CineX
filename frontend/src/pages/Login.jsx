import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();


  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#141414]">


      {/* Background Glow */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#E50914]/20 blur-[140px]" />

      <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#B20710]/20 blur-[160px]" />



      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-black/70 p-10 shadow-2xl backdrop-blur-lg">



        {/* Logo */}
        <div className="mb-8 text-center">

          <h1 className="text-5xl font-extrabold tracking-wide text-[#E50914]">
            Cine
            <span className="text-white">
              X
            </span>
          </h1>


          <p className="mt-3 text-sm text-gray-400">
            Welcome back! Continue your movie journey.
          </p>

        </div>





        {/* Email */}
        <div className="mb-5">

          <label className="mb-2 block text-sm text-gray-300">
            Email
          </label>


          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-md border border-gray-700 bg-[#333333] px-4 py-3 text-white outline-none transition focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/40"
          />

        </div>






        {/* Password */}
        <div className="mb-4">

          <label className="mb-2 block text-sm text-gray-300">
            Password
          </label>


          <div className="relative">


            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full rounded-md border border-gray-700 bg-[#333333] px-4 py-3 pr-12 text-white outline-none transition focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/40"
            />



            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >

              {showPassword ? <FaEyeSlash /> : <FaEye />}

            </button>


          </div>


        </div>







        {/* Remember + Forgot */}
        <div className="mb-6 flex items-center justify-between text-sm">


          <label className="flex items-center gap-2 text-gray-400">

            <input type="checkbox" />

            Remember me

          </label>




          <button className="text-[#E50914] hover:text-white">

            Forgot Password?

          </button>


        </div>







        <button
  type="button"
  onClick={() => {
    navigate("/home");
  }}
  className="w-full rounded-md bg-[#E50914] py-3 font-semibold text-white transition hover:bg-[#B20710]"
>
  Sign In
</button>







        {/* Divider */}
        <div className="my-6 flex items-center">


          <div className="h-px flex-1 bg-gray-700" />


          <span className="mx-4 text-sm text-gray-400">
            OR
          </span>


          <div className="h-px flex-1 bg-gray-700" />


        </div>







        {/* Google Login */}
        <button
          className="flex w-full h-12 items-center justify-center gap-3 rounded-md bg-[#333333] font-semibold text-white transition hover:bg-[#444444]"
        >

          Continue with Google

        </button>







        {/* Register */}
        <div className="mt-8 text-center text-sm text-gray-400">

          <span>
            New to CineX?
          </span>


          <button
            type="button"
            onClick={() => navigate("/register")}
            className="ml-2 cursor-pointer font-semibold text-[#E50914] hover:text-white"
          >

            Sign Up

          </button>


        </div>



      </div>


    </div>
  );
};

export default Login;