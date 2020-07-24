import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Board from './components/Board';
import PrivateRoutes from './PrivateRoutes';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoutes path="/" exact component={Home} />
      </Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Switch>
        <PrivateRoutes path="/:boardID" component={Board} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
