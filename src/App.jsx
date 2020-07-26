import React, { useEffect } from 'react';
import './services/index'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import CreateContext from './context/CreateContext';
import { getCookie } from './utils/cookie';
import UserService from './services/UserService';
import UserRoutes from './routes/User.routes';
import AuthRoutes from './routes/Auth.routes';

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
      {state.user ? (
        <UserRoutes />
      ) : (
          <AuthRoutes />
        )}
    </Router>
  );
}

export default () => (<StateProvider><App /></StateProvider>);
