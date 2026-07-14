import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
const [rememberMe, setRememberMe] = useState(false);
const [savedPassword, setSavedPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {

  const savedEmail = localStorage.getItem("rememberEmail");
  const savedPassword = localStorage.getItem("rememberPassword");

  if(savedEmail && savedPassword){

    setEmail(savedEmail);
    setPassword(savedPassword);
    setRememberMe(true);

  }

},[]);

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    if (apiError) setApiError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError("");

    try {
      const { data } = await loginUser({
        email: email.trim(),
        password,
      });

if (data.success) {

  login(data.user, data.token);


 if (rememberMe) {

  localStorage.setItem(
    "rememberEmail",
    email.trim()
  );

  localStorage.setItem(
    "rememberPassword",
    password
  );

} else {

  localStorage.removeItem("rememberEmail");
  localStorage.removeItem("rememberPassword");

}


  navigate("/home");
} else {
  setApiError(data.message || "Login failed");
}
    } catch (err) {
      setApiError(
  err.response?.data?.message ||
  err.message ||
  "Something went wrong. Please try again."
);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#141414]">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#E50914]/20 blur-[140px]" />
      <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#B20710]/20 blur-[160px]" />

      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-950/80 p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-lg">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-wide text-[#E50914]">
            Cine<span className="text-white">X</span>
          </h1>
          <p className="mt-3 text-sm text-gray-400">Welcome back! Continue your movie journey.</p>
        </div>

        {apiError && <p className="mb-4 text-center text-sm text-red-500">{apiError}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="mb-2 block text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              autoFocus
              disabled={loading}
              value={email}
              onChange={handleInputChange(setEmail, "email")}
              className="w-full rounded-md border border-gray-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/40 disabled:opacity-50"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
                value={password}
                onChange={handleInputChange(setPassword, "password")}
                className="w-full rounded-md border border-gray-700 bg-zinc-900 px-4 py-3 pr-12 text-white outline-none transition focus:border-[#E50914] focus:ring-2 focus:ring-[#E50914]/40 disabled:opacity-50"
              />
              <button
                type="button"
                disabled={loading}
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white disabled:opacity-50"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>

          <div className="mb-6 flex items-center justify-between text-sm">
            <label className={`flex items-center gap-2 text-gray-400 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <input
  type="checkbox"
  checked={rememberMe}
  onChange={(e)=>setRememberMe(e.target.checked)}
  disabled={loading}
  className="accent-[#E50914]"
/>
              Remember me
            </label>
            <button
              type="button"
              disabled={loading}
              onClick={() => navigate("/forgot-password")} // TODO: Verify /forgot-password route exists
              className="text-[#E50914] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>


        <div className="mt-8 text-center text-sm text-gray-400">
          <span>New to CineX?</span>
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