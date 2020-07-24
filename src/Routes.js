import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Board from './components/Board';
import PrivateRoutes from './PrivateRoutes';
import Navbar from './components/Navbar';

const AppRouter = () => {
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <PrivateRoutes path="/" exact component={Home} />
        <PrivateRoutes path="/board/:boardID" component={Board} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Redirect path="*" to="/" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
