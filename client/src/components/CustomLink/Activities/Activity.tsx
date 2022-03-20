import {
  Avatar,
  Box,
  createTheme,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { IActivity } from "app/models/Activity";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import React from "react";
import styles from "./styles/Activity.style";

interface IProps {
  activity: IActivity;
}

const Activity: React.FC<IProps> = ({ activity }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const theme = createTheme({
    typography: {
      fontFamily: "Arial",
    },
  });
  return (
    <Paper elevation={1} sx={styles.container}>
      <Box sx={styles.header}>
        <Box sx={styles.activityInfo}>
          <Avatar src="./favicon.ico" sx={styles.activityAvatar}></Avatar>
          <Typography sx={styles.authorName}>Danny</Typography>
          <Typography sx={styles.acitvityDate}>Dodano 24/02/2020</Typography>
        </Box>
        <Box>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open}>
            <MenuItem>option</MenuItem>
            <MenuItem>option</MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box>
        <Typography sx={styles.activityTitle}>Title tile tile</Typography>
      </Box>
      <Box sx={styles.imageContainer}>
        <Box component="img" src={activity.photo} sx={styles.image} />
      </Box>
      <Grid container sx={styles.activityAction}>
        <Grid item sx={styles.activityVote} md={3}>
          <IconButton>
            <ArrowUpwardIcon />
          </IconButton>
          <Typography>20</Typography>
          <IconButton>
            <ArrowDownwardIcon />
          </IconButton>
        </Grid>
        <Grid item md={6} sx={styles.activityComments}>
          <IconButton>
            <ChatBubbleIcon />
          </IconButton>
          <Typography>50</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Activity;
