import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export class Home extends Component {
  render () {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            Inicio
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Inicio</a></li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                  <div class='d-flex justify-content-center align-item-center'>
                    <h1> Reporte 1</h1>
                  </div>
                  <span>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </span>
                  <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">GENERAR REPORTE</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                  <div class='d-flex justify-content-center align-item-center'>
                    <h1> Reporte 2</h1>
                  </div>
                  <span>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </span>
                  <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">GENERAR REPORTE</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                  <div class='d-flex justify-content-center align-item-center'>
                    <h1> Reporte 3</h1>
                  </div>
                  <span>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." </span>
                  <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">GENERAR REPORTE</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home