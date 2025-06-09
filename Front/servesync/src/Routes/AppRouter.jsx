import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import Login from "../Pages/InicioSesion/InicioSesion";


const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <Login /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;