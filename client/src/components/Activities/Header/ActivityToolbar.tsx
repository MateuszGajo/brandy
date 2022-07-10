import { Paper, Box, IconButton, Typography, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { AiOutlineFire, AiOutlineClockCircle } from "react-icons/ai";
import { IoPodiumOutline } from "react-icons/io5";

const ActivityToolbar = () => {
  let activeEl = "hot";
  if (!activeEl) {
    activeEl = "top";
  }
  return (
    <Paper elevation={1}>
      <Box p={1.5} display="flex" justifyContent="space-around">
        <Button
          startIcon={<AiOutlineFire />}
          sx={{
            color: (theme) =>
              activeEl === "hot" ? theme.palette.primary.main : grey[600],
          }}
        >
          <Typography
            variant="body1"
            fontWeight={activeEl === "hot" ? "700" : "500"}
          >
            Hot
          </Typography>
        </Button>
        <Button
          startIcon={<AiOutlineClockCircle />}
          sx={{
            color: grey[600],
          }}
        >
          <Typography variant="body1" fontWeight="500">
            New
          </Typography>
        </Button>
        <Button
          startIcon={<IoPodiumOutline />}
          sx={{
            color: grey[600],
          }}
        >
          <Typography variant="body1" fontWeight="500">
            Top
          </Typography>
        </Button>
      </Box>
    </Paper>
  );
};

export default ActivityToolbar;
