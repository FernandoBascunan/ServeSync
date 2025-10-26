import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export class InventoryManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      loading: true,
      error: null
    };
  }

  
  componentDidMount() {
    this.cargarProductos();
  }

  cargarProductos = async () => {
    const empresaID = localStorage.getItem('userId'); 
    const token = localStorage.getItem('authToken')

    if (!empresaID) {
      this.setState({ error: 'No se encontró empresaID', loading: false });
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/inventario/${empresaID}`, {
        headers:{
          Authorization: `Bearer ${token}` 
        }
      });
      this.setState({ productos: response.data, loading: false });
    } catch (err) {
      console.error(err);
      this.setState({ error: 'Error al cargar productos', loading: false });
    }
  }

handleDeleteItem = async (id) => {
  const token = localStorage.getItem('authToken');

  const confirm = await MySwal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará el producto del inventario.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (!confirm.isConfirmed) return;

  try {
    const response = await axios.delete(`http://localhost:8080/api/inventario/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });


    await MySwal.fire('Eliminado', response.data || 'Producto eliminado correctamente ✅', 'success');

    this.setState((prevState) => ({
      productos: prevState.productos.filter((prod) => prod.id !== id)
    }));
  } catch (err) {
    console.error("Error al eliminar producto:", err);

    const mensajeError =
      err.response?.data ||
      err.message ||
      'Error desconocido al eliminar el producto.';

    if (err.response?.status === 409) {
      await MySwal.fire(
        'No se puede eliminar ❌',
        'El producto está asociado a una o más ventas y no puede ser eliminado.',
        'error'
      );
    } else if (err.response?.status === 404) {
      await MySwal.fire('No encontrado', 'El producto no existe en la base de datos.', 'warning');
    } else {
      await MySwal.fire('Error', mensajeError, 'error');
    }
  }
};



