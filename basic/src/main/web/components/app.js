'use strict';

import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Login from './login';
import Home from './home';
import AddStore from './addstore';
import StoreContainer from '../containers/storecontainer';
import SubscriptionContainer from '../containers/subscriptioncontainer';

import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import '../main.css';

const App = (props) => {
	const history = createBrowserHistory();

	return (
		<Router history={history}>
			<div>
				<Switch>
					<Route exact path="/" component={Login}/>
					<Route path="/home" component={Home}/>
					<Route path="/stores/:storeId" component={StoreContainer}/>
					<Route path="/subscriptions/:subscriptionId" component={SubscriptionContainer}/>
					<Route path="/addstore" component={AddStore}/>
					<Redirect to="/" />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
