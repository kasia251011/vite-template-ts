import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth, useUserRole } from "@/redux/selectors";
import publicRoutes from "@/router/publicRoutes";
import privateRoutes from "@/router/privateRoutes";

const Router = () => {
  const isAuth = useAuth();
  const userRole = useUserRole();
  const router = createBrowserRouter([
    ...(isAuth && userRole ? privateRoutes() : [{}]),
    ...publicRoutes(),
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
