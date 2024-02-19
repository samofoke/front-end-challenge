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
import { Link } from "react-scroll";
import { Outlet } from "react-router-dom";

const NavBar = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navItems = [{ title: "F1 Champions", id: "yearsData" }];

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
              <Link
                to={item.id}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <ListItemButton>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </Link>
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

          <motion.div
            initial="hidden"
            animate="visible"
            variants={navItemVariants}
            transition={{ type: "spring", stiffness: 50, delay: 0.3 }}
          >
            <Typography
              variant={isMobile ? "h6" : "h4"}
              component="div"
              sx={{
                flexGrow: isMobile ? 1 : 0,
                textAlign: "center",
                color: "#F05941",
              }}
            >
              Formula 1
            </Typography>
          </motion.div>

          {!isMobile && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              transition={{ type: "spring", stiffness: 50, delay: 0.3 }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <Button color="inherit">{item.title}</Button>
                </Link>
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
