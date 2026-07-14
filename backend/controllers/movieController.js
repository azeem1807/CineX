const { tmdb } = require("../services/tmdbService");

// Trending Movies
const getTrendingMovies = async (req, res) => {
  try {
    const response = await tmdb.get("/trending/movie/week");

    res.status(200).json({
      success: true,
      results: response.data.results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Popular Movies
const getPopularMovies = async (req, res) => {
  try {
    const response = await tmdb.get("/movie/popular");

    res.status(200).json({
      success: true,
      results: response.data.results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Top Rated Movies
const getTopRatedMovies = async (req, res) => {
  try {
    const response = await tmdb.get("/movie/top_rated");

    res.status(200).json({
      success: true,
      results: response.data.results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Upcoming Movies
const getUpcomingMovies = async (req, res) => {
  try {
    const response = await tmdb.get("/movie/upcoming");

    res.status(200).json({
      success: true,
      results: response.data.results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search Movies
const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;

    const response = await tmdb.get("/search/movie", {
      params: {
        query,
      },
    });

    res.status(200).json({
      success: true,
      results: response.data.results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Movie Details
const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await tmdb.get(`/movie/${id}`);

    res.status(200).json({
      success: true,
      movie: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Movie Trailer
const getMovieTrailer = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Movie ID:", id);

    const response = await tmdb.get(`/movie/${id}/videos`);

    console.log("Videos:", response.data.results);

    const trailer = response.data.results.find(
      (video) =>
        video.type === "Trailer" &&
        video.site === "YouTube"
    );

    res.status(200).json({
      success: true,
      trailer: trailer || null,
    });

  } catch (error) {
    console.log("ERROR:");
    console.log(error.response?.data);
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Similar Movies
const getSimilarMovies = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await tmdb.get(`/movie/${id}/similar`);

    res.status(200).json({
      success: true,
      results: response.data.results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Cast & Crew
const getMovieCast = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await tmdb.get(`/movie/${id}/credits`);

    res.status(200).json({
      success: true,
      cast: response.data.cast,
      crew: response.data.crew,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Movie Reviews
const getMovieReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await tmdb.get(`/movie/${id}/reviews`);

    res.status(200).json({
      success: true,
      reviews: response.data.results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Movie Genres
const getMovieGenres = async (req, res) => {
  try {
    const response = await tmdb.get("/genre/movie/list");

    res.status(200).json({
      success: true,
      genres: response.data.genres,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Discover Movies
const discoverMovies = async (req, res) => {
  try {
    const {
      genre,
      language,
      year,
      rating,
      sort_by = "popularity.desc",
      page = 1,
    } = req.query;

    const params = {
      page,
      sort_by,
    };

    if (genre && genre !== "All") {
      params.with_genres = genre;
    }

    if (language && language !== "all") {
      params.with_original_language = language;
    }

    if (year) {
      params.primary_release_year = year;
    }

    if (rating) {
      params["vote_average.gte"] = rating;
    }

    const response = await tmdb.get("/discover/movie", {
      params,
    });

    res.status(200).json({
      success: true,
      results: response.data.results,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// Release Status
const getMovieReleaseStatus = async (req,res)=>{
  try{

    const {id}=req.params;

    const response = await tmdb.get(
      `/movie/${id}`
    );

    res.status(200).json({
      success:true,
      status:response.data.status,
      release_date:response.data.release_date
    });


  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};



// OTT Platforms
const getWatchProviders = async(req,res)=>{

try{

const {id}=req.params;


const response = await tmdb.get(
`/movie/${id}/watch/providers`
);


const india =
response.data.results.IN;



res.status(200).json({

success:true,

providers:
india || null

});


}catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};
module.exports = {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
  getMovieDetails,
  getMovieTrailer,
getSimilarMovies,
getMovieCast,
getMovieReviews,
getMovieGenres,
discoverMovies,
getMovieReleaseStatus,
getWatchProviders,
};