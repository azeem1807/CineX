import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Home from "../pages/Home.jsx";
import Search from "../pages/Search.jsx";
import MovieDetails from "../pages/MovieDetails.jsx";
import Watchlist from "../pages/Watchlist.jsx";
import Profile from "../pages/Profile";
import Favorites from "../pages/Favorites";
import NotFound from "../pages/NotFound";
import AIRecommendations from "../pages/AIRecommendations";
import Notifications from "../pages/Notifications";


function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />


        <Route
          path="/register"
          element={<Register />}
        />


        <Route
          path="/home"
          element={<Home />}
        />


        <Route
          path="/search"
          element={<Search />}
        />


        <Route
          path="/movie/:id"
          element={<MovieDetails />}
        />


        <Route
          path="/watchlist"
          element={<Watchlist />}
        />
        <Route
  path="/profile"
  element={<Profile />}
/>
<Route
 path="/favorites"
 element={<Favorites />}
/>
<Route path="*" element={<NotFound />} />
<Route
 path="/ai-recommendations"
 element={<AIRecommendations />}
/>
<Route
path="/notifications"
element={<Notifications />}
/>


      </Routes>

    </BrowserRouter>

  );

}


export default AppRoutes;