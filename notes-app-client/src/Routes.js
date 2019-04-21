import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import AppliedRoute from './components/AppliedRoute';
import Login from './containers/Login';
import NotFound from './containers/NotFound';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <Route component={NotFound} />
  </Switch>
);
