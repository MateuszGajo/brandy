import { useAuthenticationStore } from "app/provider/RootStoreProvider";
import { observer } from "mobx-react-lite";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { user, isLoading } = useAuthenticationStore();
  if (isLoading) return null;
  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
};

export default observer(RequireAuth);
