import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Favorites from '../src/pages/Favorites'
import History from '../src/pages/History'
import Home from '../src/pages/Home'
import NavBar from '../src/components/NavBar'
import NotFound from '../src/pages/NotFound'
import Login from '../src/pages/Register/Login'
import Signup from '../src/pages/Register/Signup'

export default function App() {
  return (


    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/home" component={Home} /> 

        <Route path="/favorites" component={Favorites} />
        <Route path="/history" component={History} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}



