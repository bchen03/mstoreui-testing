'use strict';

import React from 'react';

import Header from '../components/header';
import NavBar from '../components/navbar';
import Store from '../components/store';

function withMockStore(WrappedComponent) {
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
        }

        componentDidMount() {
            this.getData();
        }

        filterSubscriptions(storeid, subscriptions) {
            return subscriptions.filter(item => item.storeid === storeid);
        }

        getData() {
            let subscriptions = [
                {
                    id: "1",
                    name: "DoubleClick LLD Subscription for store 1",
                    img: "img/doubleclick.png",
                    description: `Amgen DoubleClick LLD data`,
                    createdon: "1/1/2018",
                    filters: "Networks: Amgen (7788), Advertiser: Amgen - BiTE DSE",
                    parameters: {
                        networks: ["7788"],
                        advertisers: ["1"],
                        startdate: "Thu Feb 08 2018 13:25:51 GMT-0500",
                        enddate: "Fri Feb 09 2018 13:25:51 GMT-0500"
                    },
                    storeid: "1"
                },
                {
                    id: "2",
                    name: "DoubleClick LLD Subscription #2 for store 1",
                    img: "img/doubleclick.png",
                    description: `Another DoubleClick LLD subscription`,
                    createdon: "2/1/2018",
                    filters: "Account: Amgen (7788), Advertiser: Amgen - BiTE Education",
                    parameters: {
                        networks: ["7788"],
                        advertisers: ["2"],
                        startdate: "Thu Feb 08 2018 13:25:51 GMT-0500",
                        enddate: "Thu Feb 15 2018 13:25:51 GMT-0500"
                    },
                    storeid: "1"
                },
                {
                    id: "3",
                    name: "DoubleClick LLD Subscription for store 2",
                    img: "img/doubleclick.png",
                    description: `Another DoubleClick LLD subscription`,
                    createdon: "2/1/2018",
                    filters: "Account: Amgen (7788), Advertiser: Amgen - BiTE Education",
                    parameters: {
                        networks: ["7788"],
                        advertisers: ["2"]
                    },
                    storeid: "2"
                },
            ];

            let feeds = [
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

            this.setState({ 
                isLoading: true, 
                subscriptions: [],
                feeds: [],
                error: "" 
            });

            Promise.all([
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log("withMockStore.Promise processing subscriptions...");
                        resolve(this.filterSubscriptions(this.props.match.params.storeId, subscriptions));
                    }, 100)
                }),
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log("withMockStore.Promise processing feeds...");
                        resolve(feeds);
                    }, 100);    
                }),
            ])
            .then(results => {
                console.log("withMockStore.Promise.then resolved results: ", results);
                this.setState({
                    subscriptions: results[0],
                    feeds: results[1],
                    isLoading: false,
                });
            })
            .catch(err => {
                console.log("withMockStore.Promise.catch rejected: ", err);
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

const StoreContainer = withMockStore(Store);

export default StoreContainer;

