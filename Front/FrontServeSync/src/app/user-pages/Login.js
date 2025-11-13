import React, { Component } from 'react';
import { Link, withRouter  } from 'react-router-dom';
import { Form } from 'react-bootstrap';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: { rutEmpresa: '', password: '' },
      loading: false,
      error: '',
      success: '',
      rememberMe: false
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

  if (name === "rutEmpresa") {
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

  handleRememberMeChange = (e) => {
    this.setState({ rememberMe: e.target.checked });
  };

  handleSubmit = async (e) => {
  e.preventDefault();

  const { rutEmpresa, password } = this.state.formData;
  if (!rutEmpresa || !password) {
    this.setState({ error: 'Todos los campos son obligatorios' });
    return;
  }

  this.setState({ loading: true, error: '', success: '' });

  try {
    const response = await fetch('http://localhost:8080/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.formData),
      credentials: 'include'
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error('Credenciales incorrectas. Verifica tu RUT y contraseña.');
      } else {
        throw new Error(`Error del servidor (${response.status}): ${response.statusText}`);
      }
    }

    const result = await response.json();

    if (result.success) {

      localStorage.setItem('authToken', result.token);
      localStorage.setItem('userId', result.privateKey);

      if (result.username) {
        localStorage.setItem('username', result.username);
      }

      if (this.state.rememberMe) localStorage.setItem('rememberMe', 'true');

      this.setState({ success: `¡Bienvenido ${result.username || ''}!`, loading: false });

      setTimeout(() => this.props.history.push('/homeee/Home'), 1500);
    } else {
      throw new Error('Credenciales inválidas');
    }
  } catch (error) {
    this.setState({ error: error.message || 'Error al iniciar sesión', loading: false });
  }
};

  render() {
    const { formData, loading, error, success, rememberMe } = this.state;

    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logito.png")} alt="logo" />
                </div>
                <h4>Bienvenido a ServeSync</h4>
                <h6 className="font-weight-light">Inicia sesion para continuar</h6>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <Form className="pt-3" onSubmit={this.handleSubmit}>
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="text"
                      name="rutEmpresa"
                      placeholder="RUT Empresa"
                      size="lg"
                      className="h-auto"
                      value={formData.rutEmpresa}
                      onChange={this.handleInputChange}
                      disabled={loading}
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      size="lg"
                      className="h-auto"
                      value={formData.password}
                      onChange={this.handleInputChange}
                      disabled={loading}
                    />
                  </Form.Group>

                  <div className="mt-3">
                    <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" disabled={loading}>
                      {loading ? 'INICIANDO SESIÓN...' : 'INICIAR SESION'}
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    No tienes una cuenta? <Link to="/user-pages/register-1" className="text-primary">Crear una cuenta</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
