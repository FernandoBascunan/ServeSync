import React, { Component } from 'react';

export class zone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mesas: [
        { id: 1, grado: 1, ocupacion: "2/4", ocupantes: 2, capacidad: 4 },
        { id: 2, grado: 2, ocupacion: "2/4", ocupantes: 2, capacidad: 4 },
        { id: 3, grado: 3, ocupacion: "3/4", ocupantes: 3, capacidad: 4 },
        { id: 4, grado: 7, ocupacion: "6/8", ocupantes: 6, capacidad: 8 },
        { id: 5, grado: 4, ocupacion: "3/4", ocupantes: 3, capacidad: 4 },
        { id: 6, grado: 5, ocupacion: "4/4", ocupantes: 4, capacidad: 4 },
        { id: 7, grado: 6, ocupacion: "4/4", ocupantes: 4, capacidad: 4 },
        { id: 8, grado: 8, ocupacion: "8/8", ocupantes: 8, capacidad: 8 }
      ],
      mesaSeleccionada: null,
      mostrarModal: false,
      ocupantesTemp: 0,
      capacidadTemp: 0
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

  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            Mesas
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Inicio</a></li>
              <li className="breadcrumb-item active" aria-current="page">Mesas</li>
            </ol>
          </nav>
        </div>
        
        <div className="col-md-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Estado de Mesas</h4>
              <p className="card-description"> Aqui se encontrara la descripcion de la zona</p>
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

        <style jsx>{`
          .mesas-container {
            padding: 40px;
            background-color: #f8f9fa;
            border-radius: 8px;
            min-height: 70vh;
          }
          
          .mesas-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(2, 1fr);
            gap: 60px;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
          }
          
          .mesa-circle {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            background-color: #343a40;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
            cursor: pointer;
            border: 3px solid transparent;
          }
          
          .mesa-circle:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            border-color: #007bff;
          }
          
          .mesa-grado {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 8px;
          }
          
          .mesa-ocupacion {
            font-size: 20px;
            font-weight: normal;
          }

          /* Modal Styles */
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }

          .modal-content {
            background: white;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #dee2e6;
          }

          .modal-header h5 {
            margin: 0;
            color: #343a40;
          }

          .btn-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #6c757d;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .btn-close:hover {
            color: #343a40;
          }

          .modal-body {
            padding: 20px;
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #343a40;
          }

          .form-control {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #ced4da;
            border-radius: 4px;
            font-size: 16px;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }

          .form-control:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
          }

          .modal-footer {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            padding: 20px;
            border-top: 1px solid #dee2e6;
          }

          .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            transition: all 0.15s ease-in-out;
          }

          .btn-secondary {
            background-color: #6c757d;
            color: white;
          }

          .btn-secondary:hover {
            background-color: #5a6268;
          }

          .btn-primary {
            background-color: #007bff;
            color: white;
          }

          .btn-primary:hover {
            background-color: #0056b3;
          }
          
          @media (max-width: 1200px) {
            .mesas-grid {
              gap: 40px;
              max-width: 800px;
            }
            
            .mesa-circle {
              width: 150px;
              height: 150px;
            }
            
            .mesa-grado {
              font-size: 24px;
            }
            
            .mesa-ocupacion {
              font-size: 18px;
            }
          }

          @media (max-width: 768px) {
            .mesas-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 30px;
              max-width: 500px;
            }
            
            .mesa-circle {
              width: 120px;
              height: 120px;
            }
            
            .mesa-grado {
              font-size: 20px;
            }
            
            .mesa-ocupacion {
              font-size: 16px;
            }

            .modal-content {
              width: 95%;
              margin: 20px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default zone