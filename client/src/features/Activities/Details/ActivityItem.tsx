import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { IActivityDetails } from "app/models/Activity";
import { getDate } from "app/utils/Date";
import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { ImArrowDown, ImArrowUp } from "react-icons/im";

interface IProps {
  activity: IActivityDetails;
}

const ActivityItem = ({ activity }: IProps) => {
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
                <Box display="flex" alignItems="center">
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

export default ActivityItem;
