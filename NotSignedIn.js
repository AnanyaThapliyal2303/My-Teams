import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Input } from "@material-ui/core";
import Login from './components/pages/Login';
import Register from './components/pages/Register';

function NotSignedIn() {
    return (
        <div>
            
            <Router>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/login"component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </Router>

        
        </div>
    )
}

export default NotSignedIn