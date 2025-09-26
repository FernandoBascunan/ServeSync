import React, { Component } from 'react';
import { Form } from 'react-bootstrap';


export class addOrder extends Component {
  render () {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            Pedidos
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Pedidos</a></li>
              <li className="breadcrumb-item active" aria-current="page">Crear Pedido</li>
            </ol>
          </nav>
        </div>
        <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Crear un nuevo pedido</h4>
                <p className="card-description"> Completa el formulario para registrar un pedido </p>
                <form className="forms-sample">
                    <Form.Group>
                        <label htmlFor="clienteNombre">Nombre del cliente</label>
                        <Form.Control type="text" className="form-control" id="clienteNombre" placeholder="Nombre del cliente" />
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="personaAsignada">Persona asignada (mesero)</label>
                        <Form.Control type="text" className="form-control" id="personaAsignada" placeholder="Nombre del mesero" />
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="zonaMesa">Zona/Mesa</label>
                        <Form.Control type="text" className="form-control" id="zonaMesa" placeholder="Ej: Zona 1 / Mesa 12" />
                    </Form.Group>
                    <Form.Group>
                      <label htmlFor="fasePedido">Fase</label>
                      <select className="form-control" id="fasePedido">
                        <option>Pendiente</option>
                        <option>Iniciado</option>
                        <option>En proceso</option>
                        <option>Finalizado</option>
                      </select>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="descripcionPedido">Descripción</label>
                        <textarea className="form-control" id="descripcionPedido" rows="4" placeholder="Detalles del pedido"></textarea>
                    </Form.Group>
                    <button type="submit" className="btn btn-primary mr-2">Guardar</button>
                    <button className="btn btn-light">Cancelar</button>
                </form>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default addOrder



