
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
import AgregarProducto from "../Pages/AgregarProducto/AgregarProducto";
import AgregarPedido from "../Pages/AgregarPedido/AgregarPedido";
import AgregarZona from "../Pages/AgregarZona/AgregarZona";
import DetallesProducto from "../Pages/DetallesProducto/DetallesProducto";
import DetallesPedido from "../Pages/DetallesPedido/DetallesPedido";

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
      { path: "agregarProducto", element: <AgregarProducto />},
      { path: "agregarZona", element: <AgregarZona />},
      { path: "detallesProducto", element: <DetallesProducto />},
      { path: "detallesPedido", element: <DetallesPedido />},
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;