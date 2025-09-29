import React, { Component } from 'react';
import axios from 'axios';

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
                            <button className="btn btn-danger">Eliminar</button>
                          </td>
                          <td className="py-1">
                            <button className="btn btn-warning">Modificar</button>
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
