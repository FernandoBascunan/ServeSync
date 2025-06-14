
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import Login from "../Pages/InicioSesion/InicioSesion";
import Registro from "../Pages/Registro/Registro";


const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "registro", element: <Registro/> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;