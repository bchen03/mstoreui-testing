'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Subscription = props => {

    const { storeid, item } = props;

    console.log("Subscription storeid: ", storeid, ", item:", item);

    const toObj = {
        pathname: "/subscriptions/" + item.id,
        storeid: storeid,
        subscription: item
    };

    return (
        <tr key={item.id}>
            <td><Link to={toObj}>{item.name}</Link></td>
            <td><Link to={toObj}>{item.description}</Link></td>
            <td><Link to={toObj}>{item.createdon}</Link></td>
            {/*<td><Link to={toObj}>{item.filters}</Link></td>*/}
            <td style={{textAlign: "center", verticalAlign: "middle"}}><Link to={toObj}><i className="fa fa-gear"/></Link></td>
        </tr>
    );
};

Subscription.propTypes = {
    storeid: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired
}

export default Subscription;