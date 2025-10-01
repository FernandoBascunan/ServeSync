import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';

export class AddZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreZona: "",
      cantidadMesas: 0,
      asientos: [],
      descripcion: "",
      loading: false,
      error: "",
      success: ""
    };
  }

  handleCantidadMesasChange = (e) => {
    const cantidad = parseInt(e.target.value) || 0;
    this.setState({
      cantidadMesas: cantidad,
      asientos: Array(cantidad).fill("")
    });
  };

  handleAsientosChange = (index, value) => {
    const newAsientos = [...this.state.asientos];
    newAsientos[index] = value;
    this.setState({ asientos: newAsientos });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { nombreZona, cantidadMesas, asientos, descripcion } = this.state;

    if (!nombreZona || cantidadMesas <= 0 || asientos.some(a => !a)) {
      this.setState({ error: 'Todos los campos son obligatorios', success: '' });
      return;
    }

    this.setState({ loading: true, error: '', success: '' });

    try {
      const token = localStorage.getItem('authToken');
      const empresaID = parseInt(localStorage.getItem('userId'));

      // 1️⃣ Crear la zona
      const zonaPayload = {
        nombre_zona: nombreZona,
        empresa_id: empresaID,
        descripcion
      };

      const zonaResponse = await axios.post(
        'http://localhost:8080/api/zonas',
        zonaPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      this.setState({
        success: `Zona "${nombreZona}" creada correctamente con ${cantidadMesas} mesas`,
        nombreZona: '',
        cantidadMesas: 0,
        asientos: [],
        descripcion: '',
        loading: false
      });
    } catch (error) {
      console.error(error);
      this.setState({
        error: error.response?.data?.message || 'Error al crear zona',
        loading: false
      });
    }
  };

  render() {
    const { nombreZona, cantidadMesas, asientos, descripcion, loading, error, success } = this.state;

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">Zonas de mesas</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>Zona de mesas</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Agregar Zona</li>
            </ol>
          </nav>
        </div>

        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Agregar una zona nueva</h4>
              <p className="card-description">Aquí podrás agregar una zona nueva donde podrás asignar todas las mesas que quieras</p>

              {loading && <p>Cargando...</p>}
              {error && <p className="text-danger">{error}</p>}
              {success && <p className="text-success">{success}</p>}

              <form className="forms-sample" onSubmit={this.handleSubmit}>
                <Form.Group>
                  <label htmlFor="nombreZona">Nombre de la zona</label>
                  <Form.Control
                    type="text"
                    id="nombreZona"
                    placeholder="Nombre de la zona"
                    value={nombreZona}
                    onChange={(e) => this.setState({ nombreZona: e.target.value })}
                  />
                </Form.Group>
                <br />

                <Form.Group>
                  <label htmlFor="cantidadMesas">Cantidad de mesas</label>
                  <Form.Control
                    type="number"
                    id="cantidadMesas"
                    placeholder="0"
                    value={cantidadMesas}
                    onChange={this.handleCantidadMesasChange}
                  />
                </Form.Group>
                <br />

                {asientos.map((asiento, index) => (
                  <Form.Group key={index}>
                    <label>Mesa {index + 1} - Asientos máximos</label>
                    <Form.Control
                      type="number"
                      placeholder="0"
                      value={asiento}
                      onChange={(e) => this.handleAsientosChange(index, e.target.value)}
                    />
                    <br />
                  </Form.Group>
                ))}

                <Form.Group>
                  <label htmlFor="descripcion">Descripción</label>
                  <textarea
                    id="descripcion"
                    className="form-control"
                    rows="3"
                    value={descripcion}
                    onChange={(e) => this.setState({ descripcion: e.target.value })}
                  ></textarea>
                </Form.Group>
                <br />

                <button type="submit" className="btn btn-primary mr-2">Agregar</button>
                <button type="button" className="btn btn-light">Cancelar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddZone;
