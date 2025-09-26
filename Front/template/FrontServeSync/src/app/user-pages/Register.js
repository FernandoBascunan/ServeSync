import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Register extends Component {
  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logo.svg")} alt="logo" />
                </div>
                <h4>Eres nuevo aca?</h4>
                <h6 className="font-weight-light">Registrate de forma sencilla. En simples pasos</h6>
                <form className="pt-3">
                  <div className="form-group">
                    <input type="username" className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Nombre" />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Correo Electronico" />
                  </div>
                  <div className="form-group">
                    <input type="addres" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Dirección" />
                  </div>
                  <div className="form-group">
                    <input type="Rut Empresa" className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Rut Empresa" />
                  </div>
                  <div className="form-group">
                    <input type="usarnameCompany" className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Nombre Empresa" />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Contraseña" />
                  </div>
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        Acepto todos los términos y condiciones.
                      </label>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">Registrarse</Link>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Ya tienes uan cuenta? <Link to="/user-pages/login" className="text-primary">Iniciar Sesion</Link>
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

export default Register
