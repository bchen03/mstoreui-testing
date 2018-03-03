'use strict';

import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import LoginPage from '../pages/loginpage';
import HomePage from '../pages/homepage';
import AccessPage from '../pages/accesspage';
import AddStorePage from '../pages/addstorepage';
import SupportPage from '../pages/supportpage';
import StoreContainer from '../containers/storecontainer';
import SubscriptionContainer from '../containers/subscriptioncontainer';
import NewDataAccessContainer from '../containers/newdataaccesscontainer';

import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import '../main.css';

const App = (props) => {
	const history = createBrowserHistory();
	return (
		<Router history={history}>
			<div>
				<Switch>
					<Route exact path="/" component={LoginPage}/>
					<Route path="/home" component={HomePage}/>
					<Route path="/stores/:storeId" component={StoreContainer}/>
					<Route path="/subscriptions/:subscriptionId" component={SubscriptionContainer}/>
					<Route path="/access" component={AccessPage}/>
					<Route path="/newdataaccess" component={NewDataAccessContainer}/>
					<Route path="/addstore" component={AddStorePage}/>
					<Route path="/support" component={SupportPage}/>
					<Redirect to="/" />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
