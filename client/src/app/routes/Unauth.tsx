import { useAuthenticationStore } from "app/provider/RootStoreProvider";
import { observer } from "mobx-react-lite";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Unauth = () => {
  const { isAuthenticated } = useAuthenticationStore();
  if (isAuthenticated) return <Navigate to="/" />;
  return <Outlet />;
};

export default observer(Unauth);
