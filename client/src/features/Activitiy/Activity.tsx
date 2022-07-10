import { Box, Container } from "@mui/material";
import ActivityDetails from "components/Activities/Details/ActivityDetails";
import React from "react";
import HomeLayout from "app/layout/Home";

const Activity = () => {
  return (
    <HomeLayout>
      <Box mt={2}>
        <ActivityDetails />
      </Box>
    </HomeLayout>
  );
};

export default Activity;
