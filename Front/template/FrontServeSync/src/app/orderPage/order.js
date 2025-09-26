import React, { Component } from 'react';


export class order extends Component {
  render () {
    const fasesPedido = [
      { nombre: 'pendiente', color: 'warning' },
      { nombre: 'iniciado', color: 'info' },
      { nombre: 'en proceso', color: 'primary' },
      { nombre: 'finalizado', color: 'success' }
    ];
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            Pedidos
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Pedidos</a></li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-0">Pedido 1</h4>
                <div className="d-flex py-2 border-bottom">
                  <div className="wrapper">
                    <small className="text-muted">Persona asignada:</small>
                    <p className="font-weight-semibold text-gray mb-0">Gerardo benavides(mesero)</p>
                  </div>
                  
                </div>
                <div className="d-flex py-2 border-bottom">
                  <div className="wrapper">
                    <small className="text-muted">Solicitud hecha por:</small>
                    <p className="font-weight-semibold text-gray mb-0">Cliente 2(Nombre)</p>
                  </div>
                  
                </div>
                <div className="d-flex py-2 border-bottom">
                  <div className="wrapper">
                    <small className="text-muted">Mesa del pedido y zona</small>
                    <p className="font-weight-semibold text-gray mb-0">Zona 1/Mesa 12</p>
                  </div>
                  
                </div>
                <div className="d-flex pt-2 border-bottom">
                  <div className="wrapper">
                    <small className="text-muted">Hora del pedido</small>
                    <p className="font-weight-semibold text-gray mb-0">12:34</p>
                  </div>
                  
                </div>
                <div className="d-flex justify-content-between pb-3">
                  <h4 className="card-title mb-0">Fases del pedido</h4>
                </div>
                <ul className="timeline">
                  {fasesPedido.map(fase => (
                    <li key={fase.nombre} className="timeline-item mb-3 pb-3 border-bottom">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className={`badge badge-${fase.color} mr-3`} style={{ minWidth: 110, textTransform: 'capitalize', textAlign: 'center' }}>{fase.nombre}</span>
                          <p className="timeline-content mb-0">Fase: {fase.nombre}</p>
                        </div>
                        
                      </div>
                    </li>
                  ))}
                </ul>
                <a className="d-block mt-5" href="!#" onClick={evt =>evt.preventDefault()}>Show all</a>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-0">Pedido 2</h4>
                <div className="d-flex py-2 border-bottom">
                  <div className="wrapper">
                    <small className="text-muted">Persona asignada:</small>
                    <p className="font-weight-semibold text-gray mb-0">Gerardo benavides(mesero)</p>
                  </div>
                  
                </div>
                <div className="d-flex py-2 border-bottom">
                  <div className="wrapper">
                    <small className="text-muted">Solicitud hecha por:</small>
                    <p className="font-weight-semibold text-gray mb-0">Cliente 2(Nombre)</p>
                  </div>
                  
                </div>
                <div className="d-flex py-2 border-bottom">
                  <div className="wrapper">
                    <small className="text-muted">Mesa del pedido y zona</small>
                    <p className="font-weight-semibold text-gray mb-0">Zona 1/Mesa 12</p>
                  </div>
                  
                </div>
                <div className="d-flex pt-2 border-bottom">
                  <div className="wrapper">
                    <small className="text-muted">Hora del pedido</small>
                    <p className="font-weight-semibold text-gray mb-0">12:34</p>
                  </div>
                  
                </div>
                <div className="d-flex justify-content-between pb-3">
                  <h4 className="card-title mb-0">Fases del pedido</h4>
                </div>
                <ul className="timeline">
                  {fasesPedido.map(fase => (
                    <li key={fase.nombre} className="timeline-item mb-3 pb-3 border-bottom">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className={`badge badge-${fase.color} mr-3`} style={{ minWidth: 110, textTransform: 'capitalize', textAlign: 'center' }}>{fase.nombre}</span>
                          <p className="timeline-content mb-0">Fase: {fase.nombre}</p>
                        </div>
                        
                      </div>
                    </li>
                  ))}
                </ul>
                <a className="d-block mt-5" href="!#" onClick={evt =>evt.preventDefault()}>Show all</a>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-0">Pedido 3</h4>
                <div className="d-flex py-2 border-bottom">
                  <div className="wrapper">
                    <small className="text-muted">Persona asignada:</small>
                    <p className="font-weight-semibold text-gray mb-0">Gerardo benavides(mesero)</p>
                  </div>
                  
                </div>
                <div className="d-flex py-2 border-bottom">
                  <div className="wrapper">
                    <small className="text-muted">Solicitud hecha por:</small>
                    <p className="font-weight-semibold text-gray mb-0">Cliente 2(Nombre)</p>
                  </div>
                  
                </div>
                <div className="d-flex py-2 border-bottom">
                  <div className="wrapper">
                    <small className="text-muted">Mesa del pedido y zona</small>
                    <p className="font-weight-semibold text-gray mb-0">Zona 1/Mesa 12</p>
                  </div>
                  
                </div>
                <div className="d-flex pt-2 border-bottom">
                  <div className="wrapper">
                    <small className="text-muted">Hora del pedido</small>
                    <p className="font-weight-semibold text-gray mb-0">12:34</p>
                  </div>
                  
                </div>
                <div className="d-flex justify-content-between pb-3">
                  <h4 className="card-title mb-0">Fases del pedido</h4>
                </div>
                <ul className="timeline">
                  {fasesPedido.map(fase => (
                    <li key={fase.nombre} className="timeline-item mb-3 pb-3 border-bottom">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className={`badge badge-${fase.color} mr-3`} style={{ minWidth: 110, textTransform: 'capitalize', textAlign: 'center' }}>{fase.nombre}</span>
                          <p className="timeline-content mb-0">Fase: {fase.nombre}</p>
                        </div>
                        
                      </div>
                    </li>
                  ))}
                </ul>
                <a className="d-block mt-5" href="!#" onClick={evt =>evt.preventDefault()}>Show all</a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default order