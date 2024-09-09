import { createContext, useContext } from 'react';

type ThemeContextType = {
  theme: string;
  darkTheme: () => void;
  lightTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  darkTheme: () => {},
  lightTheme: () => {},
});

export const ThemeProvider = ThemeContext.Provider;

export default function useTheme() {
  return useContext(ThemeContext);
}
