import { Navigate, RouteObject } from "react-router-dom";
import PATHS from "./paths";
import HomePage from "../app/HomePage";

function privateRoutes(): RouteObject[] {
  return [
    {
      path: PATHS.HOME,
      element: <HomePage />,
    },
    { path: "*", element: <Navigate to={PATHS.HOME} replace /> },
  ];
}

export default privateRoutes;