handleModifyItem = async (producto) => {
  const token = localStorage.getItem("authToken");

  const { value: formValues } = await MySwal.fire({
    title: 'Modificar producto',
    html: `
      <div style="text-align:left">
        <label for="swal-nombre"><strong>Nombre:</strong></label>
        <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${producto.nombre}">
        <br/>
        <label for="swal-precio"><strong>Precio:</strong></label>
        <input id="swal-precio" class="swal2-input" placeholder="Precio" value="${producto.precio}">
        <br/>
        <label for="swal-stock"><strong>Stock actual:</strong></label>
        <input id="swal-stock" class="swal2-input" placeholder="Stock actual" value="${producto.stockActual}">
        <br/>
        <label for="swal-categoria"><strong>Categoría:</strong></label>
        <input id="swal-categoria" class="swal2-input" placeholder="Categoría" value="${producto.categoria}">
        <br/>
      </div>
    `,
    focusConfirm: false,
    confirmButtonText: 'Guardar cambios',
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
    preConfirm: () => {
      return {
        nombre: document.getElementById('swal-nombre').value,
        precio: document.getElementById('swal-precio').value,
        stockActual: document.getElementById('swal-stock').value,
        categoria: document.getElementById('swal-categoria').value,
      };
    }
  });

  if (!formValues) return; 

  try {
    const response = await axios.put(
      `http://localhost:8080/api/inventario/${producto.id}`,
      {
        id: producto.id,
        ...formValues,
        precio: parseFloat(formValues.precio),
        stockActual: parseInt(formValues.stockActual, 10),
        empresaID: producto.empresaID,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );


    this.setState((prev) => ({
      productos: prev.productos.map((p) =>
        p.id === producto.id ? response.data : p
      ),
    }));

    Swal.fire('Éxito', 'Producto modificado correctamente ✅', 'success');
  } catch (err) {
    console.error(err);
    Swal.fire('Error', 'No se pudo modificar el producto ❌', 'error');
  }
};
  handleProphetUI = async (producto) => {
    const { value: horizonDays } = await MySwal.fire({
      title: `Predicción para ${producto.nombre}`,
      html: `
        <label for="swal-horizonDays"><strong>¿Cuántos días deseas predecir?(min. 5 días)</strong></label>
        <input id="swal-horizonDays" type="number" class="swal2-input" value="30" min="5" max="365">
      `,
      focusConfirm: false,
      confirmButtonText: 'Generar predicción',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      preConfirm: () => {
        const days = parseInt(document.getElementById('swal-horizonDays').value, 10);
        if (isNaN(days) || days < 1) {
          Swal.showValidationMessage('Ingresa un número válido mayor a 0');
          return null;
        }
        return days;
      }
    });

    if (!horizonDays) return;

    Swal.fire({
      title: `Predicción para ${producto.nombre}`,
      html: '<p>Cargando...</p>',
      allowOutsideClick: false,
      didOpen: async () => {
        try {
          const result = await this.handleProphet(producto, horizonDays, []);

          console.log("=== RESULTADO COMPLETO ===", result);

          if (!result) {
            Swal.fire('Datos insuficientes', `El producto "${producto.nombre}" necesita al menos 2 registros de ventas en fechas diferentes para generar una predicción. 📊\n\nPor favor, registra más ventas antes de usar la predicción con IA.`, 'warning');
            return;
          }

          let forecastData = result.forecast || result;
          
          console.log("Forecast data:", forecastData);
          console.log("Es array?", Array.isArray(forecastData));
          console.log("Largo:", forecastData?.length);

          if (result.forecast && Array.isArray(result.forecast)) {
            forecastData = result.forecast;
          }
          else if (Array.isArray(result)) {
            forecastData = result;
          }
          
          if (!forecastData || !Array.isArray(forecastData) || forecastData.length === 0) {
            console.error("Datos inválidos:", {forecastData, isArray: Array.isArray(forecastData), length: forecastData?.length});
            Swal.fire('Error', `No hay datos de predicción. Verifica la consola.`, 'error');
            return;
          }


          const tableRows = forecastData.map(item => {
            const yhatLower = Math.max(0, parseFloat(item.yhat_lower));
            return `
              <tr>
                <td style="padding: 5px 10px; border-bottom: 1px solid #ddd;">${new Date(item.ds).toLocaleDateString()}</td>
                <td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;">${parseFloat(item.yhat).toFixed(2)}</td>
                <td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center; font-size: 0.9em; color: #666;">${yhatLower.toFixed(2)}</td>
                <td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center; font-size: 0.9em; color: #666;">${parseFloat(item.yhat_upper).toFixed(2)}</td>
              </tr>
            `;
          }).join('');

          const htmlTable = `
            <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
              <thead>
                <tr style="background-color: #f2f2f2;">
                  <th style="padding: 10px; border-bottom: 2px solid #aaa;">Fecha</th>
                  <th style="padding: 10px; border-bottom: 2px solid #aaa;">Cantidad</th>
                  <th style="padding: 10px; border-bottom: 2px solid #aaa;">Mín.</th>
                  <th style="padding: 10px; border-bottom: 2px solid #aaa;">Máx.</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>
          `;

          Swal.fire({
            title: `Predicción para ${producto.nombre}`,
            html: htmlTable,
            width: '700px',
            confirmButtonText: 'Cerrar'
          });

        } catch (error) {
          console.error("Error en handleProphetUI:", error);
          Swal.fire('Error', 'Ocurrió un error al procesar la predicción', 'error');
        }
      }
    });
  };

  handleProphet = async (producto, horizonDays = 30, events = []) => {
    const token = localStorage.getItem("authToken");
    const empresaID = localStorage.getItem("userId");

    try {
      const historyResponse = await axios.get(
        `http://localhost:8080/api/inventario/ventas/empresa/${empresaID}/producto/${producto.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const historyData = historyResponse.data;

      if (!historyData || historyData.length === 0) {
        console.warn("No hay datos históricos para este producto");
        return null;
      }

      console.log("Datos históricos recibidos:", historyData);
      console.log("Cantidad de registros:", historyData.length);

      const groupedHistory = historyData.reduce((acc, h) => {
        const date = new Date(h.fechaVenta).toISOString().slice(0, 10);
        acc[date] = (acc[date] || 0) + Number(h.cantidad);
        return acc;
      }, {});

      const history = Object.entries(groupedHistory)
        .map(([ds, y]) => ({ 
          ds: String(ds), 
          y: Number(y) 
        }))
        .filter(h => !isNaN(h.y));

      console.log("Fechas únicas después de agrupar:", history.length);

      if (history.length < 2) {
        console.warn(`Datos insuficientes: ${history.length} fecha(s) encontrada(s), se necesitan al menos 2`);
        return null;
      }

      console.log("Historial procesado:", history);
      console.log("Tipo de primer elemento:", typeof history[0], history[0]);

      const payload = {
        company_id: parseInt(empresaID),
        product_id: producto.id.toString(),
        horizon_days: horizonDays,
        history: history,
        events: []
      };

      console.log("Payload enviado:", payload);

      const predictResponse = await axios.post(
        "http://localhost:8080/prophet/predictProduct",
        payload
      );

      console.log("=== RESPUESTA COMPLETA DEL BACKEND ===", predictResponse.data);
      console.log("Status:", predictResponse.status);
      
      if (predictResponse.data.error) {
        console.error("Error del backend:", predictResponse.data.error);
        
        if (predictResponse.data.error.includes('less than 2 non-NaN rows')) {
          Swal.fire('Datos insuficientes', `El producto "${producto.nombre}" necesita al menos 2 registros de ventas en fechas diferentes para generar una predicción. Por favor, registra más ventas.`, 'warning');
        } else {
          Swal.fire('Error', `Error en predicción: ${predictResponse.data.error}`, 'error');
        }
        return null;
      }
      
      return predictResponse.data;

    } catch (err) {
      console.error("Error en handleProphet:", err);
      console.error("Detalles del error:", err.response?.data || err.message);
      return null;
    }
  };

  handleStockRecommendUI = async (producto) => {
    const { value: formValues } = await MySwal.fire({
      title: `Recomendación de stock para ${producto.nombre}`,
      html: `
        <label for="swal-horizonDays"><strong>Días de horizonte:</strong></label>
        <input id="swal-horizonDays" type="number" class="swal2-input" value="30" min="1">
        <br/>
        <label for="swal-leadTime"><strong>Lead time (días):</strong></label>
        <input id="swal-leadTime" type="number" class="swal2-input" value="7" min="1">
      `,
      focusConfirm: false,
      confirmButtonText: 'Calcular',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      preConfirm: () => ({
        horizonDays: parseInt(document.getElementById('swal-horizonDays').value, 10),
        leadTimeDays: parseInt(document.getElementById('swal-leadTime').value, 10)
      })
    });

    if (!formValues) return;

    const token = localStorage.getItem("authToken");
    const empresaID = localStorage.getItem("userId");

    try {
      const historyResponse = await axios.get(
        `http://localhost:8080/api/inventario/ventas/empresa/${empresaID}/producto/${producto.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const historyData = historyResponse.data;
      if (!historyData || historyData.length === 0) {
        Swal.fire('Sin historial', `El producto "${producto.nombre}" no registra ventas`, 'info');
        return;
      }

      const groupedHistory = historyData.reduce((acc, h) => {
        const date = new Date(h.fechaVenta).toISOString().slice(0, 10);
        acc[date] = (acc[date] || 0) + Number(h.cantidad);
        return acc;
      }, {});

      const uniqueDates = Object.keys(groupedHistory);
      if (uniqueDates.length < 2) {
        Swal.fire('Datos insuficientes', `El producto "${producto.nombre}" necesita al menos 2 registros de ventas en fechas diferentes.`, 'warning');
        return;
      }

      const history = Object.entries(groupedHistory)
        .map(([ds, y]) => ({ ds, y }))
        .filter(h => !isNaN(h.y));

      const payload = [{
        company_id: parseInt(empresaID),
        product_id: producto.id.toString(),
        history: history,
        horizon_days: formValues.horizonDays,
        lead_time_days: formValues.leadTimeDays,
        current_stock: producto.stockActual || 0
      }];

      console.log("Payload stock recommend:", payload);

      const response = await axios.post(
        "http://localhost:8080/prophet/stockRecommend",
        payload
      );

      const rec = response.data.recommendations[0].recommendation;

      Swal.fire({
        title: `Recomendación para ${producto.nombre}`,
        html: `
          <div style="text-align: left; padding: 20px;">
            <p><strong>Stock actual:</strong> ${rec.current_stock.toFixed(2)}</p>
            <p><strong>Demanda en lead time (${rec.lead_time_days} días):</strong> ${Math.max(0, rec.lead_time_demand).toFixed(2)}</p>
            <p><strong>Demanda futura total (${rec.horizon_days} días):</strong> ${Math.max(0, rec.future_demand).toFixed(2)}</p>
            <hr/>
            <p style="background-color: #d4edda; padding: 10px; border-radius: 5px; font-size: 1.1em;">
              <strong>📦 Pedido recomendado: ${Math.max(0, rec.recommended_order).toFixed(2)}</strong>
            </p>
          </div>
        `,
        confirmButtonText: 'Cerrar'
      });

    } catch (err) {
      console.error("Error en handleStockRecommendUI:", err);
      console.error("Detalles:", err.response?.data || err.message);
      Swal.fire('Error', 'No se pudo obtener la recomendación de stock ❌', 'error');
    }
  };


  render() {
    const { productos, loading, error } = this.state;

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">Inventario</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={e => e.preventDefault()}>Inventario</a></li>
              <li className="breadcrumb-item active" aria-current="page">Lista de productos</li>
            </ol>
          </nav>
        </div>

        {loading && <p>Cargando productos...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && productos.length === 0 && <p>No hay productos en el inventario.</p>}

        {!loading && !error && productos.length > 0 &&
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Lista de productos</h4>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Cantidad en bodega</th>
                        <th>Precio</th>
                        <th>Categoria</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos.map(prod => (
                        <tr key={prod.id}>
                          <td>{prod.id}</td>
                          <td>{prod.nombre}</td>
                          <td>{prod.stockActual}</td>
                          <td>${prod.precio}</td>
                          <td>{prod.categoria}</td>
                          <td className="py-1">
                            <button className="btn btn-danger" onClick={() => this.handleDeleteItem(prod.id)}>Eliminar</button>
                          </td>
                          <td className="py-1">
                            <button className="btn btn-warning" onClick={() => this.handleModifyItem(prod)}>Modificar</button>
                          </td>
                          <td className="py-1">
                            <button className="btn btn-success" onClick={() => this.handleProphetUI(prod)}>Predicción de ventas</button>
                          </td>
                          <td className="py-1">
                            <button className="btn btn-info" onClick={() => this.handleStockRecommendUI(prod)}>Recomendación de Stock</button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default InventoryManage;
