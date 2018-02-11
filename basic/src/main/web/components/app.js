'use strict';

import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Home from './home';
import MockStore from './store';
import MockSubscription from './subscription';

import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import '../main.css';

const App = (props) => {
	const history = createBrowserHistory();

	return (
		<Router history={history}>
			<div>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route path="/stores/:storeId" component={MockStore}/>
					<Route path="/subscriptions/:subscriptionId" component={MockSubscription}/>
					<Redirect to="/" />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
