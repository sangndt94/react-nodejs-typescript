import React from 'react';
import './services/index'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import CreateContext from './context/CreateContext';
const { StateProvider } = CreateContext()

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/sign-up" exact component={SignUpPage} />
        <Route path="/" exact component={HomePage} />
        <Route path="/sign-in" exact component={SignInPage} />
      </Switch>
    </Router>
  );
}

export default () => (<StateProvider><App /></StateProvider>);
