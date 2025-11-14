import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Home = lazy(() => import('./homeee/Home'));

const Inventory = lazy(() => import('./inventory/inventoryManage'))
const addProduct = lazy(() => import('./inventory/addProduct'))

const Zone = lazy(() => import('./zonePage/zone'))

const Orders = lazy(() => import('./orderPage/order'))
const AddOrder = lazy(() => import('./orderPage/addOrder'))


const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));


class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/homeee/home" component={ Home } />

          <Route exact path="/inventory/inventoryManage" component={ Inventory } />
          <Route exact path="/inventory/addProduct" component={ addProduct } />
          <Route path="/zonePage/zone/:id"render={(props) => (<Zone {...props} cargarZonas={this.props.cargarZonas} />)}/>

          <Route exact path="/orderPage/order" component={ Orders } />
          <Route exact path="/orderPage/addOrder" component={ AddOrder } />

          <Route path="/user-pages/login-1" component={ Login } />
          <Route path="/user-pages/register-1" component={ Register1 } />



          <Redirect to="/user-pages/login-1" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;