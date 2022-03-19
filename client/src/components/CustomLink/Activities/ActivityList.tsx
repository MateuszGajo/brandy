import { Box } from "@mui/material";
import { IActivity } from "app/models/Activity";
import React from "react";
import Activity from "./Activity";
import styles from "./styles/ActivityList.style";

const ActivityList = () => {
  const activities: IActivity[] = [
    {
      id: "1",
      user: {
        nick: "Danny",
      },
      title: "New post",
      photo:
        "https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?cs=srgb&dl=pexels-nextvoyage-1461974.jpg&fm=jpg",
      commentCount: 5,
      likeCount: 10,
      date: new Date(),
    },
    {
      id: "2",
      user: {
        nick: "John",
      },
      title: "activity",
      photo:
        "https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg",
      commentCount: 15,
      likeCount: 0,
      date: new Date(),
    },
  ];
  return (
    <Box sx={styles.container}>
      {activities.map((activity) => (
        <Activity activity={activity} />
      ))}
    </Box>
  );
};

export default ActivityList;
