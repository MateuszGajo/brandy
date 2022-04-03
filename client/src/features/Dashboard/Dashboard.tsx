import React from "react";
import HomeLayout from "app/layout/Home";
import ActivityList from "components/Activities/ActivityList";
import ActivityToolbar from "components/Activities/ActivityToolbar";

const Dashboard = () => {
  return (
    <div>
      <HomeLayout>
        <ActivityToolbar />
        <ActivityList />
      </HomeLayout>
    </div>
  );
};

export default Dashboard;
