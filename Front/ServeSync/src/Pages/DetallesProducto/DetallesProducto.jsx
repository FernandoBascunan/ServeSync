import Header from '../../Components/Header/Header';
import React, { useState } from 'react';
import './DetallesProducto.css'


const DetallesProducto = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmarPassword: ''
      });
      const [error, setError] = useState('');
      const [success, setSuccess] = useState('');
    const handleChange = (e) => {
        setFormData({
      ...formData,
      [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    };

    const handleInventario = () => {
        window.location.href = "/Inventario";
    };
    return (
    <div className='containerExt'>
        <div className='form-container'>
            <button class="back-btn" onClick={handleInventario}>Volver atrás</button>
            <h1 >Detalles de "Nombre del producto"</h1>
            <div className="columnas">
                <div className="columna izquierda">
                    <input className='inputProduct' type="text" name="nombre" placeholder="Nombre Comercial" onChange={handleChange} />
                    <input className='inputProduct' type="email" name="email" placeholder="Tipo" onChange={handleChange} />
                    <input className='inputProduct' type="password" name="password" placeholder="Marca" onChange={handleChange} />
                    <input className='inputProduct' type="password" name="confirmarPassword" placeholder="Descripcion Breve" onChange={handleChange} />
                </div>
                <div className="columna derecha">
                    <input className='inputProduct' type="text" name="telefono" placeholder="Formato" onChange={handleChange} />
                    <input className='inputProduct' type="text" name="direccion" placeholder="Contenido Neto" onChange={handleChange} />
                    <input className='inputProduct' type="text" name="rut" placeholder="Cantidad" onChange={handleChange} />
                    <input className='inputProduct' type="text" name="tipoPyme" placeholder="Precio de venta unitario" onChange={handleChange} />
                </div>
            </div>
            <div className="input-centro">
                <input className='inputProduct' type="text" name="registro" placeholder="Fecha ultimo Ingreso" onChange={handleChange} />
            </div>
            <button className='addButton' onClick={handleSubmit}>Editar producto</button>
        </div>
    </div>    
  );
};

export default DetallesProducto;