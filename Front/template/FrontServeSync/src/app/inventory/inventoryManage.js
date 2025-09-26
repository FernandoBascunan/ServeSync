import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';


export class inventoryManage extends Component {
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
              <li className="breadcrumb-item active" aria-current="page">Lista de productos</li>
            </ol>
          </nav>
        </div>
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Lista de productos</h4>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th> ID </th>
                      <th> Producto </th>
                      <th> Cantidad en bodega </th>
                      <th> Valor(Precio) </th>
                      <th> Categoria </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> 1 </td>
                      <td> Coca cola retornable 2l</td>
                      <td> 2 </td>
                      <td> $ 77 </td>
                      <td> Bebida </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-danger">Eliminar</button>
                      </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-warning">Modificar</button>
                      </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-success">Uso de IA</button>
                      </td>
                    </tr>
                    <tr>
                      <td> 2 </td>
                      <td> Sprite 3l </td>
                      <td> 3</td>
                      <td> $245 </td>
                      <td> Bebida </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-danger">Eliminar</button>
                      </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-warning">Modificar</button>
                      </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-success">Uso de IA</button>
                      </td>
                    </tr>
                    <tr>
                      <td> 3 </td>
                      <td> Pepsi 3l </td>
                      <td> 6 </td>
                      <td> $138 </td>
                      <td> Bebida </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-danger">Eliminar</button>
                      </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-warning">Modificar</button>
                      </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-success">Uso de IA</button>
                      </td>
                    </tr>
                    <tr>
                      <td> 4 </td>
                      <td> Kem 3l </td>
                      <td > 8 </td>
                      <td> $ 77 </td>
                      <td> Bebida </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-danger">Eliminar</button>
                      </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-warning">Modificar</button>
                      </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-success">Uso de IA</button>
                      </td>
                    </tr>
                    <tr>
                      <td> 5 </td>
                      <td> Pap 3l </td>
                      <td> 23 </td>
                      <td> $ 160 </td>
                      <td> Bebida </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-danger">Eliminar</button>
                      </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-warning">Modificar</button>
                      </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-success">Uso de IA</button>
                      </td>
                    </tr>
                    <tr>
                      <td> 6 </td>
                      <td> Coca cola desechable 3l </td>
                      <td> 123 </td>
                      <td> $ 123.21 </td>
                      <td> Bebida </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-danger">Eliminar</button>
                      </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-warning">Modificar</button>
                      </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-success">Uso de IA</button>
                      </td>
                    </tr>
                    <tr>
                      <td> 7 </td>
                      <td> Jugo de manzana watts 2l </td>
                      <td> 123 </td>
                      <td> $ 150 </td>
                      <td> Jugo </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-danger">Eliminar</button>
                      </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-warning">Modificar</button>
                      </td>
                      <td className='py-1'>
                        <button type="button" className="btn btn-success">Uso de IA</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default inventoryManage