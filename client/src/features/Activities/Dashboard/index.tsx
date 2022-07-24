import React from "react";
import HomeLayout from "app/layout/Home";
import { Box, Container } from "@mui/material";
import ActivityToolbar from "./ActivityToolbar";
import ActivityList from "./ActivityList";

const Dashboard = () => {
  return (
    <HomeLayout>
      <Container maxWidth="sm">
        <Box mt={4}>
          <ActivityToolbar />
        </Box>
        <Box mt={2}>
          <ActivityList />
        </Box>
      </Container>
    </HomeLayout>
  );
};

export default Dashboard;
