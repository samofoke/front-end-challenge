import React, { useState, Fragment } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Outlet } from "react-router-dom";

const NavBar = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navItems = [
    { title: "sample01", path: "/sample01" },
    { title: "sample02", path: "/sample02" },
    { title: "sample03", path: "/sample03" },
  ];

  const navItemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const drawerVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const myListItem = () => {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={drawerVariants}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </motion.div>
    );
  };

  return (
    <Fragment>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#202020",
          borderRadius: "8px",
          width: "80%",
          margin: "0 auto",
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant={isMobile ? "h6" : "h4"}
            component="div"
            sx={{ flexGrow: isMobile ? 1 : 0, textAlign: "center" }}
          >
            Fromula 1
          </Typography>
          {!isMobile && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              transition={{ type: "spring", stiffness: 50, delay: 0.3 }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.title}
                  color="inherit"
                  component={Link}
                  to={item.path}
                >
                  {item.title}
                </Button>
              ))}
            </motion.div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <AnimatePresence>{drawerOpen && myListItem()}</AnimatePresence>
      </Drawer>
      <Outlet />
    </Fragment>
  );
};

export default NavBar;
