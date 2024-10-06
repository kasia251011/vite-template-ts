import Login from "@/app/LoginPage";
import PATHS from "./paths";
import { Navigate, RouteObject } from "react-router-dom";
import ActivateAccountPage from "@/app/ActivateAccountPage";

function publicRoutes(): RouteObject[] {
  return [
    {
      path: PATHS.LOGIN,
      element: <Login />,
    },
    {
      path: PATHS.ACTIVATE_ACCOUNT,
      element: <ActivateAccountPage />,
    },
    {
      path: "*",
      element: <Navigate to={PATHS.LOGIN} replace />,
    },
  ];
}

export default publicRoutes;
