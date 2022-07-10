import React from "react";
import HomeLayout from "app/layout/Home";
import ActivityList from "components/Activities/List/ActivityList";
import ActivityToolbar from "components/Activities/Header/ActivityToolbar";
import { Box, Container } from "@mui/material";

const Dashboard = () => {
  return (
    <div>
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
    </div>
  );
};

export default Dashboard;
