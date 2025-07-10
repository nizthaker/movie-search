import { createContext, ReactNode, useContext, useState } from 'react';

export type ThemeType = 'dark' | 'light';

interface ThemeTypeProps {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeTypeProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
