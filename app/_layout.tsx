import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, useTheme } from 'context/ThemeContext';
import useThemeColor from 'hooks/useThemeColor';
import { StatusBar } from 'expo-status-bar';
import { Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function AppNavigator() {
  const themeColors = useThemeColor();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerTitle: 'Movie Search',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: themeColors.background,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: themeColors.primaryText,
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: themeColors.background,
          },
          headerRight: () => (
            <Pressable
              onPress={toggleTheme}
              style={{
                marginRight: 8,
                padding: 4,
              }}>
              <Feather name={isDark ? 'moon' : 'sun'} size={22} color={themeColors.primaryText} />
            </Pressable>
          ),
        }}
      />
    </>
  );
}
