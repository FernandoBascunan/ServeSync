import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Sidebar from './shared/Sidebar';
import SettingsPanel from './shared/SettingsPanel';
import Footer from './shared/Footer';
import { withTranslation } from "react-i18next";
import axios from 'axios';

class App extends Component {
state = {
  zonas: [],
  loadingZonas: true,
  errorZonas: null,
  isFullPageLayout: false,
};

cargarZonas = async () => {
  const empresaID = parseInt(localStorage.getItem("userId"));
  const token = localStorage.getItem("authToken");

  if (!empresaID || !token) {
    console.warn("No hay userId o authToken, no se cargan zonas");
    this.setState({ loadingZonas: false }); // importante para no quedarse "cargando"
    return;
  }

  this.setState({ loadingZonas: true, errorZonas: null });

  try {
    const response = await axios.get(
      `http://localhost:8080/api/mesas/zonas/${empresaID}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    this.setState({ 
      zonas: Array.isArray(response.data) ? response.data : (response.data.zonas || []), 
      loadingZonas: false, 
      errorZonas: null 
    });

  } catch (error) {
    console.error("Error al cargar zonas:", error);
    this.setState({ errorZonas: "No se pudieron cargar las zonas", loadingZonas: false });
  }
};


componentDidMount() {
  this.onRouteChanged();
  this.cargarZonas(); // carga inicial de zonas
  };
  
  render () {
    let sidebarComponent = !this.state.isFullPageLayout ? (
      <Sidebar 
        zonas={this.state.zonas} 
        loading={this.state.loadingZonas} 
        error={this.state.errorZonas} 
        cargarZonas={this.cargarZonas}
      />
    ) : '';
    let SettingsPanelComponent = !this.state.isFullPageLayout ? <SettingsPanel/> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
    return (
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          { sidebarComponent }
          <div className="main-panel">
            <div className="content-wrapper">
              <AppRoutes/>
              { SettingsPanelComponent }
            </div>
            { footerComponent }
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
    const { i18n } = this.props;
    const body = document.querySelector('body');
    if(this.props.location.pathname === '/layout/RtlLayout') {
      body.classList.add('rtl');
      i18n.changeLanguage('ar');
    }
    else {
      body.classList.remove('rtl')
      i18n.changeLanguage('en');
    }
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/user-pages/login-1', '/user-pages/login-2', '/user-pages/register-1', '/user-pages/register-2', '/user-pages/lockscreen', '/error-pages/error-404', '/error-pages/error-500', '/general-pages/landing-page'];
    for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        })
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      }
    }
  }

}

export default withTranslation()(withRouter(App));
