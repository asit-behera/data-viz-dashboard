import Box from "@mui/material/Box";
import MUIDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: (value: boolean) => void;
}

const drawerWidth = 240;
const appBarHeight = 64; // Adjust based on your AppBar height
const collapsedWidth = 60;

export default function Drawer({ isOpen, toggleDrawer }: DrawerProps) {
  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
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
            top: appBarHeight, // Offset the list from the top
            height: `calc(100% - ${appBarHeight}px)`, // Ensure it doesn't overlap the AppBar
            overflow: "hidden",
          },
        }}
      >
        {DrawerList}
      </MUIDrawer>
    </div>
  );
}
