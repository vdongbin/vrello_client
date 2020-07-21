import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoutes from './PrivateRoutes';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoutes path="/" exact component={Home} />
        </Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Switch>
          <PrivateRoutes path="/:boardID" component={Board} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
