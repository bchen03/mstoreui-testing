'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';

import Styles from './styles';
import Header from './header';
import NavBar from './navbar';
import SelectionList from './selectionlist';
import MdbInput from './mdbinput';
import MpfUtils from './mpfutils';

//import MockDynFeedList from './dynfeedlist';

import 'react-datepicker/dist/react-datepicker.css';

const SUBSCRIPTIONNAME = 0;
const SUBSCRIPTIONDESCRIPTION = 1;


class Subscription extends React.Component {
	constructor(props) {
		super(props);

		//console.log("Subscription:href: ", window.location.href);
        console.log("Subscription.props: ", this.props);

		this.state = {
            inputs: [],
            availableNetworks: this.props.availableNetworks,
            selectedNetworks: [],
            availableAdvertisers: this.props.availableAdvertisers,
            selectedAdvertisers: [],
            startDate: moment(),
            endDate: moment(),
            savedNetworks: "",
            savedAdvertisers: "",
            savedStartDate: "",
            savedEndDate: ""
        };

        this.initParameters();

        this.inputChanged = this.inputChanged.bind(this);
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

        console.log("Subscriptions: ", this.props.location.subscription, ", av networks: ", this.state.availableNetworks);

        if (this.props.location.subscription.name) {
            console.log("Subscription name: ", this.props.location.subscription.name);
            this.state.inputs[SUBSCRIPTIONNAME] = this.props.location.subscription.name;
        }

        if (this.props.location.subscription.description) {
            console.log("Subscription description: ", this.props.location.subscription.description);
            this.state.inputs[SUBSCRIPTIONDESCRIPTION] = this.props.location.subscription.description;
        }

        if (this.props.location.subscription.parameters.network_id) {
            const calcAvailableNetworks = this.state.availableNetworks.filter(aitem => {
                return this.props.location.subscription.parameters.network_id.split(",")
                    .findIndex(item => item === aitem.value) === -1; 
            });
    
            const calcSelectedNetworks = this.state.availableNetworks.filter(aitem => {
                return this.props.location.subscription.parameters.network_id.split(",")
                    .findIndex(item => item === aitem.value) !== -1; 
            });

            console.log("Subscription.initParameters networks: ", calcAvailableNetworks, ",", calcSelectedNetworks)

            this.state.availableNetworks = calcAvailableNetworks;
            this.state.selectedNetworks = calcSelectedNetworks;
        }

        if (this.props.location.subscription.parameters.advertiser_id) {
            const calcAvailableAdvertisers = this.state.availableAdvertisers.filter(aitem => {
                return this.props.location.subscription.parameters.advertiser_id.split(",")
                .findIndex(item => item === aitem.value) === -1; 
            });

            const calcSelectedAdvertisers = this.state.availableAdvertisers.filter(aitem => {
                return this.props.location.subscription.parameters.advertiser_id.split(",")
                .findIndex(item => item === aitem.value) !== -1; 
            });

            console.log("Subscription.initParameters advertisers: ", calcAvailableAdvertisers, ",", calcSelectedAdvertisers)

            this.state.availableAdvertisers = calcAvailableAdvertisers;
            this.state.selectedAdvertisers = calcSelectedAdvertisers;
        }

        if (this.props.location.subscription.parameters.start_date) {
            console.log("Subscription start date: ", new Date(Number(this.props.location.subscription.parameters.start_date)));
            this.state.startDate = moment(new Date(Number(this.props.location.subscription.parameters.start_date)));
        }

        if (this.props.location.subscription.parameters.end_date) {
            this.state.endDate = moment(new Date(Number(this.props.location.subscription.parameters.end_date)));
        }
    }

