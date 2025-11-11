import React, { useEffect, useState } from 'react';

const Order = () => {
  const empresaID = localStorage.getItem('userId');
  const token = localStorage.getItem('authToken');
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/inventario/ventas/${empresaID}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setPedidos(data.filter(p => p.activo));
    } catch (err) {
      console.error(err);
    }
  };

  const terminarPedido = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/inventario/ventas/${id}/terminar`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setPedidos(pedidos.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="row">
      {pedidos.map(pedido => (
        <div key={pedido.id} className="col-md-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-0">Pedido {pedido.id}</h4>
              <div className="py-2 border-bottom">
                <small className="text-muted">Cliente:</small>
                <p className="font-weight-semibold">{pedido.nombreCliente}</p>
              </div>
              {pedido.tipo === 'servir' && (
                <div className="py-2 border-bottom">
                  <small className="text-muted">Zona/Mesa:</small>
                  <p className="font-weight-semibold">{pedido.zonaMesa?.nombreZona} / Mesa {pedido.zonaMesa?.id}</p>
                </div>
              )}
              <div className="py-2 border-bottom">
                <small className="text-muted">Productos:</small>
                <ul>
                  {pedido.detalles.map(d => (
                    <li key={d.id}>{d.productoNombre} x {d.cantidad} = ${d.cantidad * d.productoPrecio}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-bottom">
                <strong>Total: ${pedido.detalles.reduce((sum, d) => sum + (d.cantidad * d.productoPrecio), 0)}</strong>
              </div>
              <button className="btn btn-success mt-2" onClick={() => terminarPedido(pedido.id)}>Terminar pedido</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
