import React from "react";
import AppProvider from "app/provider/AppProvider";
import { AppRoutes } from "app/routes";

const App: React.FunctionComponent = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
