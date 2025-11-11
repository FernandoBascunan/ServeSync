import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        nombreUsuario: '',
        correo: '',
        direccion: '',
        rutEmpresa: '',
        nombreEmpresa: '',
        password: '',
        telefono: '',
        rut: ''
      },
      loading: false,
      error: '',
      success: '',
      termsAccepted: false
    };
  }
  
  formatearRut = (valor) => {
    if (!valor) return "";

    valor = valor.replace(/[^0-9kK]/g, "").toUpperCase();

    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1);

    cuerpo = cuerpo.slice(0, 8);


    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return dv ? `${cuerpo}-${dv}` : cuerpo;
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "rutEmpresa" || name === "rut") {
      newValue = this.formatearRut(newValue);
    }

    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: newValue
      },
      error: ''
    }));
  };

  handleTermsChange = (e) => {
    this.setState({
      termsAccepted: e.target.checked,
      error: ''
    });
  };

  validateForm = () => {
    const { formData, termsAccepted } = this.state;

    if (!formData.nombreUsuario.trim()) return 'El nombre de usuario es requerido';
    if (!formData.correo.trim()) return 'El correo electrónico es requerido';
    if (!formData.rutEmpresa.trim()) return 'El RUT de la empresa es requerido';
    if (!formData.nombreEmpresa.trim()) return 'El nombre de la empresa es requerido';
    if (!formData.password.trim()) return 'La contraseña es requerida';
    if (formData.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    if (!termsAccepted) return 'Debes aceptar los términos y condiciones';

    return null;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = this.validateForm();
    if (validationError) {
      this.setState({ error: validationError });
      return;
    }

    this.setState({ loading: true, error: '', success: '' });

    try {
      const response = await fetch('http://localhost:8080/api/usuarios/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // importante para CORS con cookies si usas autenticación basada en sesión
        body: JSON.stringify(this.state.formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Error del servidor' }));
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Usuario registrado exitosamente:', result);

      this.setState({
        success: '¡Usuario registrado exitosamente! Redirigiendo al login...',
        loading: false
      });

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        this.props.history.push('/user-pages/login-1');
      }, 2000);

    } catch (error) {
      console.error('Error en el registro:', error);
      let errorMessage = 'Error de conexión. Verifica que el backend esté ejecutándose y CORS esté configurado correctamente.';
      if (error.message && !error.message.includes('Failed to fetch')) {
        errorMessage = error.message;
      }
      this.setState({
        error: errorMessage,
        loading: false
      });
    }
  };

  render() {
    const { formData, loading, error, success, termsAccepted } = this.state;

    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logito.png")} alt="logo" />
                </div>
                <h4>Eres nuevo aca?</h4>
                <h6 className="font-weight-light">Registrate de forma sencilla. En simples pasos</h6>

                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {success && <div className="alert alert-success" role="alert">{success}</div>}

                <form className="pt-3" onSubmit={this.handleSubmit}>
                  {Object.entries(formData).map(([key, value]) => (
                    <div className="form-group" key={key}>
                      <input
                        type={key === 'password' ? 'password' : 'text'}
                        name={key}
                        className="form-control form-control-lg"
                        placeholder={key === 'nombreUsuario' ? 'Nombre de Usuario' :
                                    key === 'correo' ? 'Correo Electronico' :
                                    key === 'direccion' ? 'Dirección' :
                                    key === 'rutEmpresa' ? 'RUT Empresa' :
                                    key === 'nombreEmpresa' ? 'Nombre Empresa' :
                                    key === 'telefono' ? 'Teléfono (opcional)' :
                                    key === 'rut' ? 'RUT Personal (opcional)' :
                                    'Contraseña'}
                        value={value}
                        onChange={this.handleInputChange}
                        disabled={loading}
                      />
                    </div>
                  ))}
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={termsAccepted}
                          onChange={this.handleTermsChange}
                          disabled={loading}
                        />
                        <i className="input-helper"></i>
                        Acepto todos los términos y condiciones.
                      </label>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      disabled={loading}
                    >
                      {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Ya tienes una cuenta? <Link to="/user-pages/login-1" className="text-primary">Iniciar Sesion</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;
