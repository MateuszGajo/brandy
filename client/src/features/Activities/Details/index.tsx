import { CircularProgress, Container } from "@mui/material";
import { Box } from "@mui/system";
import {
  useActivityStore,
  useAuthenticationStore,
  useCommentStore,
} from "app/provider/RootStoreProvider";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ActivityCommentForm from "./ActivityCommentForm";
import ActivityCommentList from "./ActivityCommentList";
import ActivityItem from "./ActivityItem";
import HomeLayout from "app/layout/Home";

const Details = () => {
  const params = useParams();
  const id = params["id"] || "";

  const { activity, loadActivity } = useActivityStore();
  const { loadComments, comments } = useCommentStore();
  const { isAuthenticated } = useAuthenticationStore();

  useEffect(() => {
    loadActivity(id || "");
    loadComments(id);
  }, [id]);

  if (!activity)
    return (
      <Box mt={2}>
        <CircularProgress />
      </Box>
    );
  return (
    <HomeLayout>
      <Box>
        <Container maxWidth="sm" sx={{ mt: 2 }}>
          <ActivityItem activity={activity} />
          {isAuthenticated ? (
            <>
              <Box height="5px" sx={{ backgroundColor: "#f8f8f8" }} />
              <ActivityCommentForm />
            </>
          ) : null}
        </Container>
        <Box height="30px" sx={{ backgroundColor: "#e1e1e1" }} />
        <ActivityCommentList comments={comments} />
      </Box>
    </HomeLayout>
  );
};

export default observer(Details);
