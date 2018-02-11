'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Styles from './styles';

// Subscriptions
class SubscriptionList extends React.Component {
    constructor(props) {
        super(props);
        console.log("SubscriptionList storeId:", this.props.storeid);
    }

    render() {
        let subscriptionList =
            this.props.subscriptions
            .map(item => {

                const toObj = {
                    pathname: "/subscriptions/" + item.id,
                    subscription: item
                };

                return (
                    <tr key={item.id}>
                        <td><Link to={toObj}>{item.name}</Link></td>
                        <td><Link to={toObj}>{item.description}</Link></td>
                        <td><Link to={toObj}>{item.createdon}</Link></td>
                        <td><Link to={toObj}>{item.filters}</Link></td>
                        <td><Link to={toObj}><i className="fa fa-gear"/></Link></td>
                    </tr>
                );
            });

        if (subscriptionList.length === 0) {
            subscriptionList = <tr><td>No subscriptions found</td><td></td><td></td><td></td><td></td></tr>;
        }

        return (
            <div className="my-3">
                <div className="mb-3">
                    <strong>My Subscriptions:</strong>                        
                </div>
                <hr style={Styles.thinHr} />
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Created On</th>
                        <th>Filters</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {subscriptionList}
                    </tbody>
                </table>
            </div>
        );
    }
}

SubscriptionList.propTypes = {
    subscriptions: PropTypes.array.isRequired,
    storeid: PropTypes.string
}

// SubscriptionList HOC
function withSubscriptionList(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                subscriptions: [],
                isLoading: false,
                error: ""
            }

            this.getData = this.getData.bind(this);
        }

        componentDidMount() {
            this.getData();
        }

        getData() {
            let data = [
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

            this.setState({ 
                isLoading: true, 
                subscriptions: [], 
                error: "" 
            });

            // Simulate calling API that returns a promise 
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("withSubscriptionList.Promise resolved");
                    resolve(data);
                }, 100);
            })
            .then(result => {
                console.log("withSubscriptionList.Promise.then resolved: ", result);
                this.setState({
                    subscriptions: result,
                    isLoading: false,
                    error: ""
                });
            })
            .catch(err => {
                console.log("withSubscriptionList.Promise.then rejected: ", err);
                this.setState({
                    subscriptions: [],
                    isLoading: false,
                    error: err
                });
            });
        }

        render() {
            return this.state.isLoading ? <div>Loading data, please wait...</div> :
                this.state.error !== "" ? <div>Error: {this.state.error}</div> : 
                <WrappedComponent subscriptions={this.state.subscriptions} {...this.props} />;
        }
    }
} 

const MockSubscriptionList = withSubscriptionList(SubscriptionList);

export default SubscriptionList;
