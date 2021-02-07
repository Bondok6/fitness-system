import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Components/home';
import Nav from './Components/navbar';

import Login from './Components/authentication/login';
import Signup from './Components/authentication/signup';
import ForgetPassword from './Components/authentication/forgetPassword';
import Verify from './Components/authentication/verify';
import ResetPassword from './Components/authentication/resetPassword';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
          <Nav />
            <Switch>
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/login' component= {Login} />
              <Route exact path='/' component= {Home} />
              <Route exact path='/forget' component= {ForgetPassword} />
              <Route exact path='/verify' component= {Verify} />
              <Route exact path='/reset' component= {ResetPassword} />
            </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
