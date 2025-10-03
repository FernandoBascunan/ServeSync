import React, { Component } from 'react';

export class Zone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mesas: [], // arranca vacío
      mesaSeleccionada: null,
      mostrarModal: false,
      ocupantesTemp: 0,
      capacidadTemp: 0,

      // para crear mesas dinámicamente
      cantidadMesas: 0,
      capacidades: [] // arreglo con capacidad por mesa
    };
  }

  handleMesaClick = (mesa) => {
    this.setState({
      mesaSeleccionada: mesa,
      mostrarModal: true,
      ocupantesTemp: mesa.ocupantes,
      capacidadTemp: mesa.capacidad
    });
  }

  handleCerrarModal = () => {
    this.setState({
      mostrarModal: false,
      mesaSeleccionada: null
    });
  }

  handleGuardarCambios = () => {
    const { mesaSeleccionada, ocupantesTemp, capacidadTemp } = this.state;
    
    if (ocupantesTemp > capacidadTemp) {
      alert('El número de ocupantes no puede ser mayor que la capacidad');
      return;
    }

    const mesasActualizadas = this.state.mesas.map(mesa => {
      if (mesa.id === mesaSeleccionada.id) {
        return {
          ...mesa,
          ocupantes: ocupantesTemp,
          capacidad: capacidadTemp,
          ocupacion: `${ocupantesTemp}/${capacidadTemp}`
        };
      }
      return mesa;
    });

    this.setState({
      mesas: mesasActualizadas,
      mostrarModal: false,
      mesaSeleccionada: null
    });
  }

  // ---- NUEVA LÓGICA ----
  handleCrearMesas = () => {
    const { cantidadMesas, capacidades } = this.state;

    if (cantidadMesas <= 0) {
      alert("Debe ingresar una cantidad válida de mesas.");
      return;
    }

    const nuevasMesas = Array.from({ length: cantidadMesas }, (_, i) => ({
      id: i + 1,
      grado: i + 1,
      ocupacion: `0/${capacidades[i] || 4}`, // si no hay valor, default 4
      ocupantes: 0,
      capacidad: capacidades[i] || 4
    }));

    this.setState({ mesas: nuevasMesas });
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">Mesas</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={event => event.preventDefault()}>Inicio</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Mesas</li>
            </ol>
          </nav>
        </div>

        <div className="col-md-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Estado de Mesas</h4>

              {this.state.mesas.length === 0 ? (
                // --- FORMULARIO DINÁMICO ---
                <div>
                  <p className="card-description">
                    Esta zona no tiene mesas. Configure cuántas desea crear:
                  </p>

                  <div className="form-group">
                    <label>Cantidad de Mesas:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.cantidadMesas}
                      onChange={(e) => {
                        const cantidad = parseInt(e.target.value) || 0;
                        this.setState({
                          cantidadMesas: cantidad,
                          capacidades: Array(cantidad).fill(4) // default capacidad 4
                        });
                      }}
                      min="1"
                      max="50"
                    />
                  </div>

                  {this.state.cantidadMesas > 0 && (
                    <div>
                      <h5>Capacidad por mesa:</h5>
                      {this.state.capacidades.map((cap, idx) => (
                        <div key={idx} className="form-group">
                          <label>Mesa {idx + 1}:</label>
                          <input
                            type="number"
                            className="form-control"
                            value={cap}
                            onChange={(e) => {
                              const nuevasCap = [...this.state.capacidades];
                              nuevasCap[idx] = parseInt(e.target.value) || 1;
                              this.setState({ capacidades: nuevasCap });
                            }}
                            min="1"
                            max="20"
                          />
                        </div>
                      ))}
                      <button className="btn btn-primary mt-3" onClick={this.handleCrearMesas}>
                        Crear Mesas
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // --- GRID DE MESAS ---
                <div className="mesas-container">
                  <div className="mesas-grid">
                    {this.state.mesas.map((mesa) => (
                      <div 
                        key={mesa.id} 
                        className="mesa-circle"
                        onClick={() => this.handleMesaClick(mesa)}
                      >
                        <div className="mesa-grado">{mesa.grado}°</div>
                        <div className="mesa-ocupacion">{mesa.ocupacion}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal para editar mesa */}
              {this.state.mostrarModal && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5>Editar Mesa {this.state.mesaSeleccionada?.grado}°</h5>
                      <button 
                        className="btn-close" 
                        onClick={this.handleCerrarModal}
                      >
                        ×
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="form-group">
                        <label>Capacidad máxima:</label>
                        <input
                          type="number"
                          className="form-control"
                          value={this.state.capacidadTemp}
                          onChange={(e) => this.setState({ capacidadTemp: parseInt(e.target.value) || 0 })}
                          min="1"
                          max="20"
                        />
                      </div>
                      <div className="form-group">
                        <label>Ocupantes actuales:</label>
                        <input
                          type="number"
                          className="form-control"
                          value={this.state.ocupantesTemp}
                          onChange={(e) => this.setState({ ocupantesTemp: parseInt(e.target.value) || 0 })}
                          min="0"
                          max={this.state.capacidadTemp}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button 
                        className="btn btn-secondary" 
                        onClick={this.handleCerrarModal}
                      >
                        Cancelar
                      </button>
                      <button 
                        className="btn btn-primary" 
                        onClick={this.handleGuardarCambios}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Zone;
