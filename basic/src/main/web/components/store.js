'use strict';

import React from 'react';

import Header from './header';
import NavBar from './navbar';
import SubscriptionList from './subscriptionlist';
import FeedList from './feedlist';
import Destinations from './destinations';


// Store
class Store extends React.Component {
	constructor(props) {
        super(props);
        console.log("Store.props.match: ", this.props.match);
	}

	render() {
		return (
            <div className="container-fluid">
                <Header />
                <NavBar /> 
                <main className="mx-5 my-4">
                    {/*<Destinations />
                    <div className="my-5"></div>*/}
                    <SubscriptionList 
                        storeid={this.props.match.params.storeId}
                        subscriptions={this.props.subscriptions} />
                    <div className="my-5"></div>
                    <FeedList 
                        storeid={this.props.match.params.storeId}
                        feeds={this.props.feeds}
                        nexturl="/subscriptions/0" />
                </main>
            </div>
		)
	}
}

export default Store;