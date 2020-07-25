import React from 'react';
import Routes from './Routes';
import setAuthToken from '../src/utils/setAuthToken';

function App() {
  const jwt = localStorage.getItem('vrello_jwt');
  if (jwt) {
    setAuthToken(jwt);
  }

  return <Routes />;
}

export default App;
