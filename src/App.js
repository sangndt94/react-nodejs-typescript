import React from 'react';
import './service/index'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SignUp}/>
      </Switch>
    </Router>
  );
}

export default App;
