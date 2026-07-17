import { createContext, useContext, useState } from "react";

type ThemeContextType = { isDarkMode: boolean; toggleTheme: () => void };

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode((currentMode) => !currentMode);
  };
  const value = { isDarkMode, toggleTheme };
  return (
    <ThemeContext.Provider value={value}> 
        {children} 
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
