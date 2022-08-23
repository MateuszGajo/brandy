import { List } from "@mui/material";
import { IComment } from "app/models/Comment";
import React from "react";
import ActivityCommentListItem from "./ActivityCommentListItem";

interface IProps {
  comments: IComment[] | null;
}

const ActivityCommentList = ({ comments }: IProps) => {
  if (!comments) return null;
  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {comments?.map((comment, index) => (
        <ActivityCommentListItem comment={comment} index={index} />
      ))}
    </List>
  );
};

export default ActivityCommentList;
