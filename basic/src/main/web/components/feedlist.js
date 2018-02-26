'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Feed from './feed';

// FeedList
class FeedList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const feedList = 
            this.props.feeds.length === 0 ?
            <div className="">No Data Sources exist</div> : 
            this.props.feeds.map(item => 
                <Feed key={item.id}
                    storeid={this.props.storeid} 
                    nexturl={this.props.nexturl} 
                    id={item.id} 
                    title={item.title} 
                    description={item.description} 
                    img={item.img} />
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
    feeds: PropTypes.array.isRequired
}

export default FeedList;

