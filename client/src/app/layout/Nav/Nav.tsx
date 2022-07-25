import { Logout } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  useActivityStore,
  useAuthenticationStore,
} from "app/provider/RootStoreProvider";
import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { isAuthenticated, logout } = useAuthenticationStore();
  const { setFilters } = useActivityStore();

  const searchTimeout = (ms: number) => {
    let timeout: NodeJS.Timeout;

    return (text: string) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        setFilters({ search: text });
      }, ms);
    };
  };

  const search = useMemo(() => searchTimeout(400), []);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
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
          {pathname === "/" ? (
            <TextField
              size="small"
              placeholder="search"
              sx={{
                width: "30rem",
              }}
              onChange={(e) => search(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiSearch />
                  </InputAdornment>
                ),
              }}
            />
          ) : null}

          {isAuthenticated ? (
            <>
              <Box display="flex" alignItems="center">
                <Typography variant="body1">Nickname</Typography>
                <Tooltip title="open">
                  <IconButton
                    onClick={handleClick}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar alt="name" src="./favicon.ico"></Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <Link to="/activity/add">
                  <MenuItem>
                    <ListItemIcon>
                      <AddIcon fontSize="small" />
                    </ListItemIcon>
                    Create post
                  </MenuItem>
                </Link>
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link to="/signin">
              <Button variant="outlined" sx={{ mt: 1.5, mb: 1.5 }}>
                Zaloguj
              </Button>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default observer(Nav);
