import React, { Component } from 'react';
import axios from 'axios';
import './Zone.scss'; // asegúrate de crear este archivo o importarlo en App.scss

export class Zone extends Component {
  state = {
    mesas: [],
    mesaSeleccionada: null,
    mostrarModal: false,
    ocupantesTemp: 0,
    capacidadTemp: 0,
    cantidadMesas: 0,
    capacidades: []
  };

  componentDidUpdate(prevProps) {
    const zonaIdActual = this.props.match?.params?.id || localStorage.getItem('zonaSeleccionada');
    const zonaIdAnterior = prevProps.match?.params?.id || localStorage.getItem('zonaSeleccionada');

    if (zonaIdActual !== zonaIdAnterior) {
      this.cargarMesasZona();
    }
  }

  cargarMesasZona = async () => {
    const zonaId = this.props.match?.params?.id || localStorage.getItem('zonaSeleccionada');
    if (!zonaId) return;

    try {
      const response = await axios.get(`http://localhost:8080/api/mesas/${zonaId}`);
      this.setState({ mesas: Array.isArray(response.data) ? response.data : [] });
    } catch (error) {
      console.error("Error al cargar mesas:", error);
      this.setState({ mesas: [] });
    }
  };

  handleZonaSeleccionada = (idZona) => {
    localStorage.setItem('zonaSeleccionada', idZona);
    this.cargarMesasZona();
  };

  handleMesaClick = (mesa) => {
    this.setState({
      mesaSeleccionada: mesa,
      mostrarModal: true,
      ocupantesTemp: mesa.ocupantes || 0,
      capacidadTemp: mesa.capacidad
    });
  };

  handleCerrarModal = () => {
    this.setState({ mostrarModal: false, mesaSeleccionada: null });
  };

  handleGuardarCambios = () => {
    const { mesaSeleccionada, ocupantesTemp, capacidadTemp } = this.state;

    if (ocupantesTemp > capacidadTemp) {
      alert("Ocupantes no pueden ser mayores que la capacidad");
      return;
    }

    const mesasActualizadas = this.state.mesas.map(mesa =>
      mesa.id === mesaSeleccionada.id
        ? { ...mesa, ocupantes: ocupantesTemp, capacidad: capacidadTemp, ocupacion: `${ocupantesTemp}/${capacidadTemp}` }
        : mesa
    );

    this.setState({ mesas: mesasActualizadas, mostrarModal: false, mesaSeleccionada: null });
  };

  handleCrearMesas = async () => {
    const { cantidadMesas, capacidades } = this.state;
    const zonaId = this.props.match?.params?.id || localStorage.getItem('zonaSeleccionada');

    if (!zonaId) return alert("Debe seleccionar una zona");
    if (cantidadMesas <= 0) return alert("Cantidad inválida");

    try {
      for (let i = 0; i < cantidadMesas; i++) {
        const nuevaMesa = {
          capacidad: capacidades[i] || 4,
          zona: { id: parseInt(zonaId) },
          status: true
        };
        await axios.post("http://localhost:8080/api/mesas", nuevaMesa);
      }

      await this.cargarMesasZona();
      alert("Mesas creadas correctamente ✅");
    } catch (error) {
      console.error("Error al crear mesas:", error);
      alert("Hubo un error al crear las mesas");
    }
  };

  render() {
    const { mesas, mostrarModal, mesaSeleccionada, cantidadMesas, capacidades, ocupantesTemp, capacidadTemp } = this.state;

    return (
      <div className="zone-container">
        {mesas.length === 0 ? (
          <div className="crear-mesas">
            <p>Esta zona no tiene mesas. Configure cuántas desea crear:</p>

            <input
              type="number"
              placeholder="Cantidad de mesas"
              value={cantidadMesas}
              onChange={e => {
                const cantidad = parseInt(e.target.value) || 0;
                this.setState({ cantidadMesas: cantidad, capacidades: Array(cantidad).fill(4) });
              }}
              min="1"
              max="50"
              className="input-principal"
            />

            {cantidadMesas > 0 && capacidades.map((cap, idx) => (
              <div key={idx} className="input-grupo">
                <label>Mesa {idx + 1}</label>
                <input
                  type="number"
                  value={cap}
                  onChange={e => {
                    const nuevasCap = [...capacidades];
                    nuevasCap[idx] = parseInt(e.target.value) || 1;
                    this.setState({ capacidades: nuevasCap });
                  }}
                  min="1"
                  max="20"
                />
              </div>
            ))}

            <button className="btn-crear" onClick={this.handleCrearMesas}>Crear Mesas</button>
          </div>
        ) : (
          <div className="mesas-grid">
            {mesas.map(mesa => (
              <div
                key={mesa.id}
                className="mesa-card"
                onClick={() => this.handleMesaClick(mesa)}
              >
                <span className="mesa-numero">{mesa.id}°</span>
                <span className="mesa-ocupacion">
                  {mesa.ocupacion || `${mesa.ocupantes || 0}/${mesa.capacidad}`}
                </span>
              </div>
            ))}
          </div>
        )}

        {mostrarModal && mesaSeleccionada && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h5>Editar Mesa {mesaSeleccionada.id}</h5>
              <button className="btn-cerrar" onClick={this.handleCerrarModal}>×</button>

              <div className="modal-inputs">
                <label>Capacidad:</label>
                <input
                  type="number"
                  value={capacidadTemp}
                  onChange={e => this.setState({ capacidadTemp: parseInt(e.target.value) || 0 })}
                  min="1"
                  max="20"
                />
                <label>Ocupantes:</label>
                <input
                  type="number"
                  value={ocupantesTemp}
                  onChange={e => this.setState({ ocupantesTemp: parseInt(e.target.value) || 0 })}
                  min="0"
                  max={capacidadTemp}
                />
              </div>
              <button className="btn-guardar" onClick={this.handleGuardarCambios}>Guardar</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Zone;
