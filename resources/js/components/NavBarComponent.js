import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../Views/Home';
import Login from '../Views/Login';
import { getToken } from '../Utils/tokenConfig';

export default class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: getToken()
        }
    }

    render() {
        let routes;
        if (this.state.token){
            routes = (<Home />);
        } else {
            routes = (<Login />);
        }

        return(
            <React.Fragment>
                <Router>
                    <Route exact path="/" >
                        {routes}
                    </Route>
                    <Route exact path="/login" >
                        {routes}
                    </Route>
                </Router>
            </React.Fragment>
        )
    }
}
