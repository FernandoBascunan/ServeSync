import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export class InventoryManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      loading: true,
      error: null
    };
  }

  
  componentDidMount() {
    this.cargarProductos();
  }

  cargarProductos = async () => {
    const empresaID = localStorage.getItem('userId'); // id de la empresa logueada
    const token = localStorage.getItem('authToken')

    if (!empresaID) {
      this.setState({ error: 'No se encontró empresaID', loading: false });
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/inventario/${empresaID}`, {
        headers:{
          Authorization: `Bearer ${token}` // usando template literal correcto
        }
      });
      this.setState({ productos: response.data, loading: false });
    } catch (err) {
      console.error(err);
      this.setState({ error: 'Error al cargar productos', loading: false });
    }
  }

  handleDeleteItem = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.delete(`http://localhost:8080/api/inventario/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Actualiza la lista quitando el producto eliminado
      this.setState((prevState) => ({
        productos: prevState.productos.filter((prod) => prod.id !== id)
      }));
    } catch (err) {
      console.error(err);
      this.setState({ error: 'Error al eliminar producto' });
    }
  };



handleModifyItem = async (producto) => {
  const token = localStorage.getItem("authToken");

  const { value: formValues } = await MySwal.fire({
    title: 'Modificar producto',
    html: `
      <div style="text-align:left">
        <label for="swal-nombre"><strong>Nombre:</strong></label>
        <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${producto.nombre}">
        <br/>
        <label for="swal-precio"><strong>Precio:</strong></label>
        <input id="swal-precio" class="swal2-input" placeholder="Precio" value="${producto.precio}">
        <br/>
        <label for="swal-stock"><strong>Stock actual:</strong></label>
        <input id="swal-stock" class="swal2-input" placeholder="Stock actual" value="${producto.stockActual}">
        <br/>
        <label for="swal-categoria"><strong>Categoría:</strong></label>
        <input id="swal-categoria" class="swal2-input" placeholder="Categoría" value="${producto.categoria}">
        <br/>
      </div>
    `,
    focusConfirm: false,
    confirmButtonText: 'Guardar cambios',
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
    preConfirm: () => {
      return {
        nombre: document.getElementById('swal-nombre').value,
        precio: document.getElementById('swal-precio').value,
        stockActual: document.getElementById('swal-stock').value,
        categoria: document.getElementById('swal-categoria').value,
      };
    }
  });

  if (!formValues) return; // Si cancelaron el popup

  try {
    const response = await axios.put(
      `http://localhost:8080/api/inventario/${producto.id}`,
      {
        id: producto.id,
        ...formValues,
        precio: parseFloat(formValues.precio),
        stockActual: parseInt(formValues.stockActual, 10),
        empresaID: producto.empresaID,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Actualizamos estado
    this.setState((prev) => ({
      productos: prev.productos.map((p) =>
        p.id === producto.id ? response.data : p
      ),
    }));

    Swal.fire('Éxito', 'Producto modificado correctamente ✅', 'success');
  } catch (err) {
    console.error(err);
    Swal.fire('Error', 'No se pudo modificar el producto ❌', 'error');
  }
};
  render() {
    const { productos, loading, error } = this.state;

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">Inventario</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={e => e.preventDefault()}>Inventario</a></li>
              <li className="breadcrumb-item active" aria-current="page">Lista de productos</li>
            </ol>
          </nav>
        </div>

        {loading && <p>Cargando productos...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && productos.length === 0 && <p>No hay productos en el inventario.</p>}

        {!loading && !error && productos.length > 0 &&
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Lista de productos</h4>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Cantidad en bodega</th>
                        <th>Precio</th>
                        <th>Categoria</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos.map(prod => (
                        <tr key={prod.id}>
                          <td>{prod.id}</td>
                          <td>{prod.nombre}</td>
                          <td>{prod.stockActual}</td>
                          <td>${prod.precio}</td>
                          <td>{prod.categoria}</td>
                          <td className="py-1">
                            <button className="btn btn-danger" onClick={() => this.handleDeleteItem(prod.id)}>Eliminar</button>
                          </td>
                          <td className="py-1">
                            <button className="btn btn-warning" onClick={() => this.handleModifyItem(prod)}>Modificar</button>
                          </td>
                          <td className="py-1">
                            <button className="btn btn-success">Uso de IA</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default InventoryManage;
