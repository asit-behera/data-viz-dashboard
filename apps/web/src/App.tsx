import { CssBaseline } from "@mui/material";

import { DashboardLayout } from "./layouts";
import { BrowserRouter, Routes, Route } from "react-router";
import {
  AcvRanges,
  Customer,
  Dashboard,
  Industry,
  TeamPerformance,
} from "./pages";
import { Provider } from "react-redux";
import { store } from "./config/store";
import ThemeProviderComponent from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProviderComponent>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="industry" element={<Industry />} />
              <Route path="customers" element={<Customer />} />
              <Route path="acv-ranges" element={<AcvRanges />} />
              <Route path="teams" element={<TeamPerformance />} />
            </Route>
          </Routes>
        </Provider>
        <CssBaseline />
      </BrowserRouter>
    </ThemeProviderComponent>
  );
}

export default App;
