import { Movie } from 'api/types';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { formatDate } from 'util/date';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

const MovieCard = ({ movie, onPress }: MovieCardProps) => {
  return (
    <Pressable onPress={onPress} style={styles.card} testID="movie-card">
      {movie.poster_path ? (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w92${movie.poster_path}` }}
          style={styles.poster}
          resizeMode="cover"
          testID="movie-poster"
        />
      ) : (
        <View style={styles.posterPlaceholder} testID="poster-placeholder" />
      )}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <Text style={styles.subtitle}>
          Release: {movie.release_date ? formatDate(movie.release_date) : 'N/A'}
        </Text>
        <Text style={styles.subtitle}>Rating: {movie.vote_average ?? 'N/A'}</Text>
        <Text style={styles.overview} numberOfLines={3}>
          {movie.overview || 'No description available.'}
        </Text>
      </View>
    </Pressable>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  poster: {
    width: 60,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  posterPlaceholder: {
    width: 60,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 2,
  },
  overview: {
    fontSize: 13,
    color: '#374151',
    marginTop: 4,
  },
});
