import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class Home extends Component {
generarReporteStock = async () => {
  try {
    const empresaID = localStorage.getItem('userId'); 
    const response = await axios.get(`http://localhost:8080/api/inventario/${empresaID}`);

    const productos = response.data;

    // Verificar si productos existe y tiene elementos
    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      alert('No hay productos en el inventario');
      return;
    }

    // Limpiar las referencias circulares para evitar problemas
    const productosLimpios = productos.map(p => ({
      id: p.id,
      nombre: p.nombre,
      categoria: p.categoria,
      precio: p.precio,
      stockActual: p.stockActual
    }));

    console.log('Productos limpios:', productosLimpios);

    // Crear HTML formateado
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Reporte de Stock</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #333; }
          .fecha { color: #666; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #4CAF50; color: white; }
          tr:nth-child(even) { background-color: #f2f2f2; }
          tr:hover { background-color: #ddd; }
          .text-right { text-align: right; }
        </style>
      </head>
      <body>
        <h1>Reporte de Stock</h1>
        <p class="fecha">Fecha: ${new Date().toLocaleDateString('es-CL')} ${new Date().toLocaleTimeString('es-CL')}</p>
        <p>Total de productos: ${productosLimpios.length}</p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th class="text-right">Precio</th>
              <th class="text-right">Stock Actual</th>
            </tr>
          </thead>
          <tbody>
            ${productosLimpios.map(p => `
              <tr>
                <td>${p.id}</td>
                <td>${p.nombre}</td>
                <td>${p.categoria}</td>
                <td class="text-right">$${p.precio.toFixed(2)}</td>
                <td class="text-right">${p.stockActual}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    // Abrir en nueva ventana
    const nuevaVentana = window.open('', '_blank');
    if (nuevaVentana) {
      nuevaVentana.document.write(htmlContent);
      nuevaVentana.document.close();
    } else {
      alert('Por favor, permite las ventanas emergentes para ver el reporte');
    }

  } catch (error) {
    console.error('Error al generar reporte de stock:', error);
    alert('Error al generar el reporte: ' + error.message);
  }
};
generarReporteVentas = async () => {
  try {
    const empresaID = localStorage.getItem('userId'); 
    const response = await axios.get(`http://localhost:8080/api/ventas/${empresaID}`);
    
    const ventas = response.data;

    if (!ventas || !Array.isArray(ventas) || ventas.length === 0) {
      alert('No hay ventas registradas');
      return;
    }

    const ventasLimpias = ventas.map(v => ({
      id: v.id,
      fechaVenta: new Date(v.fechaVenta).toLocaleString('es-CL'),
      total: v.detalles.reduce((sum, d) => sum + d.cantidad * d.precioUnitario, 0),
      detalles: v.detalles.map(d => ({
        productoId: d.productoId,
        productoNombre: d.productoNombre,
        cantidad: d.cantidad,
        precioUnitario: d.precioUnitario
      }))
    }));

    let htmlVentas = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Reporte de Ventas</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #333; }
          .venta-general { background-color: #000; color: #fff; padding: 10px; margin-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #4CAF50; color: white; }
          tr:nth-child(even) { background-color: #f2f2f2; }
          tr:hover { background-color: #ddd; }
          .text-right { text-align: right; }
        </style>
      </head>
      <body>
        <h1>Reporte de Ventas</h1>
        <p class="fecha">Fecha: ${new Date().toLocaleDateString('es-CL')} ${new Date().toLocaleTimeString('es-CL')}</p>
    `;

    ventasLimpias.forEach(v => {
      htmlVentas += `
        <div class="venta-general">
          <strong>Venta ID:</strong> ${v.id} |
          <strong>Fecha:</strong> ${v.fechaVenta} |
          <strong>Total:</strong> $${v.total.toFixed(2)}
        </div>
        <table>
          <thead>
            <tr>
              <th>ID Producto</th>
              <th>Nombre Producto</th>
              <th class="text-right">Cantidad</th>
              <th class="text-right">Precio Unitario</th>
            </tr>
          </thead>
          <tbody>
            ${v.detalles.map(d => `
              <tr>
                <td>${d.productoId}</td>
                <td>${d.productoNombre}</td>
                <td class="text-right">${d.cantidad}</td>
                <td class="text-right">$${d.precioUnitario.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    });

    htmlVentas += `</body></html>`;

    const nuevaVentana = window.open('', '_blank');
    if (nuevaVentana) {
      nuevaVentana.document.write(htmlVentas);
      nuevaVentana.document.close();
    } else {
      alert('Por favor, permite las ventanas emergentes para ver el reporte');
    }

  } catch (error) {
    console.error('Error al generar reporte de ventas:', error);
    alert('Error al generar el reporte: ' + error.message);
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

        {/* --- TARJETA DE VENTAS (modificada para usar el nuevo método) --- */}
        <div className="col-md-4 grid-margin stretch-card">
          <div className="card"> 
            <div className="card-body">
              <div className='d-flex justify-content-center align-item-center'>
                <h1> Ventas</h1>
              </div>
              <span>Este reporte muestra todas las ventas realizadas dentro del período de tiempo seleccionado por el usuario. Incluye el detalle de cada transacción, como fecha, productos vendidos, cantidades, precios unitarios y monto total por venta. Además, permite identificar tendencias de consumo y obtener un desglose general del rendimiento comercial en el lapso elegido.</span>
              <button
                className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                onClick={this.generarReporteVentas}
                style={{ marginTop: '30px' }}
              >
                Preview
              </button>
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
                  style={{ marginTop: '30px' }}
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
                <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard" style={{ marginTop: '30px' }}>Preview</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Home;