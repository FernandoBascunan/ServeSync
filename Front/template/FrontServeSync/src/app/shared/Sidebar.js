import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Sidebar extends Component {
  state = {}


  handleLogout = () =>{
    localStorage.removeItem("authToken")
    localStorage.removeItem("username")
    localStorage.removeItem("userId")
    localStorage.removeItem("rememberMe")

    if (this.props.history) {
      this.props.history.push("/login"); // si Sidebar recibe history de react-router
    } else {
      window.location.href = "/login"; // alternativa rápida
    }
  }


  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/apps', state: 'appsMenuOpen'},
      {path:'/inventory', state: 'inventorySta'},
      {path:'/zone', state: 'zoneSta'},
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  } 
  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <a className="sidebar-brand brand-logo" href="index.html"><img src={require("../../assets/images/a.png")} alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini pt-3" href="index.html"><img src={require("../../assets/images/logo-mini.svg" )} alt="logo" /></a>
        </div>
        <ul className="nav">
          <li className="nav-item nav-profile not-navigation-link">
            <div className="nav-link">
              <Dropdown>
                <Dropdown.Toggle className="nav-link user-switch-dropdown-toggler p-0 toggle-arrow-hide bg-transparent border-0 w-100">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="text-wrapper">
                      <p className="profile-name">{localStorage.getItem("username") || "Invitado"}</p>
                      <p className="designation">Main user</p>
                    </div>
                    
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="preview-list navbar-dropdown">
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small" onClick={evt =>evt.preventDefault()}>
                    <Trans>Ajuste de la cuenta</Trans>
                  </Dropdown.Item>
                  <Dropdown.Item className="dropdown-item preview-item d-flex align-items-center text-small" onClick={this.handleLogout}>
                    <Trans>Cerrar Sesion</Trans>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>
          <li className={ this.isPathActive('/home') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/homeee/home">
              <i className="mdi mdi-home menu-icon"></i>
              <span className="menu-title"><Trans>Inicio</Trans></span>
            </Link>
          </li>
          <li className={ this.isPathActive('/inventory') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.inventorySta ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('inventorySta') } data-toggle="collapse">
              <i className="mdi mdi-crosshairs-gps menu-icon"></i>
              <span className="menu-title"><Trans>Inventario</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.inventorySta }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/inventory/inventoryManage') ? 'nav-link active' : 'nav-link' } to="/inventory/inventoryManage"><Trans>Lista de productos</Trans></Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/inventory/addProduct') ? 'nav-link active' : 'nav-link' } to="/inventory/addProduct"><Trans><i className='mdi mdi-plus'></i> Agregar producto nuevo</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/zone') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.zoneSta ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('zoneSta') } data-toggle="collapse">
              <i className="mdi mdi-crosshairs-gps menu-icon"></i>
              <span className="menu-title"><Trans>Zonas de mesas</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.zoneSta }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/zones/zone') ? 'nav-link active' : 'nav-link' } to="/zones/zone"><Trans>Zona 1</Trans></Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/zones/zone') ? 'nav-link active' : 'nav-link' } to="/zones/zone"><Trans>Zona 2</Trans></Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/zones/addZone') ? 'nav-link active' : 'nav-link' } to="/zones/addZone"><Trans><i className='mdi mdi-plus'></i> Agregar zona nueva</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/orderPage') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.ordersMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('ordersMenuOpen') } data-toggle="collapse">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title"><Trans>Pedidos</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.ordersMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/orderPage/order') ? 'nav-link active' : 'nav-link' } to="/orderPage/order"><Trans>Lista de pedidos</Trans></Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/orderPage/addOrder') ? 'nav-link active' : 'nav-link' } to="/orderPage/addOrder"><Trans><i className='mdi mdi-plus'></i> Agregar pedido</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/basic-ui') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('basicUiMenuOpen') } data-toggle="collapse">
              <i className="mdi mdi-crosshairs-gps menu-icon"></i>
              <span className="menu-title"><Trans>Basic UI Elements</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.basicUiMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/buttons') ? 'nav-link active' : 'nav-link' } to="/basic-ui/buttons"><Trans>Buttons</Trans></Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/dropdowns') ? 'nav-link active' : 'nav-link' } to="/basic-ui/dropdowns"><Trans>Dropdowns</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/form-elements') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.formElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('formElementsMenuOpen') } data-toggle="collapse">
              <i className="mdi mdi-format-list-bulleted menu-icon"></i>
              <span className="menu-title"><Trans>Form Elements</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.formElementsMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/form-elements/basic-elements') ? 'nav-link active' : 'nav-link' } to="/form-elements/basic-elements"><Trans>Basic Elements</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/tables') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.tablesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('tablesMenuOpen') } data-toggle="collapse">
              <i className="mdi mdi-table-large menu-icon"></i>
              <span className="menu-title"><Trans>Tables</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.tablesMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/tables/basic-table') ? 'nav-link active' : 'nav-link' } to="/tables/basic-table"><Trans>Basic Table</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/icons') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('iconsMenuOpen') } data-toggle="collapse">
              <i className="mdi mdi-account-box-outline menu-icon"></i>
              <span className="menu-title"><Trans>Icons</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.iconsMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/icons/mdi') ? 'nav-link active' : 'nav-link' } to="/icons/mdi">Material</Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/charts') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.chartsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('chartsMenuOpen') } data-toggle="collapse">
              <i className="mdi mdi-chart-line menu-icon"></i>
              <span className="menu-title"><Trans>Charts</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.chartsMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/charts/chart-js') ? 'nav-link active' : 'nav-link' } to="/charts/chart-js">Chart Js</Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/user-pages') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('userPagesMenuOpen') } data-toggle="collapse">
              <i className="mdi mdi-lock-outline menu-icon"></i>
              <span className="menu-title"><Trans>User Pages</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.userPagesMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/user-pages/login-1') ? 'nav-link active' : 'nav-link' } to="/user-pages/login-1"><Trans>Login</Trans></Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/user-pages/register-1') ? 'nav-link active' : 'nav-link' } to="/user-pages/register-1"><Trans>Register</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/error-pages') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.errorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('errorPagesMenuOpen') } data-toggle="collapse">
              <i className="mdi mdi-information-outline menu-icon"></i>
              <span className="menu-title"><Trans>Error Pages</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.errorPagesMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/error-pages/error-404') ? 'nav-link active' : 'nav-link' } to="/error-pages/error-404">404</Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/error-pages/error-500') ? 'nav-link active' : 'nav-link' } to="/error-pages/error-500">500</Link></li>
              </ul>
            </Collapse>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://www.bootstrapdash.com/demo/star-admin-free/react/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
              <i className="mdi mdi-file-outline menu-icon"></i>
              <span className="menu-title"><Trans>Documentation</Trans></span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);