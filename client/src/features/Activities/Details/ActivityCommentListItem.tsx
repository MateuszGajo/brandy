import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { IComment } from "app/models/Comment";
import React from "react";

interface IProps {
  comment: IComment;
  index: number;
}

const ActivityCommentListItem = ({ comment, index }: IProps) => {
  return (
    <Box width="600px" alignSelf={index % 2 === 0 ? "flex-end" : "inherit"}>
      <Paper elevation={1}>
        <ListItem alignItems="flex-start" sx={{ display: "flex" }}>
          <ListItemAvatar sx={{ order: index % 2 === 0 ? 2 : 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            sx={{
              textAlign: index % 2 == 1 ? "left" : "right",
              paddingRight: index % 2 == 0 ? "10px" : 0,
            }}
            primary="Ruslav"
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {comment.text}
              </Typography>
            }
          />
        </ListItem>
      </Paper>
    </Box>
  );
};

export default ActivityCommentListItem;
