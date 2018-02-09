'use strict';

import "jquery";
import "popper.js";
import "node-waves";
import "bootstrap";
import "mdbootstrap";

import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Home from './home';
import DoubleClick from './doubleclick';
import StoreDetails from './storedetails';
//import Sizmek from './sizmek';

import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import '../main.css';

const history = createBrowserHistory();

export default class App extends React.Component {
	constructor(props) {
		super(props);

		console.log("App:href: ", window.location.href);

		this.state = {
        };
	}

	componentDidMount() {
	}

	render() {
		return (
            <Router history={history}>
                <div>
					<Switch>
						<Route exact path="/" component={Home}/>
						<Route path="/storedetails/:storeId" component={StoreDetails}/>
						<Route path="/doubleclick/:subscriptionId" component={DoubleClick}/>
					</Switch>
                </div>
            </Router>
        );
	}
}


