import { List } from "@mui/material";
import { IActivityDetails } from "app/models/Activity";
import React from "react";
import ActivityCommentListItem from "./ActivityCommentListItem";

interface IProps {
  activity: IActivityDetails;
}

const ActivityCommentList = ({ activity }: IProps) => {
  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {activity.comments.map((comment, index) => (
        <ActivityCommentListItem comment={comment} index={index} />
      ))}
    </List>
  );
};

export default ActivityCommentList;
