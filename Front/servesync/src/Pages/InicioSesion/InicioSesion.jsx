import React from 'react';
import './InicioSesion.css'

const LoginPage = () => {

  const handleRegistro = () => {
    window.location.href = "/registro"; // o tu ruta deseada
  };

  return (
    <div >
      <header className='header'>
        <img src="/logo.png" alt="Logo" className='logo' />
      </header>
      <div className='container'>
        <h1>ServeSync</h1>
        <h2>No posees una cuenta? {' '}<button className="registro-link" onClick={handleRegistro}>
        ¡Regístrate!
      </button></h2>
      <div className='form'>
        <h3>Rut Empresa</h3>
        <textarea></textarea>
        <h3>Contraseña</h3>
        <textarea></textarea>
        <button className='password-link'>Olvide mi contraseña</button>
        <button className='login-button'>Iniciar Sesión</button>
      </div>


      </div>
      <div className='footer'>
        
      </div>
    </div>
    
  );
};

export default LoginPage;
