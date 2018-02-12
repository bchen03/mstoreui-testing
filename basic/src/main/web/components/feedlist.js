'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// FeedList
class FeedList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const cardStyle = {
            width: "240px",
            height: "370px",
            marginTop: "20px",
            marginRight: "20px"
        };

        const toObj = {
            pathname: "/subscriptions/0",
            subscription: { storeid: this.props.storeid }
        };

        const feedList = 
            this.props.layout.length === 0 ?
            <div className="">No Data Sources exist</div> : 
            this.props.layout.map(item => 
                <div className="card" style={cardStyle} key={item.id}>
                    <div className="card-body">
                        <h3 className="card-title">
                            <img className="img-fluid mr-3" src={item.img} width="50px" height="50px" alt={item.title} />
                            <span style={{fontSize: "1.1rem"}}>{item.title}</span>
                        </h3>
                        <div className="card-text">
                            {item.description}
                        </div>
                    </div>
                    <div className="card-data">
                        <Link to={toObj} role="button" className="btn btn-sm btn-primary ml-3 mb-3">
                            Subscribe
                        </Link>
                    </div>
                </div>
            );

        return (
            <div className="d-flex flex-column mb-5">
                <div className=""><strong>Data Sources:</strong></div> 
                <div className="d-flex flex-row">
                    {feedList}
                </div>
            </div>
        );
    }
}

FeedList.propTypes = {
    storeid: PropTypes.string.isRequired,
    layout: PropTypes.array.isRequired
}

export default FeedList;