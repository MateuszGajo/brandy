import { lazyImport } from "app/utils/lazyImport";
const { AuthRoutes } = lazyImport(
  () => import("features/views/auth"),
  "AuthRoutes"
);
export const publicRoutes = [
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
];
