import MUIAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Typography, useTheme } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

interface AppBarProps {
  toggleDrawer: () => void;
}

export default function AppBar({ toggleDrawer }: AppBarProps) {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MUIAppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: "#000",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          border: "1px solid #ccc",
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
              border: "1px solid #ccc",
              borderRadius: "9px",
              backgroundColor: "#F5F6FA",
              "&:hover": { backgroundColor: "#e0e1e6" },
            }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Data Viz
          </Typography>

          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            /* sx={{ mr: 2 }} */
            sx={{
              padding: "6px",
              border: "1px solid #ccc",
              borderRadius: "9px",
              backgroundColor: "#F5F6FA",
              "&:hover": { backgroundColor: "#e0e1e6" },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </MUIAppBar>
    </Box>
  );
}
