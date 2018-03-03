'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Feed = ({ storeid, nexturl, id: feedid, title, description, img }) => {
    const cardStyle = {
        width: "270px",
        height: "370px",
        marginTop: "20px",
        marginRight: "20px"
    };

    const toObj = {
        pathname: nexturl,
        storeid: storeid
    };

    return (
        <div className="card" style={cardStyle} key={feedid}>
            <div className="card-body">
                <h3 className="card-title">
                    <img className="img-fluid mr-3" src={img} width="50px" height="50px" alt={title} />
                    <span style={{fontSize: "1.1rem"}}>{title}</span>
                </h3>
                <div className="card-text">
                    {description}
                </div>
            </div>
            <div className="card-data">
                <Link 
                    to={toObj} 
                    role="button" 
                    className="btn btn-sm btn-primary ml-3 mb-3">
                    Subscribe
                </Link>
            </div>
        </div>
    );
};


Feed.propTypes = {
    storeid: PropTypes.string.isRequired,
    nexturl: PropTypes.string.isRequired, 
    id: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired, 
    description: PropTypes.string, 
    img: PropTypes.string.isRequired
}

export default Feed;