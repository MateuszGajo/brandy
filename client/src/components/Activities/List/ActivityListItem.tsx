import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { IActivity } from "app/models/Activity";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaRegCommentDots } from "react-icons/fa";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { getDate } from "app/utils/Date";

interface IProps {
  activity: IActivity;
}

const ActivityListItem: React.FC<IProps> = ({ activity }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onCommentClick = () => {
    navigate(`/activity/${activity._id}`);
  };
  const { year, month, day, hours, minutes } = getDate(new Date(activity.date));

  return (
    <Paper elevation={1}>
      <Grid container>
        <Grid item lg={1} sx={{ overflow: "hidden" }}>
          <Box
            pt={1}
            mb={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
            bgcolor="#e9e9e9"
            height="100%"
          >
            <IconButton
              sx={{
                color: "#c1c1c1",
                "&:hover": { color: (theme) => theme.palette.primary.main },
              }}
            >
              <ImArrowUp size={23} />
            </IconButton>
            <Typography
              variant="body1"
              mt={0.5}
              mb={0.5}
              fontWeight="bold"
              fontSize="0.9rem"
            >
              {activity.upVotesCount - activity.downVotesCount}
            </Typography>
            <IconButton
              sx={{
                color: "#c1c1c1",
                "&:hover": { color: red[400] },
              }}
            >
              <ImArrowDown size={23} />
            </IconButton>
          </Box>
        </Grid>
        <Grid item lg={11}>
          <Box mt={1}>
            <Box display="flex">
              <Box flexGrow="1" display="flex" alignItems="center" ml={2}>
                <Avatar
                  src="./favicon.ico"
                  sx={{
                    height: "24px",
                    width: "24px",
                  }}
                />
                <Typography fontWeight="bold" fontSize="0.9rem" ml={0.5}>
                  {activity.user.nick}
                </Typography>
                <Typography ml={2} color="#a1a1a1" fontSize="0.9rem">
                  Dodano {day}/{month}/{year} {hours}:{minutes}
                </Typography>
              </Box>
            </Box>
            <Box ml={2} mt={1}>
              <Typography fontWeight="600">{activity.text}</Typography>
            </Box>
            <Box mt={0.5} display="flex" justifyContent="center">
              <Box
                component="img"
                maxHeight="32rem"
                maxWidth="100%"
                src={activity.photo}
              />
            </Box>
            <Grid container ml={2}>
              <Grid item md={6}>
                <Box
                  display="flex"
                  alignItems="center"
                  onClick={onCommentClick}
                >
                  <IconButton>
                    <FaRegCommentDots />
                  </IconButton>
                  <Typography
                    fontWeight="600"
                    fontSize="0.95rem"
                    color="#a1a1a1"
                  >
                    {activity.commentCount}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ActivityListItem;
