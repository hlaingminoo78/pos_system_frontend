import { createBrowserRouter, Navigate } from "react-router-dom";
import Products from "./view/Products";
import Login from "./view/Login";
import NotFound from "./view/NotFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/products" />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
