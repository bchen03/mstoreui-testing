'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';

import Styles from '../components/styles';
import Header from '../components/header';
import NavBar from '../components/navbar';
import SelectionList from '../components/selectionlist';
import MdbInput from '../components/mdbinput';
import MpfUtils from '../components/mpfutils';

//import MockDynFeedList from '../components/dynfeedlist';

import 'react-datepicker/dist/react-datepicker.css';

const NEWDATAACCESSNAME = 0;
const NEWDATAACCESSDESCRIPTION = 1;


class NewDataAccessPage extends React.Component {
	constructor(props) {
		super(props);

		//console.log("NewDataAccess:href: ", window.location.href);
        console.log("NewDataAccessPage.props: ", this.props);

		this.state = {
            inputs: [],
            availableNetworks: this.props.availableNetworks,
            selectedNetworks: [],
            savedNetworks: ""
        };

        this.inputChanged = this.inputChanged.bind(this);
        this.networksUpdated = this.networksUpdated.bind(this);
        this.doSave = this.doSave.bind(this);
        this.goBack = this.goBack.bind(this);
	}

    inputChanged(index, e) {
        console.log("NewDataAccessPage.inputChanged index:", index, ", value: ", e.target.value); 
        let newInputs = [...this.state.inputs];
        newInputs[index] = e.target.value;
        this.setState({ inputs: newInputs }); 
    }

    networksUpdated(available, selected) {
        console.log("NewDataAccessPage.networksUpdated: ", available, ",", selected);

        this.setState({
            availableNetworks: available,
            selectedNetworks: selected
        });
    }

    get wasSaved() {
        return this.state.savedNetworks;
    }

    doSave() {
        if (this.state.inputs.length <= NEWDATAACCESSNAME) {
            console.error("NewDataAccessPage.doSave error: Data Access name is missing");
            return;
        }

        if (this.state.inputs.length <= NEWDATAACCESSDESCRIPTION) {
            console.error("NewDataAccessPage.doSave error: Data Access description is missing");
            return;
        }

        let networks = this.state.selectedNetworks.reduce((acc, item) => {
            return acc + item.value + ",";
        }, "");

        if (networks.length > 0)
            networks = networks.slice(0, -1);

        if (networks.length === 0) {
            console.error("NewDataAccessPage.doSave error: No networks selected");
            return;
        }

        this.setState({
            savedNetworks: networks
        });

        const newDataAccess = {};
        console.log("NewDataAccessPage.doSave newDataAccess: ", newDataAccess);

        //   axios
        //     .post('http://localhost:8090/v1/newdataaccess', newDataAccess)
        //     .then(response => {
        //         console.log("NewDataAccessPage.doSave success:", response);
        //         this.goBack();
        //     })
        //     .catch(err => {
        //         console.log("NewDataAccessPage.doSave error:", err);
        //         // TODO: Show error in view
        //     });
    }

    goBack() {
        this.props.history.goBack();
    }


	render() {
		return (
		    <div className="container-fluid">
                <Header />
                <NavBar /> 
                <div className="container my-4 px-5">   {/*mx-5*/}

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
                        <div className="col mb-2">
                            <hr style={Styles.thinHr}></hr>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mt-3 mb-3">
                            <div className="text-center">
                                <span className="h5 ml-3">New Data Access Request</span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-4">
                            <small>
                                Complete this form then click on submit to request a new data access. 
                                Your request will be routed to the relevant approver and you will be notified by email with the decision.        
                                <br />Please enter the details of the data access you are requesting:                        
                            </small>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="mt-2" style={{width: "820px"}}>
                                <MdbInput 
                                    id="name" 
                                    name="Data Access Name" 
                                    value={MpfUtils.emptyIfFalsy(this.state.inputs[NEWDATAACCESSNAME])} 
                                    inputChanged={(e) => this.inputChanged(NEWDATAACCESSNAME, e)} />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col">
                            <div style={{width: "820px"}}>
                                <MdbInput 
                                    id="description" 
                                    name="Description" 
                                    value={MpfUtils.emptyIfFalsy(this.state.inputs[NEWDATAACCESSDESCRIPTION])} 
                                    inputChanged={(e) => this.inputChanged(NEWDATAACCESSDESCRIPTION, e)} />
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
                        <div className="col my-3">
                            <button type="button" className="btn btn-primary" onClick={this.doSave}>Submit</button>
                            <a onClick={this.goBack} className="btn btn-primary">Back</a>
                        </div>
                    </div>

                    <div className="card card-body my-3" style={{ display: this.wasSaved ? "block" : "none", width: "84%"}}>
                        <div className="card-text">
                            <div><strong>Saved Items =></strong></div>
                            <div>{this.state.inputs[0] ? "Name: " + this.state.inputs[0] : null }</div>
                            <div>{this.state.inputs[1] ? "Description: " + this.state.inputs[1] : null }</div>
                            <div>{this.state.savedNetworks ? "Networks: " + this.state.savedNetworks : null }</div>
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

NewDataAccessPage.propTypes = {
    availableNetworks: PropTypes.array.isRequired
}

export default NewDataAccessPage;

