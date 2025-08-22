import { useState } from 'react';
import Header from '../../Components/Header/Header';
import './Inventario.css'; 
import ProductoInv from '../../Components/ProductoInv/ProductoInv';

const StoragePage = () => {
  const [openFilter, setOpenFilter] = useState(null);

  const toggleFilter = (filterName) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  const handleAgregarProducto = () => {
    window.location.href = "/AgregarProducto";
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
            <button class="zone-add" onClick={handleAgregarProducto}> Agregar Producto </button>
        </div>

        {/* Panel Derecho: Productos */}
        <div className='containerRight'>
          <div className='product-list'>
            <ProductoInv/>
            <ProductoInv/>
            <ProductoInv/>
            <ProductoInv/>
            <ProductoInv/>
            <ProductoInv/>
            <ProductoInv/>
            <ProductoInv/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoragePage;
