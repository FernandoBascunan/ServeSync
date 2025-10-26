import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const AddOrder = ({ onPedidoCreado }) => {
  const empresaID = localStorage.getItem('userId');
  const token = localStorage.getItem('authToken');

  const [zonas, setZonas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [tipo, setTipo] = useState('llevar');
  const [cliente, setCliente] = useState('');
  const [zonaMesaId, setZonaMesaId] = useState('');
  const [detalle, setDetalle] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/api/mesas/zonas/${empresaID}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setZonas(data))
      .catch(err => console.error('Error al cargar zonas:', err));

    fetch(`http://localhost:8080/api/inventario/${empresaID}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, [empresaID, token]);

  useEffect(() => {
    const sum = detalle.reduce((acc, item) => {
      const prod = productos.find(p => p.id === parseInt(item.productoId));
      return acc + (prod ? prod.precio * item.cantidad : 0);
    }, 0);
    setTotal(sum);
  }, [detalle, productos]);

  const agregarProducto = (productoId, cantidad) => {
    if (!productoId || cantidad <= 0) return;
    setDetalle(prev => {
      const existe = prev.find(d => d.productoId === productoId);
      if (existe) {
        return prev.map(d => d.productoId === productoId ? { ...d, cantidad } : d);
      }
      return [...prev, { productoId, cantidad }];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cliente) {
      Swal.fire('Error', 'Ingrese el nombre del cliente', 'error');
      return;
    }
    if (tipo === 'servir' && !zonaMesaId) {
      Swal.fire('Error', 'Seleccione la zona/mesa', 'error');
      return;
    }
    if (detalle.length === 0) {
      Swal.fire('Error', 'Agregue al menos un producto', 'error');
      return;
    }

    const body = {
      nombreCliente: cliente,
      tipo: tipo,
      zonaMesaId: tipo === 'servir' ? zonaMesaId : null,
      empresaID: empresaID,
      fase: tipo === 'llevar' ? 'finalizado' : 'pendiente',
      detalles: detalle.map(d => ({ idProducto: parseInt(d.productoId), cantidad: parseInt(d.cantidad) }))
    };

    try {
      const res = await fetch(`http://localhost:8080/api/inventario/ventas`, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('Error al crear pedido');
      const data = await res.json();
      Swal.fire('Éxito', 'Pedido creado correctamente', 'success');
      setCliente('');
      setTipo('llevar');
      setZonaMesaId('');
      setDetalle([]);
      setTotal(0);
      if (onPedidoCreado) onPedidoCreado(data);
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  return (
    <div className="col-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Crear un nuevo pedido</h4>
          <p className="card-description"> Completa el formulario para registrar un pedido </p>
          <form className="forms-sample" onSubmit={handleSubmit}>
            <Form.Group>
              <label>Nombre del cliente</label>
              <Form.Control 
                type="text" 
                value={cliente} 
                onChange={e => setCliente(e.target.value)} 
                placeholder="Nombre del cliente" 
              />
            </Form.Group>

            <Form.Group>
              <label>Tipo de pedido</label>
              <select className="form-control" value={tipo} onChange={e => setTipo(e.target.value)}>
                <option value="llevar">Para llevar</option>
                <option value="servir">Para servir</option>
              </select>
            </Form.Group>

            {tipo === 'servir' && (
              <Form.Group>
                <label>Zona/Mesa</label>
                <select className="form-control" value={zonaMesaId} onChange={e => setZonaMesaId(e.target.value)}>
                  <option value="">Seleccione</option>
                  {zonas.flatMap(zona => (zona.mesas || []).map(mesa => (
                    <option key={mesa.id} value={mesa.id}>
                      {zona.nombreZona} / Mesa {mesa.id}
                    </option>
                  )))}
                </select>
              </Form.Group>
            )}

            <Form.Group>
              <label>Productos</label>
              {productos.map(p => (
                <div key={p.id} className="d-flex mb-2 align-items-center">
                  <span style={{ flex: 1 }}>{p.nombre} - ${p.precio} - Stock: {p.stockActual}</span>
                  <input 
                    type="number" 
                    min="1" 
                    max={p.stockActual} 
                    placeholder="Cantidad" 
                    className="form-control" 
                    style={{ width: 100 }}
                    onChange={e => agregarProducto(p.id, parseInt(e.target.value) || 0)} 
                  />
                </div>
              ))}
            </Form.Group>

            <p>Total: ${total}</p>
            <button type="submit" className="btn btn-primary mr-2">Guardar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
