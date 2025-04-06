import { createContext, useState, useMemo, useEffect, ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  themeMode: "dark" as ThemeMode,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

const darkPalette = {
  palette: {
    mode: "dark" as ThemeMode,
    primary: { main: "#027AE8" },
    secondary: { main: "#0D2A40" },
    background: { default: "#05070A", paper: "#0C1017" },
    text: { primary: "#FDFDFD", secondary: "#8FA0B8" },

    /*  error: { primary: "#F59C9C", secondary: "#1E0101" },
    success: { primary: "#9CE8A1", secondary: "#021D02" }, */
  },
};

const lightPalette = {
  palette: {
    mode: "light" as ThemeMode,
    primary: { main: "#027AE8" },
    secondary: { main: "#E3F2FD" },
    background: { default: "#FCFCFC", paper: "#F5F6FA" },
    text: { primary: "#0B0E14", secondary: "#47536B" },

    /*  error: { primary: "#C20A0A", secondary: "#FFF0F0" },
    success: { primary: "#1F7A2C", secondary: "#F6FEF6" }, */
  },
};

export default function ThemeProviderComponent({
  children,
}: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");

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
        palette:
          themeMode === "light" ? lightPalette.palette : darkPalette.palette,
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
