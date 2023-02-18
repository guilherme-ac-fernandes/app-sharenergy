import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import RandomUsers from '../pages/RandomUsers/RandomUsers';
import Cat from '../pages/Cat/Cat';
import Dog from '../pages/Dog/Dog';
import Users from '../pages/Users/Users';
import NotFound from '../pages/NotFound/NotFound';

export default function DeliveryRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/users/random" component={RandomUsers} />
      <Route exact path="/cat" component={Cat} />
      <Route exact path="/dog" component={Dog} />
      <Route exact path="/users/crud" component={Users} />
      <Route exact path="*" component={NotFound} />
    </Switch>
  );
}
