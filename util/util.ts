import { Movie } from 'api/types';
import { SortOption } from 'app';

export const sortMovies = (movies: Movie[], sortOption: SortOption): Movie[] => {
  const sorted = [...movies];

  const getTime = (date?: string) => (date ? new Date(date).getTime() : 0);
  const getRating = (rating?: number) => rating ?? 0;

  switch (sortOption) {
    case 'name':
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'release':
      sorted.sort((a, b) => getTime(b.release_date) - getTime(a.release_date));
      break;
    case 'rating':
      sorted.sort((a, b) => getRating(b.vote_average) - getRating(a.vote_average));
      break;
  }

  return sorted;
};
