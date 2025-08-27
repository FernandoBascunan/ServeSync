import React, { useState } from 'react';
import './AgregarZona.css'


const AgregarZona = () => {
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

    const handleMesas = () => {
      window.location.href = "/Mesas";
    };
    return (
    <div className='containerExt'>
        <div className='form-container'>
            <button class="back-btn" onClick={handleMesas}>Volver atrás</button>
            <h1 >Agrega nueva zona</h1>
            <div className="columnas">
                <div className="aaaaa">
                    <input className='inputZona' type="text" name="nombre" placeholder="Nombre de la Zona" onChange={handleChange} />
                    <input className='inputZona' type="email" name="email" placeholder="Cantidad de mesas" onChange={handleChange} />
                    <input className='inputZona' type="password" name="password" placeholder="Asientos por mesa" onChange={handleChange} />
                </div>
            </div>
            <button className='addButton' onClick={handleSubmit}>Agregar zona</button>
        </div>
    </div>    
  );
};

export default AgregarZona;