import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaSearch, FaHeart, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">

      <div className="logo">
        CineX
      </div>

      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/ai">AI</Link>
      </div>

      <div className="nav-icons">
        <FaSearch />
        <FaHeart />
        <Link to="/profile">
          <FaUserCircle />
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;