import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';

export class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      stockActual: 0,
      precio: 0,
      categoria: '',
      loading: false,
      error: '',
      success: ''
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: '', success: '' });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, stockActual, precio, categoria } = this.state;

    if (!nombre || !stockActual || !precio || !categoria) {
      this.setState({ error: 'Todos los campos son obligatorios' });
      return;
    }

    this.setState({ loading: true, error: '', success: '' });

    try {
      const token = localStorage.getItem('authToken');
      const empresaID = parseInt(localStorage.getItem('userId'));

      const payload = {
        nombre,
        stockActual: parseInt(stockActual),
        precio: parseFloat(precio),
        categoria,
        empresaID
      };

      const response = await axios.post(
        'http://localhost:8080/api/inventario',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      this.setState({
        success: `Producto "${response.data.nombre}" agregado correctamente`,
        nombre: '',
        stockActual: 0,
        precio: 0,
        categoria: '',
        loading: false
      });
    } catch (error) {
      console.error(error);
      this.setState({
        error: error.response?.data?.message || 'Error al agregar producto',
        loading: false
      });
    }
  };

  render() {
    const { nombre, stockActual, precio, categoria, loading, error, success } = this.state;

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">Inventario</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={e => e.preventDefault()}>Inventario</a></li>
              <li className="breadcrumb-item active" aria-current="page">Agregar Producto</li>
            </ol>
          </nav>
        </div>

        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Agregar un producto nuevo al Inventario</h4>
              <p className="card-description">Llenando las celdas en este formulario logras agregar un producto nuevo a tu inventario</p>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <Form onSubmit={this.handleSubmit} className="forms-sample">
                <Form.Group>
                  <label>Nombre del producto</label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    placeholder="Nombre del producto"
                    value={nombre}
                    onChange={this.handleInputChange}
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group>
                  <label>Cantidad inicial en bodega</label>
                  <Form.Control
                    type="number"
                    name="stockActual"
                    placeholder="0"
                    value={stockActual}
                    onChange={this.handleInputChange}
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group>
                  <label>Precio unitario</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-primary text-white">$</span>
                    </div>
                    <Form.Control
                      type="number"
                      name="precio"
                      placeholder="0.00"
                      value={precio}
                      onChange={this.handleInputChange}
                      disabled={loading}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">.00</span>
                    </div>
                  </div>
                </Form.Group>

                <Form.Group>
                  <label>Categoria</label>
                  <Form.Control
                    type="text"
                    name="categoria"
                    placeholder="Categoria del producto"
                    value={categoria}
                    onChange={this.handleInputChange}
                    disabled={loading}
                  />
                </Form.Group>

                <button type="submit" className="btn btn-primary mr-2" disabled={loading}>
                  {loading ? 'AGREGANDO...' : 'Agregar'}
                </button>
                <button className="btn btn-light" onClick={e => { e.preventDefault(); this.setState({ nombre:'', stockActual:0, precio:0, categoria:'' }) }}>Cancelar</button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProduct;