    inputChanged(index, e) {
        console.log("Subscription.inputChanged index:", index, ", value: ", e.target.value); 
        let newInputs = [...this.state.inputs];
        newInputs[index] = e.target.value;
        this.setState({ inputs: newInputs }); 
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
        if (!this.props.location.subscription || 
            !this.props.location.subscription.storeid) {
            console.error("Subscription.doSave error: Store id is missing");
            return;
        }

        const storeid = this.props.location.subscription.storeid;

        if (this.state.inputs.length < SUBSCRIPTIONNAME) {
            console.error("Subscription.doSave error: Subscription name is missing");
            return;
        }

        if (this.state.inputs.length < SUBSCRIPTIONDESCRIPTION) {
            console.error("Subscription.doSave error: Subscription description is missing");
            return;
        }

        let networks = this.state.selectedNetworks.reduce((acc, item) => {
            return acc + item.value + ",";
        }, "");

        if (networks.length > 0)
            networks = networks.slice(0, -1);

        if (networks.length === 0) {
            console.error("Subscription.doSave error: No networks selected");
            return;
        }

        let advertisers = this.state.selectedAdvertisers.reduce((acc, item) => {
            return acc + item.value + ",";
        }, "");

        if (advertisers.length > 0)
            advertisers = advertisers.slice(0, -1);

        if (advertisers.length === 0) {
            console.error("Subscription.doSave error: No advertisers selected");
            return;
        }

        const startTimestamp = new Date(this.state.startDate).getTime().toString();
        const endTimestamp = new Date(this.state.endDate).getTime().toString();

        console.log("start/end timestamp: ", startTimestamp, ", " + endTimestamp);

        this.setState({
            savedNetworks: networks,
            savedAdvertisers: advertisers,
            savedStartDate: this.state.startDate.toString() + " (" + startTimestamp + ")",
            savedEndDate: this.state.endDate.toString() + " (" + endTimestamp + ")"
        });

        // TODO: Only create subscriptions for now
        if (this.props.match.params.subscriptionId !== "0") {
            console.warn("==> Can only create new Doubleclick subscriptions for now!");
            return;
        }

        //const now = new Date().toString();

        let newSubscription = {
            datasourceId: 1,
            storeId: Number(storeid),
            subscriptionName: this.state.inputs[SUBSCRIPTIONNAME],
            subscriptionDescription: this.state.inputs[SUBSCRIPTIONDESCRIPTION],
            subscriptionParameters: [
                {
                    datasourceParameterId: 1,
                    subscriptionParameterValue: networks
                },
                {
                    datasourceParameterId: 2,
                    subscriptionParameterValue: advertisers
                },
                {
                    datasourceParameterId: 3,
                    subscriptionParameterValue: startTimestamp
                },
                {
                    datasourceParameterId: 4,
                    subscriptionParameterValue: endTimestamp
                }
            ]
          };

        console.log("Subscriptions.doSave newSubscription: ", newSubscription);

          axios
            .post('http://localhost:8090/v1/subscriptions', newSubscription)
            .then(response => {
                console.log("Subscriptions.doSave success:", response);
                this.props.history.push("/stores/" + storeid);
            })
            .catch(err => {
                console.log("Subscriptions.doSave error:", err);
                // TODO: Show error in view
            });
    }

	render() {
		return (
		    <div className="container-fluid">
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
                            <div className="mt-2" style={{width: "820px"}}>
                                <MdbInput 
                                    id="name" 
                                    name="Subscription Name" 
                                    value={MpfUtils.emptyIfFalsy(this.state.inputs[SUBSCRIPTIONNAME])} 
                                    inputChanged={(e) => this.inputChanged(SUBSCRIPTIONNAME, e)} />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col">
                            <div style={{width: "820px"}}>
                                <MdbInput 
                                    id="description" 
                                    name="Description" 
                                    value={MpfUtils.emptyIfFalsy(this.state.inputs[SUBSCRIPTIONDESCRIPTION])} 
                                    inputChanged={(e) => this.inputChanged(SUBSCRIPTIONDESCRIPTION, e)} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <SelectionList 
                                title="Networks" 
                                available={this.state.availableNetworks} 
                                selected={this.state.selectedNetworks} 
                                onUpdate={this.networksUpdated} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <SelectionList 
                                title="Advertisers" 
                                available={this.state.availableAdvertisers} 
                                selected={this.state.selectedAdvertisers} 
                                onUpdate={this.advertisersUpdated} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="md-form" style={{width:"40%"}}>
                                <div>Start Date</div>
                                <i className="fa fa-calendar prefix"></i>                
                                <DatePicker 
                                    className="ml-5" 
                                    selected={this.state.startDate} 
                                    onChange={this.startDateChanged} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="md-form" style={{width:"40%"}}>
                                <div>End Date</div>
                                <i className="fa fa-calendar prefix"></i>                
                                <DatePicker 
                                    className="ml-5" 
                                    selected={this.state.endDate} 
                                    onChange={this.endDateChanged} />
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

Subscription.propTypes = {
    availableNetworks: PropTypes.array.isRequired,
    availableAdvertisers: PropTypes.array.isRequired
}

export default Subscription;

