'use strict';

import React from 'react';

import Header from '../components/header';
import NavBar from '../components/navbar';
import Subscription from '../components/subscription';


function withMockSubscription(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                networks: [],
                advertisers: [],
                isLoading: false,
                error: ""
            }

            this.getData = this.getData.bind(this);
        }

        componentDidMount() {
            console.log("withMockSubscription.componentDidMount()");
            this.getData();
        }

        componentWillUnmount() {
            console.log("withMockSubscription.componentWillUnmount()");
        }

        getData() {
            console.log("withMockSubscription.getData() called");

            const availableNetworks = [
                { name: "Digital Edge - Full Serve (869)", value: "869"},
                { name: "Friendly (1234)", value: "1234"},
                { name: "WhatsApp (2222)", value: "2222"},
                { name: "Marriott (4406)", value: "4406"},
                { name: "DayGlo (5333)", value: "5333"},
                { name: "MEC Global (6923)", value: "6923"},
                { name: "United Airlines (7286)", value: "7286"},
                { name: "Amgen (7788)", value: "7788"},
                { name: "MEC NA Invisalign (7866)", value: "7866"},
                { name: "Farmers Insurance (7890)", value: "7890"},
                { name: "RiteAid (8567)", value: "8567"},
                { name: "Costco (9234)", value: "9234"},
                { name: "Honda (9567)", value: "9567"},
                { name: "Hertz (410601)", value: "410601"},
            ];

            const availableAdvertisers = [
                { name: "Amgen - BiTE DSE", value: "1"},
                { name: "Amgen - BiTE Education", value: "2"},
                { name: "Amgen - Blincyto", value: "3"},
                { name: "Amgen - Chemotherapy", value: "4"},
                { name: "Amgen - Cholesterol", value: "5"},
                { name: "Amgen - Corlanor", value: "6"},
                { name: "Amgen - Enbrel RA", value: "7"},
                { name: "Amgen - Enbrel RA HCP", value: "8"},
                { name: "Amgen - ITP", value: "9"},
                { name: "Amgen - IVA DTC", value: "10"},
            ];

            this.setState({ 
                isLoading: true, 
                networks: [],
                advertisers: [],
                error: "" 
            });

            // Simulate calling API that returns a promise 
            new Promise((resolve, reject) => {
                setTimeout(() => {
                     console.log("withMockSubscription.Promise processing networks...");
                    resolve(availableNetworks);
                    //reject("==> networks rejected");
                }, 100);
            })
            .then(
                result => {
                    console.log("withMockSubscription.Promise.then resolved networks: ", result);
                    this.setState({
                        networks: result
                    });
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            console.log("withMockSubscription.Promise processing advertisers...");
                            resolve(availableAdvertisers);
                            //reject("==> Advertisers rejected");
                        }, 100);
                    });
                }, err => {
                    console.log("withMockSubscription.Promise.then rejected networks: ", err);
                    this.setState({
                        isLoading: false,
                        error: err
                    });
                }
            )
            .then(
                result => {
                    if (result) {
                        console.log("withMockSubscription.Promise.then resolved advertisers: ", result);
                        this.setState({
                            advertisers: result,
                            isLoading: false,
                        });
                    }
                }, err => {
                    console.log("withMockSubscription.Promise.catch rejected advertisers: ", err);
                    this.setState({
                        isLoading: false, 
                        error: this.state.error + "," + err
                    });
                }
            );
        }

        render() {
            return this.state.isLoading ?
                <div className="container-fluid" style={{height:"100%", width:"100%"}}>
                    <Header />
                    <NavBar />
                    <div className="mx-5">
                        <div>Loading data, please wait...</div>
                        </div>
                </div> :
                this.state.error !== "" ? 
                <div className="container-fluid" style={{height:"100%", width:"100%"}}>
                    <Header />
                    <NavBar />
                    <div className="mx-5">
                        <div>Error: {this.state.error}</div>
                    </div>
                </div> :
                <WrappedComponent 
                    availableNetworks={this.state.networks}
                    availableAdvertisers={this.state.advertisers} 
                    {...this.props} />;
        }
    }
}

const SubscriptionContainer = withMockSubscription(Subscription);

export default SubscriptionContainer;
