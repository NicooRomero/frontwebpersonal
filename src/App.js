import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes/routes';
import AuthProvider from './providers/authProvider';

import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RouteWhitSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  )
}

function RouteWhitSubRoutes(route) {
  return (
    <Route 
      path={route.path}
      exact={route.exact}
      render={props => <route.component routes={route.routes} {...props} />}
    />
  )
}


export default App;
