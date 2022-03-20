import React from "react";
import AppProvider from "app/provider/AppProvider";
import AppRoutes from "app/routes";
import Dashboard from "features/Dashboard/Dashboard";
const App: React.FunctionComponent = () => {
  return (
    <AppProvider>
      {/* <AppRoutes /> */}
      <Dashboard />
    </AppProvider>
  );
};

export default App;
