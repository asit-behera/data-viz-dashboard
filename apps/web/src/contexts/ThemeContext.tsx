import { createContext, useState, useMemo, useEffect, ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Define the type for the context
type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

// Create the context with default values
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextProps>({
  themeMode: "light",
  toggleTheme: () => {},
});

// The props for the provider
interface ThemeProviderProps {
  children: ReactNode;
}

// 4. ThemeProvider Component
export default function ThemeProviderComponent({
  children,
}: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  //const [isDark, setIsDark] = useState<boolean>(false);

  // Toggle theme between 'light' and 'dark'
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Fetch saved theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode") as ThemeMode;
    if (savedTheme) {
      setThemeMode(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  // Create the theme dynamically
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <>{children}</>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
