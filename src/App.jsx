import React, { useEffect } from 'react';
import './services/index'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import CreateContext from './context/CreateContext';
import { getCookie } from './utils/cookie';
import UserService from './services/UserService';

const { StateProvider, State } = CreateContext()

const App = () => {
  const { state, setState } = State();
  const token = getCookie();
  useEffect(() => {
    (async () => {
      const user = await UserService.MyAccount({ token })
      setState({ ...state, user })
    })()
  }, [])
  return (
    <Router>
      <Switch>
        <Route path="/sign-up" exact component={SignUpPage} />
        <Route path="/sign-in" exact component={SignInPage} />
        {!state.user && <Redirect to="/sign-in" />}
        <Route path="/" exact component={HomePage} />
      </Switch>
    </Router>
  );
}

export default () => (<StateProvider><App /></StateProvider>);
