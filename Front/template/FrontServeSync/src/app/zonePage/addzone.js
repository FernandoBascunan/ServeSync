import React, { Component } from 'react';
import { Form } from 'react-bootstrap';


export class addZone extends Component {
  render () {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            Zonas de mesas
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Zona de mesas</a></li>
                <li className="breadcrumb-item active" aria-current="page">Agregar Zona</li>
            </ol>
          </nav>
        </div>
        <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Agregar una zona nueva</h4>
                <p className="card-description"> Aqui podras agregar una zona nueva donde podras asignar todas las mesas que quieres que sean asiganadas a esta zona</p>
                <form className="forms-sample">
                    <Form.Group>
                        <label htmlFor="exampleInputName1">Nombre de la zona</label>
                        <Form.Control type="text" className="form-control" id="exampleInputName1" placeholder="Nombre de la zona" />
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputName1">Cantidad de mesas</label>
                        <Form.Control type="text" className="form-control" id="exampleInputName1" placeholder="0" />
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleTextarea1">Descripcion</label>
                        <textarea className="form-control" id="exampleTextarea1" rows="4"></textarea>
                    </Form.Group>
                    <button type="submit" className="btn btn-primary mr-2">Agregar</button>
                    <button className="btn btn-light">Cancelar</button>
                </form>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default addZone