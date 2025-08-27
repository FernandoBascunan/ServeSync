import React, { useState } from 'react';
import './Registro.css'


const RegisterPage = () => {
    const handleLogin = () => {
    window.location.href = "/"; // o tu ruta deseada
  };
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

    const { nombre, email, password, confirmarPassword } = formData;

    if (!nombre || !email || !password || !confirmarPassword) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (password !== confirmarPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // La api va aca

    console.log('Datos enviados:', formData);
    setSuccess('¡Registro exitoso!');
  };
  return(
    <div>
    <div className='register-container'>
        <div className='logo-container'>
            <img src='/logo.png' alt='Logo' className='logo' />
            <button className='login' onClick={handleLogin}>Volver al inicio</button>
        </div>
        <div className='form-container'>
            <h1 >Registrate!</h1>
            <div className="columnas">
                <div className="columna izquierda">
                    <input className='inputRegister' type="text" name="nombre" placeholder="Nombre" onChange={handleChange} />
                    <input className='inputRegister' type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} />
                    <input className='inputRegister' type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
                    <input className='inputRegister' type="password" name="confirmarPassword" placeholder="Confirmar contraseña" onChange={handleChange} />
                </div>
                <div className="columna derecha">
                    <input className='inputRegister' type="text" name="telefono" placeholder="Teléfono" onChange={handleChange} />
                    <input className='inputRegister' type="text" name="direccion" placeholder="Dirección" onChange={handleChange} />
                    <input className='inputRegister' type="text" name="rut" placeholder="RUT" onChange={handleChange} />
                    <input className='inputRegister' type="text" name="tipoPyme" placeholder="Nombre de la Pyme" onChange={handleChange} />
                </div>
            </div>
            <div className="input-centro">
                <input className='inputRegister' type="text" name="registro" placeholder="Año de Registro" onChange={handleChange} />
            </div>
            <button className='register-button' onClick={handleSubmit}>Registrarse</button>
        </div>

    </div>
    </div>
  );


};

export default RegisterPage;