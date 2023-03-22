import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Register from '../pages/Register';
import User from '../pages/User';

export default function Ways() {
  return (
    <Switch>
      <MyRoute exact path="/login" component={Login} isClosed={false} />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />
      <MyRoute exact path="/:id/edit/" component={User} isClosed={false} />
      <MyRoute exact path="/" component={Home} isClosed={false} />
      <MyRoute path="*" component={Page404} isClosed={false} />
    </Switch>
  );
}
