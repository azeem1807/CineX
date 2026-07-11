import React from "react";
import "./Home.css";

import {
  FaSearch,
  FaBell,
  FaUserCircle
} from "react-icons/fa";


const movies = [
  {
    title: "RRR",
    image: "/movies/rrr.jpg"
  },
  {
    title: "Baahubali",
    image: "/movies/bahubali.jpg"
  },
  {
    title: "Pushpa",
    image: "/movies/pushpa.jpg"
  },
  {
    title: "Leo",
    image: "/movies/leo.jpg"
  },
  {
    title: "Jawan",
    image: "/movies/jawan.jpg"
  }
];


function MovieCard({ movie }) {

  return (
    <div className="movie-card">

      <img
        src={movie.image}
        alt={movie.title}
      />

    </div>
  );

}



function Home() {

  return (

    <div className="home">


      {/* Navbar */}

      <header className="navbar">


        <div className="logo">
          Cine<span>X</span>
        </div>


        <nav>

          <a>Home</a>
          <a>Telugu</a>
          <a>Tamil</a>
          <a>Hindi</a>
          <a>English</a>

        </nav>



        <div className="actions">


          <div className="search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search movies"
            />

          </div>


          <FaBell />

          <FaUserCircle />


        </div>


      </header>




      {/* Hero Section */}

      <section className="hero">

        <div className="hero-content">

          <h1>
            CineX
          </h1>

          <p>
            Your Ultimate Movie Universe
          </p>

        </div>

      </section>





      {/* Trending Movies */}

      <section className="movies">

        <h2>
          🔥 Trending Movies
        </h2>


        <div className="movie-row">

          {
            movies.map((movie, index) => (

              <MovieCard
                key={index}
                movie={movie}
              />

            ))
          }

        </div>

      </section>






      {/* Latest Movies */}

      <section className="movies">

        <h2>
          ⭐ Latest Movies
        </h2>


        <div className="movie-row">

          {
            [...movies].reverse().map((movie, index) => (

              <MovieCard
                key={index}
                movie={movie}
              />

            ))
          }

        </div>

      </section>




      <footer>

        <h2>
          CineX
        </h2>

        <p>
          Movies • Series • Entertainment
        </p>

      </footer>



    </div>

  );

}


export default Home;