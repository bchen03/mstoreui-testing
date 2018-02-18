'use strict';

import React from 'react';
import axios from 'axios';

import Header from '../components/header';
import NavBar from '../components/navbar';
import Store from '../components/store';

import {mapSubscriptionState} from '../selectors/storeselector';

function withStore(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                subscriptions: [],
                feeds: [],
                isLoading: false,
                error: ""
            };

            this.getData = this.getData.bind(this);

            this.feeds = [
                {
                    id: "1",
                    title: "DoubleClick LLD",
                    img: "/img/doubleclick.png",
                    description: `DoubleClick LLD provides raw data that can deliver analytics 
                    beyond standard DoubleClick data. To take full advantage, your organization 
                    will need to: extract, transform, and load large files.`
                },
                {
                    id: "3",
                    title: "DFA Reporting",
                    img: "/img/doubleclick.png",
                    description: `DoubleClick for Advertisers provides aggregate data that can deliver 
                    standard report metrics.`
                },
                {
                    id: "2",
                    title: "Sizmek LLD",
                    img: "/img/sizmek2.png",
                    description: `At Sizmek we believe creating impressions that inspire is vital 
                    to building meaningful, long-lasting relationships with your customers.`
                },
                {
                    id: "4",
                    title: "Tagr",
                    img: "/img/tagr.jpg",
                    description: `Tagr is a universal JavaScript tag that is placed across a client’s 
                    website to measure the connection between digital media and site interaction.`
                },
            ];



        }

        componentDidMount() {
            this.getData();
        }

        filterSubscriptions(storeid, subscriptions) {
            return subscriptions.filter(item => item.storeid === storeid);
        }

        getData() {
            this.setState({ 
                isLoading: true, 
                subscriptions: [],
                feeds: [],
                error: "" 
            });

            axios.get('http://localhost:8090/v1/stores/' + this.props.match.params.storeId + '/subscriptions', {
            })
            .then(response => {
                console.log("withStore.getData success, data: ", response.data.data);
                this.setState({
                    subscriptions: mapSubscriptionState(response.data.data),
                    feeds: this.feeds,
                    isLoading: false,
                });
            }) 
            .catch(err => {
                console.log("withStore.getData failed: ", err);
                this.setState({
                    isLoading: false,
                    error: err
                });
            });

        }

        getData2() {
            let subscriptions = [
                {
                    id: "1",
                    name: "DoubleClick LLD Subscription for store 1 (TEST)",
                    img: "img/doubleclick.png",
                    description: `Amgen DoubleClick LLD data`,
                    createdon: "1/1/2018",
                    filters: "Networks: Amgen (7788), Advertiser: Amgen - BiTE DSE",
                    parameters: {
                        network_id: "7788",
                        advertiser_id: "1",
                        start_date: "Thu Feb 08 2018 13:25:51 GMT-0500",
                        end_date: "Fri Feb 09 2018 13:25:51 GMT-0500"
                    },
                    storeid: "1"
                },
                {
                    id: "2",
                    name: "DoubleClick LLD Subscription #2 for store 1 (TEST)",
                    img: "img/doubleclick.png",
                    description: `Another DoubleClick LLD subscription`,
                    createdon: "2/1/2018",
                    filters: "Account: Amgen (7788), Advertiser: Amgen - BiTE Education",
                    parameters: {
                        network_id: "7788",
                        advertiser_id: "2",
                        start_date: "Thu Feb 08 2018 13:25:51 GMT-0500",   
                        end_date: "Thu Feb 15 2018 13:25:51 GMT-0500"
                    },
                    storeid: "1"
                },
                {
                    id: "3",
                    name: "DoubleClick LLD Subscription for store 2 (TEST)",
                    img: "img/doubleclick.png",
                    description: `Another DoubleClick LLD subscription`,
                    createdon: "2/1/2018",
                    filters: "Account: Amgen (7788), Advertiser: Amgen - BiTE Education",
                    parameters: {
                        network_id: "7788",
                        advertiser_id: "2",
                        start_date: "Thu Feb 08 2018 13:25:51 GMT-0500",
                        end_date: "Thu Feb 15 2018 13:25:51 GMT-0500"
                    },
                    storeid: "2"
                },
            ];

            this.setState({ 
                isLoading: true, 
                subscriptions: [],
                feeds: [],
                error: "" 
            });

            Promise.all([
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log("withStore.Promise processing subscriptions...");
                        resolve(this.filterSubscriptions(this.props.match.params.storeId, subscriptions));
                    }, 100)
                }),
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log("withStore.Promise processing feeds...");
                        resolve(this.feeds);
                    }, 100);    
                }),
            ])
            .then(results => {
                console.log("withStore.Promise.then resolved results: ", results);
                this.setState({
                    subscriptions: results[0],
                    feeds: results[1],
                    isLoading: false,
                });
            })
            .catch(err => {
                console.log("withStore.Promise.catch rejected: ", err);
                this.setState({
                    isLoading: false,
                    error: err
                });
            });
        }

        render() {
            return this.state.isLoading ? 
                <div className="container-fluid" style={{height:"100%", width:"100%"}}>
                    <Header />
                    <NavBar />
                    <main className="mx-5 my-4">
                        <div>Loading data, please wait...</div>
                    </main>
                </div> :
                this.state.error !== "" ? 
                <div className="container-fluid" style={{height:"100%", width:"100%"}}>
                    <Header />
                    <NavBar />
                    <main className="mx-5 my-4">
                        <div>Error: {this.state.error}</div>
                    </main>
                </div> :
                <WrappedComponent 
                    subscriptions={this.state.subscriptions}
                    feeds={this.state.feeds} 
                    {...this.props} />;
        }
    };
}

const StoreContainer = withStore(Store);

export default StoreContainer;

