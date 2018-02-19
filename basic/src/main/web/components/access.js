'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

import Header from './header';
import NavBar from './navbar';
import FeedList from './feedlist';

import Styles from './styles';

// Access
class Access extends React.Component {
	constructor(props) {
        super(props);
        console.log("Access.props.match: ", this.props.match);

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

	render() {
		return (
            <div className="container-fluid">
                <Header />
                <NavBar /> 
                <main className="mx-5 my-4">

                    <div className="my-3">
                        <div className="mb-4">
                            <strong>My Data Access:</strong>                        
                        </div>
                        <hr style={Styles.thinHr} />
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th style={{width: "40%"}}>Description</th>
                                <th>Created On</th>
                                {/*<th>Filters</th>*/}
                                <th style={{width: "60px"}}></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr key={1}>
                                <td><Link to="/access">Beyond Interactive</Link></td>
                                <td><Link to="/access">Beyond Interactive description</Link></td>
                                <td><Link to="/access">Jan 23, 2018</Link></td>
                                {/*<td><Link to={toObj}>{item.filters}</Link></td>*/}
                                <td style={{textAlign: "center", verticalAlign: "middle"}}><Link to="/access"><i className="fa fa-gear"/></Link></td>
                            </tr>
                            <tr key={2}>
                                <td><Link to="/access">Digital Edge - Full Serve</Link></td>
                                <td><Link to="/access">Digital Edge - Full Serve description</Link></td>
                                <td><Link to="/access">Jan 13, 2018</Link></td>
                                {/*<td><Link to={toObj}>{item.filters}</Link></td>*/}
                                <td style={{textAlign: "center", verticalAlign: "middle"}}><Link to="/access"><i className="fa fa-gear"/></Link></td>
                            </tr>

                            </tbody>
                        </table>
                    </div>

                    <br /><br />


                    <FeedList 
                        storeid="666"
                        layout={this.feeds} />
                </main>
            </div>
		)
	}
}

export default Access;