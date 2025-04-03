import { useState } from "react";
import { AppBar, Drawer } from "../components";

function Dashboard() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <AppBar toggleDrawer={toggleDrawer} />
      <Drawer isOpen={open} toggleDrawer={toggleDrawer} />
    </>
  );
}

export default Dashboard;
