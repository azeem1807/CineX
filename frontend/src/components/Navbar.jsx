import { useState, useRef, useEffect } from "react";
import {
  Home,
  Search,
  Bookmark,
  Heart,
  Sparkles,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

const handleLogout = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  localStorage.removeItem("rememberEmail");

  localStorage.removeItem("rememberPassword");

  navigate("/");

};

  const navItems = [
    {
      name: "Home",
      icon: Home,
      path: "/home",
    },
    {
      name: "Discover",
      icon: Search,
      path: "/search",
    },
    {
      name: "Watchlist",
      icon: Bookmark,
      path: "/watchlist",
    },
    {
      name: "Favorites",
      icon: Heart,
      path: "/favorites",
    },
    {
      name: "AI Picks",
      icon: Sparkles,
      path: "/ai-recommendations",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/70 backdrop-blur-2xl shadow-lg">

      <div className="max-w-7xl mx-auto h-16 md:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* ================= LOGO ================= */}

        <div
          onClick={() => navigate("/home")}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center shadow-lg shadow-red-600/30">
            🎬
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-red-600">Cine</span>
              <span className="text-white">X</span>
            </h1>

            <p className="hidden md:block text-xs text-zinc-400">
              Movie Recommendation Platform
            </p>
          </div>
        </div>

        {/* ================= DESKTOP MENU ================= */}

        <div className="hidden lg:flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl px-3 py-2">

          {navItems.map((item) => {
            const Icon = item.icon;

            const active = location.pathname === item.path;

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 rounded-full px-5 py-2 transition-all duration-300

                ${
                  active
                    ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <Icon size={18} />

                <span className="font-medium">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* ================= RIGHT ================= */}

        <div className="flex items-center gap-3">

          {/* SEARCH */}

          <div className="hidden xl:flex relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies..."
              className="w-80 rounded-full border border-zinc-800 bg-zinc-900/70 py-3 pl-11 pr-5 text-sm text-white outline-none transition-all focus:border-red-500"
            />

          </div>

          
          {/* PROFILE */}

          <div
            className="relative"
            ref={menuRef}
          >

            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex items-center gap-3"
            >

              <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-500 text-lg font-bold text-white shadow-lg shadow-red-500/30">

                {user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : <User size={20} />}

              </div>

              <div className="hidden xl:block text-left">

                <h3 className="font-semibold text-white">
                  {user?.name || "Movie Lover"}
                </h3>

                <p className="text-xs text-zinc-400">
                  Welcome Back 👋
                </p>

              </div>

            </button>

            {openMenu && (

              <div className="absolute right-0 mt-4 w-60 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">

                <button
                  onClick={() => {
                    setOpenMenu(false);
                    navigate("/profile");
                  }}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left text-white transition hover:bg-zinc-900"
                >
                  <User size={18} />

                  Profile

                </button>

                <button
                  onClick={() => {
                    setOpenMenu(false);
                    navigate("/favorites");
                  }}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left text-white transition hover:bg-zinc-900"
                >
                  <Heart size={18} />

                  Favorites

                </button>

                <button
                  onClick={() => {
                    setOpenMenu(false);
                    navigate("/watchlist");
                  }}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left text-white transition hover:bg-zinc-900"
                >
                  <Bookmark size={18} />

                  Watchlist

                </button>

                <div className="border-t border-zinc-800" />

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left text-red-500 transition hover:bg-red-500/10"
                >
                  <LogOut size={18} />

                  Logout

                </button>

              </div>

            )}

          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-white"
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>

      </div>
            {/* ================= MOBILE MENU ================= */}

      {mobileMenu && (
        <div className="lg:hidden border-t border-zinc-800 bg-black/95 backdrop-blur-xl">

          <div className="px-6 py-5">

            {/* Mobile Search */}

            <div className="relative mb-5">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search movies..."
                className="w-full rounded-full border border-zinc-800 bg-zinc-900 py-3 pl-11 pr-5 text-white outline-none focus:border-red-500"
              />

            </div>

            {/* Mobile Navigation */}

            <div className="space-y-2">

              {navItems.map((item) => {

                const Icon = item.icon;

                const active =
                  location.pathname === item.path;

                return (

                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenu(false);
                    }}
                    className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 transition

                    ${
                      active
                        ? "bg-gradient-to-r from-red-600 to-red-500 text-white"
                        : "text-zinc-300 hover:bg-zinc-900"
                    }`}
                  >

                    <Icon size={20} />

                    <span className="font-medium">

                      {item.name}

                    </span>

                  </button>

                );

              })}

            </div>

          </div>

        </div>
      )}

    </nav>
  );
}
