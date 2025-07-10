import { useCallback, useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useFocusEffect, useRouter } from 'expo-router';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { useDebounce } from 'util/debounce';
import { fetchPopularMovies, fetchMovies } from 'api/queries';
import { Movie } from 'api/types';
import useThemeColor from 'hooks/useThemeColor';
import DropDownPicker from 'react-native-dropdown-picker';
import { Feather } from '@expo/vector-icons';
import { sortMovies } from 'util/util';

export type SortOption = 'name' | 'release' | 'rating';

const SORT_ITEMS = [
  { label: 'Name (A–Z)', value: 'name' },
  { label: 'Release Date (Newest)', value: 'release' },
  { label: 'Rating (Highest)', value: 'rating' },
];

const Home = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query.trim(), 500);
  const router = useRouter();
  const theme = useThemeColor();

  const [sortOption, setSortOption] = useState<SortOption>('name');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(SORT_ITEMS);

  const {
    data: searchedMovies = [],
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useQuery({
    queryKey: ['movies', debouncedQuery],
    queryFn: () => fetchMovies(debouncedQuery),
    enabled: !!debouncedQuery,
  });

  const {
    data: popularMoviesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isPopularLoading,
    isError: isPopularError,
  } = useInfiniteQuery({
    queryKey: ['latestMovies'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => fetchPopularMovies(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled: !debouncedQuery,
  });

  const renderMovie = ({ item }: { item: Movie }) => (
    <MovieCard movie={item} onPress={() => router.push(`/movie/${item.id}`)} />
  );

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const isLoading = debouncedQuery ? isSearchLoading : isPopularLoading;
  const isError = debouncedQuery ? isSearchError : isPopularError;

  const rawMovies = debouncedQuery
    ? searchedMovies
    : (popularMoviesData?.pages?.flatMap((page) => page.results) ?? []);

  const movies = sortMovies(rawMovies, sortOption);

  // Close dropdown when query changes (typing in search)
  useEffect(() => {
    setOpen(false);
  }, [query]);

  // Close dropdown when screen loses focus (navigating away)
  useFocusEffect(
    useCallback(() => {
      return () => {
        setOpen(false);
      };
    }, [])
  );

  // Handler for FlatList scroll
  const handleScroll = useCallback(() => {
    if (open) {
      setOpen(false);
    }
  }, [open]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 20 }}>
      <SearchBar value={query} onChangeText={setQuery} />

      <View style={{ marginTop: 10, zIndex: 1000 }}>
        <DropDownPicker
          open={open}
          value={sortOption}
          items={items}
          setOpen={setOpen}
          setValue={setSortOption}
          setItems={setItems}
          placeholder="Sort by"
          containerStyle={{ marginBottom: open ? 150 : 20 }}
          style={{
            backgroundColor: theme.background,
            borderColor: theme.border,
          }}
          textStyle={{
            color: theme.primaryText,
          }}
          dropDownContainerStyle={{
            backgroundColor: theme.background,
            borderColor: theme.border,
          }}
          ArrowUpIconComponent={({ style }) => (
            <Feather name="chevron-up" size={20} color={theme.primaryText} style={style} />
          )}
          ArrowDownIconComponent={({ style }) => (
            <Feather name="chevron-down" size={20} color={theme.primaryText} style={style} />
          )}
          TickIconComponent={({ style }) => (
            <Feather name="check" size={18} color={theme.primaryText} style={style} />
          )}
        />
      </View>

      {isLoading && <ActivityIndicator style={{ marginTop: 16 }} />}

      {isError && (
        <Text style={{ marginTop: 16, textAlign: 'center', color: theme.errorText }}>
          Something went wrong
        </Text>
      )}

      {!isLoading && !isError && movies.length === 0 && (
        <Text style={{ marginTop: 32, textAlign: 'center', color: theme.primaryText }}>
          No results found
        </Text>
      )}

      {!isLoading && !isError && movies.length > 0 && (
        <FlatList
          data={movies}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={renderMovie}
          onEndReached={!debouncedQuery ? handleEndReached : undefined}
          onEndReachedThreshold={0.5}
          onScrollBeginDrag={handleScroll}
          ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
        />
      )}
    </View>
  );
};

export default Home;
