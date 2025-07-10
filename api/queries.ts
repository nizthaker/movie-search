import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.tmdbApiKey;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string) => {
  try {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Http error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId: number) => {
  try {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Http error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
};

export const fetchPopularMovies = async (page: number) => {
  try {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Http error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      results: data.results ?? [],
      page: data.page ?? page,
      totalPages: data.total_pages ?? 1,
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
