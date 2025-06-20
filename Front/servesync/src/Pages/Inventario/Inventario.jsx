import { useState } from 'react';
import Header from '../../Components/Header/Header';
import './Inventario.css'; 

const StoragePage = () => {
  const [openFilter, setOpenFilter] = useState(null);

  const toggleFilter = (filterName) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  return (
    <div>
      <Header />
      <div className='main-content'>
        {/* Panel Izquierdo: Filtros */}
        <div className='filter-panel'>
          <div className='filter-section'>
            <button className='filter-title' onClick={() => toggleFilter('tipo')}>
              Tipo de producto
            </button>
            {openFilter === 'tipo' && (
              <div className='filter-content'>
                <select>
                  <option>Todos</option>
                  <option>Alimentos</option>
                  <option>Electrónica</option>
                  <option>Ropa</option>
                </select>
              </div>
            )}
          </div>

          <div className='filter-section'>
            <button className='filter-title' onClick={() => toggleFilter('stock')}>
              Stock
            </button>
            {openFilter === 'stock' && (
              <div className='filter-content'>
                <label>Mínimo:</label>
                <input type='number' placeholder='0' />
                <label>Máximo:</label>
                <input type='number' placeholder='1000' />
              </div>
            )}
          </div>

          <div className='filter-section'>
            <button className='filter-title' onClick={() => toggleFilter('precio')}>
              Precio
            </button>
            {openFilter === 'precio' && (
              <div className='filter-content'>
                <label>Mínimo:</label>
                <input type='number' placeholder='0' />
                <label>Máximo:</label>
                <input type='number' placeholder='10000' />
              </div>
            )}
          </div>
        </div>

        {/* Panel Derecho: Productos */}
        <div className='containerRight'>
          <div className='product-list'>
            {/* Simulando algunos productos */}
            {[1, 2, 3, 4].map((i) => (
              <div className='product-card' key={i}>
                <img src='https://via.placeholder.com/80' alt='Producto' />
                <div className='product-info'>
                  <h3>Producto {i}</h3>
                  <p>Fecha de último pedido</p>
                  <p>Descripción del producto</p>
                </div>
                <div className='product-stock'>
                  <p>Stock en cantidad</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoragePage;
