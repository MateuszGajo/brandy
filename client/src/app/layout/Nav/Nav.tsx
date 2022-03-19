import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./Nav.style";
const Nav = () => {
  return (
    <AppBar sx={styles.nav} position="sticky" elevation={3}>
      <Toolbar variant="dense">
        <Typography variant="h6">LOGO</Typography>
        <Box sx={styles.user}>
          <Tooltip title="open">
            <IconButton>
              <Avatar alt="name" src="./favicon.ico"></Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
