
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import Login from "../Pages/InicioSesion/InicioSesion";
import Registro from "../Pages/Registro/Registro";
import Perfil from "../Pages/Perfil/Perfil";
import Inventario from "../Pages/Inventario/Inventario";
import Mesas from "../Pages/Mesas/Mesas";
import Pedidos from "../Pages/Pedidos/Pedidos";


const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "registro", element: <Registro/> },
      { path: "perfil", element: <Perfil /> },
      { path: "inventario", element: <Inventario /> },
      { path: "mesas", element: <Mesas /> },
      { path: "pedidos", element: <Pedidos />},
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;