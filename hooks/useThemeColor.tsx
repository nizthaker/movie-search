import { darkTheme, lightTheme } from 'context/theme';
import { useTheme } from 'context/ThemeContext';

const useThemeColor = () => {
  const { theme } = useTheme();
  return theme === 'dark' ? darkTheme : lightTheme;
};

export default useThemeColor;
