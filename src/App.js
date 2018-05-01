import React from 'react';
import { Switch, Route } from "react-router-dom";
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

const App = () => (
  <div>
  <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={LoginForm} />
      <Route path="/register" component={RegisterForm} />
      <Route path="/dashboard" component={Dashboard} />
  </Switch>

  </div>

);

export default App;
