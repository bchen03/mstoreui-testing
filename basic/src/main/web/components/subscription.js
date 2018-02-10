'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import Styles from './styles';
import Header from './header';
import NavBar from './navbar';
import SelectionList from './selectionlist';

//import MockDynFeedList from './dynfeedlist';

import 'react-datepicker/dist/react-datepicker.css';

class Subscription extends React.Component {
	constructor(props) {
		super(props);

		//console.log("Subscription:href: ", window.location.href);
        console.log("Subscription.props: ", this.props);

		this.state = {
            availableNetworks: [
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
                
            ],
            selectedNetworks: [
            ],
            availableAdvertisers: [
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
            ],
            selectedAdvertisers: [
            ],
            startDate: moment(),
            endDate: moment(),
            savedNetworks: "",
            savedAdvertisers: "",
            savedStartDate: "",
            savedEndDate: ""
        };

        this.initParameters();

        this.initParameters = this.initParameters.bind(this);
        this.networksUpdated = this.networksUpdated.bind(this);
        this.advertisersUpdated = this.advertisersUpdated.bind(this);
        this.startDateChanged = this.startDateChanged.bind(this);
        this.endDateChanged = this.endDateChanged.bind(this);
        this.doSave = this.doSave.bind(this);
	}

    initParameters() {
        if (!this.props.location.subscription ||
            !this.props.location.subscription.parameters)
            return;

        if (this.props.location.subscription.parameters.networks) {
            const calcAvailableNetworks = this.state.availableNetworks.filter(aitem => {
                return this.props.location.subscription.parameters.networks
                    .findIndex(item => item === aitem.value) === -1; 
            });
    
            const calcSelectedNetworks = this.state.availableNetworks.filter(aitem => {
                return this.props.location.subscription.parameters.networks
                    .findIndex(item => item === aitem.value) !== -1; 
            });

            console.log("Subscription.initParameters networks: ", calcAvailableNetworks, ",", calcSelectedNetworks)

            this.state.availableNetworks = calcAvailableNetworks;
            this.state.selectedNetworks = calcSelectedNetworks;
        }

        if (this.props.location.subscription.parameters.advertisers) {
            const calcAvailableAdvertisers = this.state.availableAdvertisers.filter(aitem => {
                return this.props.location.subscription.parameters.advertisers
                .findIndex(item => item === aitem.value) === -1; 
            });

            const calcSelectedAdvertisers = this.state.availableAdvertisers.filter(aitem => {
                return this.props.location.subscription.parameters.advertisers
                .findIndex(item => item === aitem.value) !== -1; 
            });

            console.log("Subscription.initParameters advertisers: ", calcAvailableAdvertisers, ",", calcSelectedAdvertisers)

            this.state.availableAdvertisers = calcAvailableAdvertisers;
            this.state.selectedAdvertisers = calcSelectedAdvertisers;
        }

        if (this.props.location.subscription.parameters.startdate) {
            this.state.startDate = moment(this.props.location.subscription.parameters.startdate);
        }

        if (this.props.location.subscription.parameters.enddate) {
            this.state.endDate = moment(this.props.location.subscription.parameters.enddate);
        }
    }

    networksUpdated(available, selected) {
        console.log("Subscription.networksUpdated: ", available, ",", selected);

        this.setState({
            availableNetworks: available,
            selectedNetworks: selected
        });
    }

    advertisersUpdated(available, selected) {
        console.log("Subscription.advertisersUpdated: ", available, ",", selected);

        this.setState({
            availableAdvertisers: available,
            selectedAdvertisers: selected
        });

    }

    startDateChanged(date) {
        this.setState({
            startDate: date
        });
    }

    endDateChanged(date) {
        this.setState({
            endDate: date
        });
    }

    get wasSaved() {
        return this.state.savedAdvertisers || 
                this.state.savedNetworks || 
                this.state.savedStartDate || 
                this.state.savedEndDate; 
    }

    doSave() {
        let networks = this.state.selectedNetworks.reduce((acc, item) => {
            return acc + item.value + ",";
        }, "");

        let advertisers = this.state.selectedAdvertisers.reduce((acc, item) => {
            return acc + item.value + ",";
        }, "");

        this.setState({
            savedNetworks: networks,
            savedAdvertisers: advertisers,
            savedStartDate: this.state.startDate,
            savedEndDate: this.state.endDate
        });
    }

	render() {
		return (
		    <div className="container-fluid" style={{height:"100%", width:"100%"}}>
                <Header />
                <NavBar />

                <div className="mx-5">

                    <div className="row">
                        <div className="col mt-3 mb-1">
                            <h3>
                                <img src="/img/doubleclick.png" width="50px" height="50px" />
                                <span className="ml-2" style={{verticalAlign:"middle"}}>DoubleClick LLD</span>
                            </h3>
                            <small>
                                DoubleClick LLD provides raw data that can deliver analytics beyond standard DoubleClick data. 
                                To take full advantage, your organization will need to: extract, transform, and load large files.
                            </small>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-4">
                            <hr style={Styles.thinHr}></hr>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <SelectionList title="Networks" available={this.state.availableNetworks} selected={this.state.selectedNetworks} onUpdate={this.networksUpdated} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <SelectionList title="Advertisers" available={this.state.availableAdvertisers} selected={this.state.selectedAdvertisers} onUpdate={this.advertisersUpdated} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="md-form" style={{width:"40%"}}>
                                <div>Start Date</div>
                                <i className="fa fa-calendar prefix"></i>                
                                {/*<input ref={input => this.startDate = input} type="text" placeholder="mm/dd/yyyy" id="start-date" className="form-control" defaultValue="1/1/2018" />
                                <label htmlFor="start-date" className="">Start Date</label>*/}
                                <DatePicker className="ml-5" selected={this.state.startDate} onChange={this.startDateChanged} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="md-form" style={{width:"40%"}}>
                                <div>End Date</div>
                                <i className="fa fa-calendar prefix"></i>                
                                {/*<input ref={input => this.endDate = input} type="text" placeholder="mm/dd/yyyy" id="end-date" className="form-control" defaultValue="1/1/2018" />
                                <label htmlFor="end-date" className="">End Date</label>*/}
                                <DatePicker className="ml-5" selected={this.state.endDate} onChange={this.endDateChanged} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col my-3">
                            <button type="button" className="btn btn-primary" onClick={this.doSave}>Save</button>
                            <Link to={
                                "/stores/" + 
                                (this.props.location &&
                                this.props.location.subscription && 
                                this.props.location.subscription.storeid ? 
                                this.props.location.subscription.storeid :
                                "0")
                            } role="button" className="btn btn-primary">Back</Link>
                        </div>
                    </div>

                    <div className="card card-body my-3" style={{ display: this.wasSaved ? "block" : "none", width: "84%"}}>
                        <div className="card-text">
                            <div><strong>Saved Items =></strong></div>
                            <div>{this.state.savedNetworks ? "Networks: " + this.state.savedNetworks : null }</div>
                            <div>{this.state.savedAdvertisers ? "Advertisers: " + this.state.savedAdvertisers : null }</div>
                            <div>{this.state.savedStartDate ? "Start Date: " + this.state.savedStartDate : null }</div>
                            <div>{this.state.savedEndDate ? "End Date: " + this.state.savedEndDate : null }</div>
                        </div>
                    </div>

                    {/*
                    <div className="row">
                        <div className="col mb-4">
                            <hr style={Styles.thinHr}></hr>
                        </div>
                    </div>

                    <MockDynFeedList />
                    */}

                </div>
            </div>
		)
	}
}

export default Subscription;
