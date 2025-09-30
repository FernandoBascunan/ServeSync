import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

export class AddZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreZona: "",
      cantidadMesas: 0,
      asientos: [],
      descripcion: ""
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

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", this.state);
    // Aquí podrías mandar los datos a tu backend
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">Zonas de mesas</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Zona de mesas
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Agregar Zona
              </li>
            </ol>
          </nav>
        </div>

        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Agregar una zona nueva</h4>
              <p className="card-description">
                Aquí podrás agregar una zona nueva donde podrás asignar todas las mesas que quieras
              </p>

              <form className="forms-sample" onSubmit={this.handleSubmit}>
                <Form.Group>
                  <label htmlFor="nombreZona">Nombre de la zona</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="nombreZona"
                    placeholder="Nombre de la zona"
                    value={this.state.nombreZona}
                    onChange={(e) => this.setState({ nombreZona: e.target.value })}
                  />
                </Form.Group>

                <Form.Group>
                  <label htmlFor="cantidadMesas">Cantidad de mesas</label>
                  <Form.Control
                    type="number"
                    className="form-control"
                    id="cantidadMesas"
                    placeholder="0"
                    value={this.state.cantidadMesas}
                    onChange={this.handleCantidadMesasChange}
                  />
                </Form.Group>

                {/* Render dinámico de inputs para asientos */}
                {this.state.asientos.map((asiento, index) => (
                  <Form.Group key={index}>
                    <label>Mesa {index + 1} - Asientos máximos</label>
                    <Form.Control
                      type="number"
                      className="form-control"
                      placeholder="0"
                      value={asiento}
                      onChange={(e) => this.handleAsientosChange(index, e.target.value)}
                    />
                  </Form.Group>
                ))}

                <Form.Group>
                  <label htmlFor="descripcion">Descripción</label>
                  <textarea
                    className="form-control"
                    id="descripcion"
                    rows="4"
                    value={this.state.descripcion}
                    onChange={(e) => this.setState({ descripcion: e.target.value })}
                  ></textarea>
                </Form.Group>

                <button type="submit" className="btn btn-primary mr-2">
                  Agregar
                </button>
                <button type="button" className="btn btn-light">
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddZone;
