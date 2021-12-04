import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { useRoutes } from "react-router-dom";

export const AppRoutes = () => {
  const authenticated = false;
  const commonRoutes: any[] = [];
  const routes = authenticated ? protectedRoutes : publicRoutes;
  const element = useRoutes([...commonRoutes, ...routes]);

  return <>{element}</>;
};
