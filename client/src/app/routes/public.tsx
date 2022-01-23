import { lazyImport } from "app/utils/lazyImport";
const { AuthRoutes } = lazyImport(() => import("features/auth"), "AuthRoutes");
export const publicRoutes = [
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
];
