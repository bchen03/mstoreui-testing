'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Header from './header';
import NavBar from './navbar';
import MockSubscriptionList from './subscriptionlist';
import MockFeedList from './feedlist';
import Destinations from './destinations';

// Store
class Store extends React.Component {
	constructor(props) {
        super(props);
        console.log("Store.props.match: ", this.props.match);
	}

	render() {
		return (
            <div className="container-fluid" style={{height:"100%", width:"100%"}}>
                <Header />
                <NavBar />
                <main className="mx-5 my-4">
                    {/*<Destinations />
                    <div className="my-5"></div>*/}
                    <MockSubscriptionList storeid={this.props.match.params.storeId} />
                    <div className="my-5"></div>
                    <MockFeedList storeid={this.props.match.params.storeId} />
                </main>
            </div>
		)
	}
}

export default Store;
