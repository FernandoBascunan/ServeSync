import React from 'react';
import './InicioSesion.css'


const LoginPage = () => {
  
  const handleRegistro = () => {
    window.location.href = "/registro"; // o tu ruta deseada
  };
  const handlePerfil = () => {
    window.location.href = "/perfil"; // o tu ruta deseada
  };




  return (
    
    <div className='extContainer'>
      <div className='container'>
        <h1>ServeSync</h1>
        <h2>No posees una cuenta? {' '}<button className="registro-link" onClick={handleRegistro}>¡Regístrate!</button></h2>
        <div className='form'>
          <h3>Rut Empresa</h3>
          <input type="text" placeholder="Ingrese su RUT" />
          <h3>Contraseña</h3>
          <input type="password" className='input' placeholder="Ingrese su contraseña" />
          <button className='password-link'>Olvide mi contraseña</button>
          <button className='login-button' onClick={handlePerfil} >Iniciar Sesión</button>
        </div>
      </div>
      <div className='logoContainer'>
        <img src="/logo.png" alt="logoLogin " className="logoLogin"/>
      </div>
  
    </div>
    
  );
};

export default LoginPage;
