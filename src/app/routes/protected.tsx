import { Box, CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      }
    >
      <Outlet />
    </Suspense>
  );
};

export const protectedRoutes = [
  {
    path: "/app",
    element: <App />,
    children: [],
  },
];
