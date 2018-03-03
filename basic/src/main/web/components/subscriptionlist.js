'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Subscription from './subscription';

import Styles from './styles';


class SubscriptionList extends React.Component {
    constructor(props) {
        super(props);
        console.log("SubscriptionList storeId:", this.props.storeid);
    }

    render() {
        let subscriptionList =
            this.props.subscriptions
            .map(item => (
                <Subscription key={item.id} storeid={this.props.storeid} item={item} />
            ));

        if (subscriptionList.length === 0) {
            subscriptionList = <tr><td>No subscriptions found</td><td></td><td></td><td></td><td></td></tr>;
        }

        return (
            <div className="my-3">
                <div className="mb-4">
                    <strong>My Subscriptions:</strong>                        
                </div>
                <hr style={Styles.thinHr} />
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th style={{width: "50%"}}>Description</th>
                        <th>Created On</th>
                        {/*<th>Filters</th>*/}
                        <th style={{width: "60px"}}></th>
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
    storeid: PropTypes.string,
    subscriptions: PropTypes.array.isRequired
}

export default SubscriptionList;







