import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect } from "react";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaRegCommentDots } from "react-icons/fa";
import { red } from "@mui/material/colors";
import { useActivityStore } from "app/provider/RootStoreProvider";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

const ActivityDetails = () => {
  const params = useParams();
  const id = params["id"];

  const { activity, loadActivity } = useActivityStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    loadActivity(id || "");
  }, [id]);

  if (!activity)
    return (
      <Box mt={2}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box>
      <Container maxWidth="sm">
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
                  20
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
              <Box>
                <Box display="flex">
                  <Box
                    flexGrow="1"
                    display="flex"
                    alignItems="center"
                    ml={2}
                    mt={2}
                  >
                    <Avatar
                      src="./favicon.ico"
                      sx={{
                        height: "24px",
                        width: "24px",
                      }}
                    />
                    <Typography fontWeight="bold" fontSize="0.9rem" ml={0.5}>
                      Danny
                    </Typography>
                    <Typography ml={2} color="#a1a1a1" fontSize="0.9rem">
                      Dodano 24/02/2020
                    </Typography>
                  </Box>
                </Box>
                <Box ml={2}>
                  <Typography fontWeight="600">Title tile tile</Typography>
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
                        {activity.comments.length}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Box height="30px" sx={{ backgroundColor: "#e1e1e1" }} />

      <List sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        {activity.comments.map((commnect, index) => (
          <Box
            width="600px"
            alignSelf={index % 2 === 0 ? "flex-end" : "inherit"}
          >
            <Paper elevation={1}>
              <ListItem alignItems="flex-start" sx={{ display: "flex" }}>
                <ListItemAvatar sx={{ order: index % 2 === 0 ? 2 : 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    textAlign: index % 2 == 1 ? "left" : "right",
                    paddingRight: index % 2 == 0 ? "10px" : 0,
                  }}
                  primary="Ruslav"
                  secondary={
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      I'll be in your neighborhood doing errands this…
                    </Typography>
                  }
                />
              </ListItem>
            </Paper>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default observer(ActivityDetails);
