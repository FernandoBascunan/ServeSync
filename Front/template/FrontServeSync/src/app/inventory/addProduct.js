import React, { Component } from 'react';
import { Form } from 'react-bootstrap';


export class addProduct extends Component {
  render () {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            Inventario
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Inventario</a></li>
              <li className="breadcrumb-item active" aria-current="page">Agregar Producto</li>
            </ol>
          </nav>
        </div>
        <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Agregar un producto nuevo al Inventario</h4>
                <p className="card-description"> Llenando las celdas en este formulario logragas agregar un producto nuevo a tu inventario </p>
                <form className="forms-sample">
                    <Form.Group>
                        <label htmlFor="exampleInputName1">Nombre del producto</label>
                        <Form.Control type="text" className="form-control" id="exampleInputName1" placeholder="Nombre del producto" />
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputName1">Cantidad inicial en bodega</label>
                        <Form.Control type="text" className="form-control" id="exampleInputName1" placeholder="0" />
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleInputName1">Ingresa la cantidad de cantidad minima para estar en bajo stock</label>
                        <Form.Control type="text" className="form-control" id="exampleInputName1" placeholder="0" />
                    </Form.Group>
                    <Form.Group>
                    <div className="input-group">
                        <div className="input-group-prepend">
                        <span className="input-group-text bg-primary text-white">$</span>
                        </div>
                        <Form.Control type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                        <div className="input-group-append">
                        <span className="input-group-text">.00</span>
                        </div>
                    </div>
                    </Form.Group>
                    <Form.Group>
                      <label htmlFor="exampleFormControlSelect2">Categoria</label>
                      <select className="form-control" id="exampleFormControlSelect2">
                        <option></option>
                        <option>Bebida</option>
                        <option>Cerveza</option>
                        <option>Jugo</option>
                      </select>
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

export default addProduct