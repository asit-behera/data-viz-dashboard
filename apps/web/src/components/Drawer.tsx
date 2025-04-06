import Box from "@mui/material/Box";
import MUIDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import FactoryIcon from "@mui/icons-material/Factory";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MoneyIcon from "@mui/icons-material/Money";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router";
import { useTheme } from "@mui/material";

interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: (value: boolean) => void;
}

const drawerWidth = 240;
const appBarHeight = 64; // Adjust based on your AppBar height
const collapsedWidth = 60;

export default function Drawer({ isOpen, toggleDrawer }: DrawerProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const DrawerList = (
    <Box
      sx={{ width: isOpen ? drawerWidth : collapsedWidth }}
      role="presentation"
      //onClick={() => toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemIcon>
              <SpaceDashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/industry");
            }}
          >
            <ListItemIcon>
              <FactoryIcon />
            </ListItemIcon>
            <ListItemText primary={"Industry"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/customers");
            }}
          >
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary={"Customers"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/acv-ranges");
            }}
          >
            <ListItemIcon>
              <MoneyIcon />
            </ListItemIcon>
            <ListItemText primary={"ACV Ranges"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/teams");
            }}
          >
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary={"Teams"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <MUIDrawer
        open={isOpen}
        onClose={() => toggleDrawer(false)}
        hideBackdrop
        variant="permanent"
        sx={{
          width: isOpen ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isOpen ? drawerWidth : collapsedWidth,
            boxSizing: "border-box",
            top: appBarHeight,
            height: `calc(100% - ${appBarHeight}px)`,
            overflow: "hidden",
            borderRight: `1px dashed ${theme.palette.divider}`,
          },
        }}
      >
        {DrawerList}
      </MUIDrawer>
    </div>
  );
}
