import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class Home extends Component {

generarReporteStock = async () => {
  try {
    const empresaID = localStorage.getItem('userId'); // o el que corresponda
    const token = localStorage.getItem('token'); // ajusta el nombre si es distinto

    const response = await axios.get(
      `http://localhost:8080/api/inventario/${empresaID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const productos = response.data;

    const contenido = productos.map(p =>
      `${p.id} - ${p.nombre} - ${p.categoria} - $${p.precio} - Stock: ${p.stockActual}`
    ).join('\n');

    const blob = new Blob([contenido], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');

  } catch (error) {
    console.error('Error al generar reporte de stock:', error);
  }
};

  render () {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            Inicio
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Inicio</a></li>
            </ol>
          </nav>
        </div>
        <div className="row">

          {/* --- TARJETA DE VENTAS --- */}
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card"> 
              <div className="card-body">
                <div className='d-flex justify-content-center align-item-center'>
                  <h1> Ventas</h1>
                </div>
                <span>Este reporte muestra todas las ventas realizadas dentro del período de tiempo seleccionado por el usuario. Incluye el detalle de cada transacción, como fecha, productos vendidos, cantidades, precios unitarios y monto total por venta. Además, permite identificar tendencias de consumo y obtener un desglose general del rendimiento comercial en el lapso elegido.</span>
                <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">Preview</Link>
              </div>
            </div>
          </div>

          {/* --- TARJETA DE STOCK (MODIFICADA) --- */}
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className='d-flex justify-content-center align-item-center'>
                  <h1> Stock</h1>
                </div>
                <span>Este reporte presenta el estado actualizado del inventario disponible en la tienda. Muestra cada producto con su nombre, código, cantidad almacenada y unidad de medida. Su propósito es entregar una visión clara del stock vigente para facilitar el control de existencias, detectar quiebres de stock, planificar reposiciones y mantener una gestión eficiente del inventario.</span>
                <button
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  onClick={this.generarReporteStock}
                >
                  Preview
                </button>
              </div>
            </div>
          </div>

          {/* --- TARJETA DE ORDENES --- */}
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className='d-flex justify-content-center align-item-center'>
                  <h1> Ordenes</h1>
                </div>
                <span>Este reporte contiene el registro de todas las órdenes de compra que han sido ingresadas al sistema. Incluye información como proveedor, fecha de ingreso, productos solicitados, cantidades, precios y estado de cada orden. Es ideal para llevar un seguimiento de las compras realizadas, controlar entregas pendientes y respaldar la trazabilidad de abastecimiento.</span>
                <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">Preview</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Home;
