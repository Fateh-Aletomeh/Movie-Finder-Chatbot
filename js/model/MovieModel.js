const TMDB_API = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Y2Q3MDZlMzYxMGUyZWQyN2FiYmQzMjQwNTYyMGM0NiIsIm5iZiI6MTc1MDI1MzY2Mi40MjMsInN1YiI6IjY4NTJjMDVlYmYyZGYxYTY0MjBlODA1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._ZWgVdEG8dgzytwcwtKCFIGFNY1jSZ0feBQ6_rWC1VI";
let genreMap = {};


async function initGenres() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_API}`
    }
  };

  try {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
    const data = await response.json();

    data.genres.forEach(genre => {
      genreMap[genre.name.toLowerCase()] = genre.id;

      if (genre.name === "Science Fiction") {
        genreMap["sci-fi"] = genre.id;
      }
    });
  } catch (error) {
    console.log("Failed to fetch list of genres: ", error);

    genreMap = {
      'action': 28,
      'adventure': 12,
      'animation': 16,
      'comedy': 35,
      'crime': 80,
      'documentary': 99,
      'drama': 18,
      'family': 10751,
      'fantasy': 14,
      'history': 36,
      'horror': 27,
      'music': 10402,
      'mystery': 9648,
      'romance': 10749,
      'science fiction': 878,
      'sci-fi': 878,
      'tv movie': 10770,
      'thriller': 53,
      'war': 10752,
      'western': 37
    };
  }
}


function getAvailableGenres() {
  return Object.keys(genreMap);
}


async function fetchMovieData(genre) {
  const genreID = genreMap[genre];

  if (!genreID) {
    return { success: false, error: "GENRE_NOT_FOUND", genre: genre };
  }

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_API}`
    }
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?page=1&with_genres=${genreID}`, options);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const movie = data.results[randomIndex];

      return {
        success: true,
        movie: {
          title: movie.title,
          description: movie.overview
        }
      };
    } else {
      return { success: false, error: "NO_MOVIES_FOUND", genre: genre };
    }
  } catch (error) {
    console.log("Error when fetching movie data: ", error);
    return { success: false, error: "API_ERROR" };
  }
}
