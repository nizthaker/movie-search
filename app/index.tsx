import { useState } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { useDebounce } from 'util/debounce';
import { fetchMovies } from 'api/queries';

const Home = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query.trim(), 500);
  const router = useRouter();

  const {
    data: movies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movies', debouncedQuery],
    queryFn: () => fetchMovies(debouncedQuery),
    enabled: !!debouncedQuery,
  });

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <SearchBar value={query} onChangeText={setQuery} />

      {isLoading && <ActivityIndicator style={{ marginTop: 16 }} size="large" color="#2563eb" />}
      {isError && (
        <Text style={{ marginTop: 16, textAlign: 'center', color: 'red' }}>
          Something went wrong
        </Text>
      )}

      {!isLoading && !isError && debouncedQuery && movies.length === 0 && (
        <Text style={{ marginTop: 32, textAlign: 'center', color: 'gray' }}>No results found</Text>
      )}

      {!isLoading && !isError && movies.length > 0 && (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard movie={item} onPress={() => router.push(`/movie/${item.id}`)} />
          )}
        />
      )}
    </View>
  );
};

export default Home;
