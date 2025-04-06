import { createContext, useState, useMemo, useEffect, ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  themeMode: "light",
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProviderComponent({
  children,
}: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

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
