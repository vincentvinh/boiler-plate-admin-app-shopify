import React, { Component } from "react";
import {Route, Switch} from "react-router-dom";
import Dashboard from '../Dashboard';

class Router extends Component {
    render() {
        return(
            <Switch>
                <Route path="/" component={Dashboard} />
            </Switch>
        )
    }
}

export default Router;