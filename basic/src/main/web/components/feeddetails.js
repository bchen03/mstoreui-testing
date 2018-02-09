'use strict';

import "jquery";
//import "jquery-ui/ui/widgets/datepicker";
import "popper.js";
import "node-waves";
import "bootstrap";
import "mdbootstrap";

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import SelectionList from './selectionlist';

import 'react-datepicker/dist/react-datepicker.css';


class FeedDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.buildState();

        this.buildState = this.buildState.bind(this);
        this.selectionUpdated = this.selectionUpdated.bind(this);
        this.dateChanged = this.dateChanged.bind(this);
    }

    buildState() {
        const result = this.props.layout.parameters.reduce((acc, item) => {
            if (item.type === "selectionlist-api") {
                acc["list-available-" + item.id] = [];
                acc["list-selected-" + item.id] = [];
            }
            else if (item.type === "date") {
                acc["date-" + item.id] = moment();
            }
            return acc;
        }, {});

        console.log("buildState result: ", result);

        return result;
    }

    selectionUpdated(available, selected) {
        console.log("selectionUpdated: ", available, ",", selected);
    }

    dateChanged(date) {
        console.log("dateChanged: ", available, ",", selected);
    }

    render() {
        console.log("FeedDetails.props.available", this.props.available);

        const result = this.props.layout.parameters.map(item => {
            if (item.type === "selectionlist-api") {
                return (
                    <div className="row" key={item.id}>
                        <div className="col">
                            <SelectionList 
                                title={item.title}
                                available={(item.id === "1") ? this.props.available : this.state["list-available-" + item.id]} 
                                selected={this.state["list-selected-" + item.id]} 
                                onUpdate={this.selectionUpdated} />
                        </div>
                    </div>
                );
            }
            else if (item.type === "date") {
                return (
                    <div className="row" key={item.id}>
                        <div className="col">
                            <div className="md-form" style={{width:"40%"}}>
                                <div>{item.title}</div>
                                <i className="fa fa-calendar prefix"></i>                
                                <DatePicker 
                                    className="ml-5" 
                                    selected={this.state["date-" + item.id]} 
                                    onChange={this.dateChanged} />
                            </div>
                        </div>
                    </div>
                ); 
            }                
        });            

        console.log("FeedDetails result: ", result);

        return (
            <div>{result}</div>        
        );
    }
};

// FeedList HOC
function withMockFeedDetails(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                layout: {
                    title: "DoubleClick LLD",
                    description: `DoubleClick LLD provides raw data that can deliver analytics beyond 
                    standard DoubleClick data. To take full advantage, your organization will need to: 
                    extract, transform, and load large files.`,
                    img: "/img/doubleclick.png", 
                    parameters: [
                        {
                            id: "1",
                            title: "Networks",
                            description: `DoubleClick Networks`,
                            type: "selectionlist-api",
                            api: ""
                        }
                        ,{
                            id: "2",
                            title: "Advertisers",
                            description: `DoubleClick Advertisers`,
                            type: "selectionlist-api",
                            api: ""
                        }
                        ,{
                            id: "3",
                            title: "Start Date",
                            description: `Retrieve DoubleClick data starting from this date`,
                            type: "date"
                        }
                        ,{
                            id: "4",
                            title: "End Date",
                            description: `Retrieve DoubleClick data ending at this date`,
                            type: "date"
                        }
                    ]
                },
                availableNetworks: [
                    { name: "Amgen (7788)", value: "7788"},
                    { name: "Digital Edge - Full Serve (869)", value: "869"},
                    { name: "Hertz (410601)", value: "410601"},
                    { name: "Marriott (4406)", value: "4406"},
                    { name: "MEC Global (6923)", value: "6923"},
                    { name: "MEC NA Invisalign (7866)", value: "7866"},
                    { name: "United Airlines (7286)", value: "7286"},
                    { name: "Costco (9234)", value: "9234"},
                    { name: "Honda (9567)", value: "9567"},
                    { name: "RiteAid (8567)", value: "8567"},
                    { name: "Friendly (1234)", value: "1234"},
                    { name: "DayGlo (5333)", value: "5333"},
                    { name: "WhatsApp (2222)", value: "2222"},
                    { name: "Farmers Insurance (7890)", value: "7890"},
                ]

            }
        }

        render() {
            return <WrappedComponent 
                    layout={this.state.layout} 
                    available={this.state.availableNetworks} 
                    {...this.props} />;
        }
    }
} 

const FeedDetailsWithMockLayout = withMockFeedDetails(FeedDetails);

export default FeedDetailsWithMockLayout;
