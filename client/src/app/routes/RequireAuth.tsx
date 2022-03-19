import { useAuthenticationStore } from "app/provider/RootStoreProvider";
import { observer } from "mobx-react-lite";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { isAuthenticated } = useAuthenticationStore();
  if (!isAuthenticated) return <Navigate to="/signin" />;
  return <Outlet />;
};

export default observer(RequireAuth);
