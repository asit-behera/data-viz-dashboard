import { useState } from "react";
import { AppBar, Drawer } from "../components";
import { Outlet } from "react-router";
import { Box } from "@mui/material";

const drawerWidth = 240;
const appBarHeight = 64; // Adjust based on your AppBar height
const collapsedWidth = 60;

function Dashboard() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <AppBar toggleDrawer={toggleDrawer} />
      <Drawer isOpen={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          padding: 2,
          marginLeft: `${open ? drawerWidth : collapsedWidth}px`,
          marginTop: `${appBarHeight}px`,
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}

export default Dashboard;
