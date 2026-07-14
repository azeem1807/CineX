const BASE_URL = "http://localhost:5000/api/movies";

export const getTrendingMovies = async (language = "en") => {
  const res = await fetch(
    `${BASE_URL}/trending?language=${language}`
  );

  const data = await res.json();

  return data.results;
};

export const getPopularMovies = async (language = "en") => {
  const res = await fetch(
    `${BASE_URL}/popular?language=${language}`
  );

  const data = await res.json();

  return data.results;
};

export const getTopRatedMovies = async (language = "en") => {
  const res = await fetch(
    `${BASE_URL}/top-rated?language=${language}`
  );

  const data = await res.json();

  return data.results;
};

export const getMovieDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  const data = await res.json();
  return data.movie;
};

export const getMovieCast = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/cast`);
  const data = await res.json();
  return data.cast;
};

export const getMovieTrailer = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/trailer`);
  const data = await res.json();
  return data.trailer;
};

export const getSimilarMovies = async (id) => {

  const res = await fetch(
    `${BASE_URL}/${id}/similar`
  );

  const data = await res.json();

  return data.results;

};
export const searchMovies = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search?query=${encodeURIComponent(query)}`
  );

  const data = await res.json();

  return data.results;
};
export const discoverMovies = async ({
  genre = "",
  language = "en",
  sortBy = "popularity.desc",
}) => {

  const params = new URLSearchParams();

  if (genre) {
    params.append("genre", genre);
  }

  if (language) {
    params.append("language", language);
  }

  params.append("sort_by", sortBy);

  const res = await fetch(
    `${BASE_URL}/discover?${params.toString()}`
  );

  const data = await res.json();

  return data.results;
};
export const getMovieStatus = async(id)=>{

const res = await fetch(
`${BASE_URL}/${id}/status`
);

const data = await res.json();

return data;

};



export const getWatchProviders = async(id)=>{

const res = await fetch(
`${BASE_URL}/${id}/providers`
);

const data = await res.json();

return data.providers;

};