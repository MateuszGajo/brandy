import { Box } from "@mui/material";
import { useActivityStore } from "app/provider/RootStoreProvider";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import styles from "./styles/ActivityList.style";

const ActivityList = () => {
  const { activities } = useActivityStore();
  return (
    <Box sx={styles.container}>
      {activities &&
        activities.map((activity) => <ActivityListItem activity={activity} />)}
    </Box>
  );
};

export default observer(ActivityList);
