import { Movie } from 'api/types';
import { SortOption } from 'app';

export const sortMovies = (movies: Movie[], sortOption: SortOption): Movie[] => {
  const getTime = (date?: string) => (date ? new Date(date).getTime() : 0);
  const getRating = (rating?: number) => rating ?? 0;

  switch (sortOption) {
    case 'name':
      return [...movies].sort((a, b) => a.title.localeCompare(b.title));
    case 'release':
      return [...movies].sort((a, b) => getTime(b.release_date) - getTime(a.release_date));
    case 'rating':
      return [...movies].sort((a, b) => getRating(b.vote_average) - getRating(a.vote_average));
    default:
      return movies;
  }
};
