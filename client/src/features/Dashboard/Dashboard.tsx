import React from "react";
import HomeLayout from "app/layout/Home";
import ActivityList from "components/CustomLink/Activities/ActivityList";

const Dashboard = () => {
  return (
    <div>
      <HomeLayout>
        <ActivityList />
      </HomeLayout>
    </div>
  );
};

export default Dashboard;
