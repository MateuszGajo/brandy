import { Paper, Box, IconButton, Typography, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useActivityStore } from "app/provider/RootStoreProvider";
import { observer } from "mobx-react-lite";
import React from "react";
import { AiOutlineFire, AiOutlineClockCircle } from "react-icons/ai";
import { IoPodiumOutline } from "react-icons/io5";

const ActivityToolbar = () => {
  const { filters, setFilters } = useActivityStore();
  return (
    <Paper elevation={1}>
      <Box p={1.5} display="flex" justifyContent="space-around">
        <Button
          startIcon={<AiOutlineFire />}
          sx={{
            color: (theme) =>
              filters.sort === "hot" ? theme.palette.primary.main : grey[600],
          }}
          onClick={() => setFilters({ sort: "hot" })}
        >
          <Typography
            variant="body1"
            fontWeight={filters.sort === "hot" ? "700" : "500"}
          >
            Gorące
          </Typography>
        </Button>
        <Button
          startIcon={<AiOutlineClockCircle />}
          sx={{
            color: (theme) =>
              filters.sort === "new" ? theme.palette.primary.main : grey[600],
          }}
          onClick={() => setFilters({ sort: "new" })}
        >
          <Typography
            variant="body1"
            fontWeight={filters.sort === "new" ? "700" : "500"}
          >
            Nowe
          </Typography>
        </Button>
        <Button
          startIcon={<IoPodiumOutline />}
          sx={{
            color: (theme) =>
              filters.sort === "top" ? theme.palette.primary.main : grey[600],
          }}
          onClick={() => setFilters({ sort: "top" })}
        >
          <Typography
            variant="body1"
            fontWeight={filters.sort === "top" ? "700" : "500"}
          >
            Popularne
          </Typography>
        </Button>
      </Box>
    </Paper>
  );
};

export default observer(ActivityToolbar);
