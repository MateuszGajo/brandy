import { CircularProgress, Container } from "@mui/material";
import { Box } from "@mui/system";
import {
  useActivityStore,
  useAuthenticationStore,
} from "app/provider/RootStoreProvider";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ActivityCommentForm from "./ActivityCommentForm";
import ActivityCommentList from "./ActivityCommentList";
import ActivityItem from "./ActivityItem";

const Details = () => {
  const params = useParams();
  const id = params["id"] || "";

  const { activity, loadActivity } = useActivityStore();
  const { isAuthenticated } = useAuthenticationStore();

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
        <ActivityItem activity={activity} />
        {isAuthenticated ? (
          <>
            <Box height="5px" sx={{ backgroundColor: "#f8f8f8" }} />
            <ActivityCommentForm />
          </>
        ) : null}
      </Container>
      <Box height="30px" sx={{ backgroundColor: "#e1e1e1" }} />
      <ActivityCommentList activity={activity} />
    </Box>
  );
};

export default Details;
