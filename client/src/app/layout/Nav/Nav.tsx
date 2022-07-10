import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <AppBar
      position="sticky"
      elevation={3}
      sx={{ background: "white", color: "black" }}
    >
      <Toolbar variant="dense">
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Typography variant="h6">
            <Link to="/">LOGO</Link>
          </Typography>
          <TextField
            size="small"
            placeholder="search"
            sx={{
              width: "30rem",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch />
                </InputAdornment>
              ),
            }}
          />
          <Box display="flex" alignItems="center">
            <Typography variant="body1">Nickname</Typography>
            <Tooltip title="open">
              <IconButton>
                <Avatar alt="name" src="./favicon.ico"></Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
