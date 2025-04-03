import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import { DashboardLayout } from "./layouts";

import { createTheme } from "@mui/material/styles";
//import { useState } from "react";
//import { lime, purple } from "@mui/material/colors";
import { BrowserRouter, Routes, Route } from "react-router";

/* const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#027AE8" },
    secondary: { main: "#9C27B0" },
    background: { default: "#05070A", paper: "#0C1017" },
    text: { primary: "#FDFDFD", secondary: "#8FA0B8" },
    //error: { primary: "#F59C9C", secondary: "#1E0101" },
    //success: { primary: "#9CE8A1", secondary: "#021D02" },
  },
}); */

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#027AE8" },
    secondary: { main: "#9C27B0" },
    background: { default: "#FCFCFC", paper: "#F5F6FA" },
    text: { primary: "#0B0E14", secondary: "#47536B" },
    //error: { primary: "#C20A0A", secondary: "#FFF0F0" },
    //success: { primary: "#1F7A2C", secondary: "#F6FEF6" },
  },
});
function App() {
  /*   const [isDarkTheme, setIsDarkTheme] = useState(true);
  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  }; */

  return (
    <BrowserRouter>
      <ThemeProvider
        theme={/* isDarkTheme ? lightTheme : darkTheme */ lightTheme}
      >
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route index element={<>{"Dashboard!!"}</>} />
            <Route path="test" element={<>{"Hello World!!"}</>} />
          </Route>
        </Routes>
        <CssBaseline />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
