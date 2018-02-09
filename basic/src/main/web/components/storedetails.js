'use strict';

//import "jquery";
//import "popper.js";
import "node-waves";
import "bootstrap";
import "mdbootstrap";

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Header from './header';
import NavBar from './navbar';
import MockSubscriptions from './subscriptions';
import MockFeeds from './feeds';
import Destinations from './destinations';

// StoreDetails
export default class StoreDetails extends React.Component {
	constructor(props) {
        super(props);
        console.log("StoreDetails.match: ", this.props.match);
	}

	render() {
		return (
            <div className="container-fluid" style={{height:"100%", width:"100%"}}>
                <Header />
                <NavBar />
                <main className="mx-5 my-4">
                    {/*<Destinations />
                    <div className="my-5"></div>*/}
                    <MockSubscriptions storeid={this.props.match.params.storeId} />
                    <div className="my-5"></div>
                    <MockFeeds storeid={this.props.match.params.storeId} />
                </main>
            </div>
		)
	}
}

