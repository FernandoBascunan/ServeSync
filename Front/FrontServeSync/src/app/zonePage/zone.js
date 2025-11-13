import React, { Component } from 'react';
import axios from 'axios';
import './zone.scss';

export class Zone extends Component {
  state = {
    mesas: [],
    mesaSeleccionada: null,
    mostrarModal: false,
    cantidadMesas: 0,
    capacidades: []
  };

  componentDidMount() {
    this.cargarMesasZona();
  }

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
    localStorage.setItem("mesaId", mesa.id)
    this.setState({
      mesaSeleccionada: mesa,
      mostrarModal: true
    });
  };

  handleCerrarModal = () => {
    this.setState({ mostrarModal: false, mesaSeleccionada: null });
  };

  handleGuardarCambios = async () => {
    const { mesaSeleccionada } = this.state;

    try {
      await axios.put(`http://localhost:8080/api/mesas/${mesaSeleccionada.id}`, mesaSeleccionada);

      this.setState(prev => ({
        mesas: prev.mesas.map(m => m.id === mesaSeleccionada.id ? mesaSeleccionada : m),
        mostrarModal: false,
        mesaSeleccionada: null
      }));

      alert("Estado actualizado correctamente ✅");
    } catch (error) {
      console.error("Error al actualizar mesa:", error);
      alert("Hubo un error al actualizar el estado de la mesa");
    }
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
          status: "Libre",
          zona: { id: parseInt(zonaId) }
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

  handleEliminarMesa = async () => {
    const mesaId = localStorage.getItem("mesaId")
    try {
      await axios.delete(`http://localhost:8080/api/mesas/${mesaId}`);
      this.setState(prev => ({
        mesas: prev.mesas.filter(m => m.id !== parseInt(mesaId)),
        mostrarModal: false,  
        mesaSeleccionada: null      
      }));
      alert("Mesa eliminada ✅");
    } catch (error) {
      console.error("Error al eliminar mesa:", error);
      alert("Hubo un error al eliminar la mesa");
    }
  };

  handleDeleteZone = async ()=>{
    const idGuardado = localStorage.getItem('zonaSeleccionada');
    try{
      await axios.delete(`http://localhost:8080/api/mesas/zonas/${idGuardado}`)

      alert("Zona eliminada ✅");

      await this.props.cargarZonas(); 
      await this.props.history.push("/homeee/home");
    } catch (error) {
      console.error("Error al eliminar la zona. error)")
    }

  }

  render() {
    const { mesas, mostrarModal, mesaSeleccionada, cantidadMesas, capacidades} = this.state;

    return (

      <div>
        <div className="page-header">
          <h3 className="page-title">Zonas</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={e => e.preventDefault()}>Zonas de mesas</a></li>
              <li className="breadcrumb-item active" aria-current="page">Nombre de la zona</li>
            </ol>
          </nav>
        </div>
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

            <button className="btn-crear" onClick={this.handleCrearMesas}>Crear Mesas</button>
          </div>
        ) : (
          <div className="mesas-grid">
            {mesas.map((mesa, index) => (
              <div
                key={mesa.id}
                className={`mesa-card status-${mesa.status?.toLowerCase() || 'libre'}`}
                onClick={() => this.handleMesaClick(mesa)}
              >
                <span className="mesa-numero">{index + 1}°</span>
                <span className="mesa-status">{mesa.status || "Libre"}</span>
              </div>
            ))}
          </div>
        )}
        <div className='center'>
          <button className='btn-deleteZone' onClick={this.handleDeleteZone}> Eliminar zona</button>
        </div>

        {mostrarModal && mesaSeleccionada && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h5>Editar Mesa</h5>
              <button className="btn-cerrar" onClick={this.handleCerrarModal}>×</button>

              <div className="modal-inputs">
                <label>Estado de la mesa:</label>
                <select
                  value={mesaSeleccionada.status || "Libre"}
                  onChange={e =>
                    this.setState({
                      mesaSeleccionada: { ...mesaSeleccionada, status: e.target.value }
                    })
                  }
                >
                  <option value="Libre">Libre</option>
                  <option value="Ocupada">Ocupada</option>
                  <option value="Reservada">Reservada</option>
                </select>
              </div>
              <button className="btn-guardar" onClick={this.handleGuardarCambios}>Guardar</button>
              <button className="btn-eliminar" onClick={this.handleEliminarMesa}>Eliminar Mesa</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Zone;
