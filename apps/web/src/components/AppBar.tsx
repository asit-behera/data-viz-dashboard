import MUIAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography, useTheme } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import GitHubIcon from "@mui/icons-material/GitHub";

interface AppBarProps {
  toggleDrawer: () => void;
  isDrawerOpen: boolean;
}

export default function AppBar({ toggleDrawer, isDrawerOpen }: AppBarProps) {
  const { themeMode, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MUIAppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            /* sx={{ mr: 2 }} */
            sx={{
              mr: 2,
              padding: "6px",
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: "9px",
              backgroundColor: theme.palette.background.paper,
            }}
            onClick={toggleDrawer}
          >
            {isDrawerOpen ? (
              <MenuOpenIcon color="primary" />
            ) : (
              <MenuIcon color="primary" />
            )}
          </IconButton>

          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, pt: 1, fontWeight: "700" }}
          >
            Data Viz
          </Typography>

          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              window.open(
                "https://github.com/asit-behera/data-viz-dashboard",
                "_blank"
              );
            }}
            sx={{
              mr: 2,
              padding: "6px",
              //border: `1px solid ${theme.palette.divider}`,
              borderRadius: "9px",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <GitHubIcon color="primary" />
          </IconButton>

          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={toggleTheme}
            sx={{
              padding: "6px",
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: "9px",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            {themeMode === "light" ? (
              <DarkModeIcon color="primary" />
            ) : (
              <LightModeIcon color="primary" />
            )}
          </IconButton>
        </Toolbar>
      </MUIAppBar>
    </Box>
  );
}
