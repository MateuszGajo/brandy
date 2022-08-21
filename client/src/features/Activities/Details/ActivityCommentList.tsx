import { List } from "@mui/material";
import { IActivity } from "app/models/Activity";
import React from "react";
import ActivityCommentListItem from "./ActivityCommentListItem";

interface IProps {
  activity: IActivity;
}

const ActivityCommentList = ({ activity }: IProps) => {
  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* {activity?.comments?.map((comment, index) => (
        <ActivityCommentListItem comment={comment} index={index} />
      ))} */}
    </List>
  );
};

export default ActivityCommentList;
