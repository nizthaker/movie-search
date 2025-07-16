import { useLocalSearchParams } from 'expo-router';
import { Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from 'util/date';
import { fetchMovieDetails } from 'api/queries';
import useThemeColor from 'hooks/useThemeColor';

const MovieDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const theme = useThemeColor();

  const styles = getStyles(theme);

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetails(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  if (isError || !movie) {
    return <Text style={styles.error}>Failed to load movie details.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {movie.poster_path && (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
          resizeMode="stretch"
        />
      )}

      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.subtitle}>Release Date: {formatDate(movie.release_date)}</Text>
      <Text style={styles.subtitle}>Rating: {movie.vote_average ?? 'N/A'}</Text>
      <Text style={styles.overview}>{movie.overview || 'No overview available.'}</Text>
    </ScrollView>
  );
};
export default MovieDetailsScreen;

const getStyles = (theme: ReturnType<typeof useThemeColor>) =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: theme.background,
    },
    poster: {
      width: '100%',
      height: 400,
      borderRadius: 12,
      marginBottom: 20,
      backgroundColor: theme.placeholder,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.primaryText,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: theme.secondaryText,
      marginBottom: 6,
    },
    overview: {
      fontSize: 16,
      color: theme.secondaryText,
      marginTop: 16,
      lineHeight: 22,
    },
    error: {
      padding: 20,
      textAlign: 'center',
      color: theme.errorText,
      fontSize: 16,
    },
  });
