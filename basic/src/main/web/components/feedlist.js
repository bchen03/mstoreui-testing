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
            <div className="">No Feeds exist</div> : 
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
                <div className=""><strong>Feeds:</strong></div> 
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

// FeedList HOC
function withMockFeedList(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                layout: [],
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
                layout: [], 
                error: "" 
            });

            // Simulate calling API that returns a promise 
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("withMockFeedList.Promise resolved");
                    resolve(data);
                }, 100);
            })
            .then(result => {
                console.log("withMockFeedList.Promise.then resolved: ", result);
                this.setState({
                    layout: result,
                    isLoading: false,
                    error: ""
                });
            })
            .catch(err => {
                console.log("withMockFeedList.Promise.then rejected: ", err);
                this.setState({
                    layout: [],
                    isLoading: false,
                    error: err
                });
            });
        }
        
        render() {
            return this.state.isLoading ? <div>Loading data, please wait...</div> :
                this.state.error !== "" ? <div>Error: {this.state.error}</div> : 
                <WrappedComponent layout={this.state.layout} {...this.props} />;
        }
    }
} 

const MockFeedList = withMockFeedList(FeedList);

export default FeedList;