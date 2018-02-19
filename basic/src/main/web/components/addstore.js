'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

import Header from './header';
import NavBar from './navbar';
import MdbInput from './mdbinput';
import MpfUtils from './mpfutils';

import 'react-tabs/style/react-tabs.css';

const STORENAME = 0;
const STOREDESCRIPTION = 1;
const S3ACCESSKEY = 2;
const S3SECRETKEY = 3;
const S3BUCKET = 4;
const S3PREFIX = 5;
const S3REGION = 6; 

class AddStore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabIndexDestination: 0,
            tabIndexProvider: 0,
            inputs: []
        };

        this.inputChanged = this.inputChanged.bind(this);
        this.createClicked = this.createClicked.bind(this);
        this.createStore = this.createStore.bind(this);
    }

    inputChanged(index, e) {
        console.log("AddStore.inputChanged index:", index, ", value: ", e.target.value); 
        let newInputs = [...this.state.inputs];
        newInputs[index] = e.target.value;
        this.setState({ inputs: newInputs }); 
    }

    createClicked(e) {
        e.preventDefault();
        console.log("AddStore.createClicked tabIndexDestination: ", this.state.tabIndexDestination,  "inputs: ", this.state.inputs);
        this.createStore();
    }

    createStore() {
        if (this.state.tabIndexDestination !== 0) {
            console.error("AddStore.createStore: Only S3 is supported at the moment...");
            return;
        }

        let newStore = {
            storeName: this.state.inputs[STORENAME],
            storeDescription: this.state.inputs[STOREDESCRIPTION],
            owner: "10986",
            destinationTypeId: 1,
            destinationParameters: [
                {   
                    destinationTypeParameterId: 1,
//                    destinationTypeParameterName: "awsAccessKey",
                    destinationParameterValue: this.state.inputs[S3ACCESSKEY]
                },
                {
                    destinationTypeParameterId: 2,
//                    destinationTypeParameterName: "awsSecretAccessKey",
                    destinationParameterValue: this.state.inputs[S3SECRETKEY]
                },
                {
                    destinationTypeParameterId: 3,
//                    destinationTypeParameterName: "s3Bucket",
                    destinationParameterValue: this.state.inputs[S3BUCKET]
                },
                {
                    destinationTypeParameterId: 4,
//                    destinationTypeParameterName: "s3Prefix",
                    destinationParameterValue: this.state.inputs[S3PREFIX]
                },
                {
                    destinationTypeParameterId: 8,
//                    destinationTypeParameterName: "s3Region",
                    destinationParameterValue: this.state.inputs[S3REGION]
                }  
            ]
        };

        console.log("AddStore newStore:", newStore);

        axios
            .post('http://localhost:8090/v1/stores', newStore)
            .then(response => {
                console.log("AddStore.postStore success:", response);
                this.props.history.push("/home");
            })
            .catch(err => {
                console.log("AddStore.postStore error:", err);
                // TODO: Show error in view
            });
    }


    render() {
        return (
            <div className="container-fluid">
                <Header />
                <NavBar /> 
                <main className="container my-4 px-5">
                    <form>
                        <div className="text-center">
                            <span className="h5 ml-3">Create a New Store</span>
                        </div>

                        <MdbInput id="name" name="Store Name" value={MpfUtils.emptyIfFalsy(this.state.inputs[STORENAME])} inputChanged={(e) => this.inputChanged(STORENAME, e)} />
                        <MdbInput id="description" name="Description" value={MpfUtils.emptyIfFalsy(this.state.inputs[STOREDESCRIPTION])} inputChanged={(e) => this.inputChanged(STOREDESCRIPTION, e)} />

                        <div className="md-form form-sm mt-5">
                            <div className="mb-3">Provider:</div>
                            <Tabs selectedIndex={this.state.tabIndexProvider} onSelect={tabIndexProvider => this.setState({ tabIndexProvider })}>
                                <TabList>
                                    <Tab>Amazon Web Services</Tab>
                                    <Tab>Google Cloud</Tab>
                                    <Tab>Microsoft Azure</Tab>
                                </TabList>
                
                                <TabPanel className="mt-4 ml-4">
                                    <div className="mb-3">Region:</div>
                                    <RadioGroup value="us-east-1" horizontal>
                                        <RadioButton value="us-east-1" rootColor="grey" iconSize={20}>US East (N. Virginia)</RadioButton>
                                        <RadioButton value="us-west-1" rootColor="grey" iconSize={20}>US West (N. California)</RadioButton>
                                        <RadioButton value="eu-west-2" rootColor="grey" iconSize={20}>EU (London)</RadioButton>
                                        <RadioButton value="eu-cental-1" rootColor="grey" iconSize={20}>EU (Frankfurt)</RadioButton>
                                        <RadioButton value="ap-southeast-1" rootColor="grey" iconSize={20}>Asia Pacific (Singapore)</RadioButton>
                                        <RadioButton value="ap-southeast-2" rootColor="grey" iconSize={20}>Asia Pacific (Sydney)</RadioButton>
                                    </RadioGroup>
                                    
                                    <div className="md-form form-sm mt-4">
                                        <div className="mb-3">Destination:</div>
                                        <Tabs selectedIndex={this.state.tabIndexDestination} onSelect={tabIndexDestination => this.setState({ tabIndexDestination })}>
                                            <TabList>
                                                <Tab>S3</Tab>
                                                <Tab>Redshift</Tab>
                                            </TabList>
                            
                                            <TabPanel className="mt-4">
                                                <MdbInput id="accesskey" name="Access Key" value={MpfUtils.emptyIfFalsy(this.state.inputs[S3ACCESSKEY])} inputChanged={(e) => this.inputChanged(S3ACCESSKEY, e)} />
                                                <MdbInput id="secretkey" name="Secret Key" value={MpfUtils.emptyIfFalsy(this.state.inputs[S3SECRETKEY])} inputChanged={(e) => this.inputChanged(S3SECRETKEY, e)} />
                                                <MdbInput id="bucket" name="Bucket Name" value={MpfUtils.emptyIfFalsy(this.state.inputs[S3BUCKET])} inputChanged={(e) => this.inputChanged(S3BUCKET, e)} />
                                                <MdbInput id="prefix" name="Prefix" value={MpfUtils.emptyIfFalsy(this.state.inputs[S3PREFIX])} inputChanged={(e) => this.inputChanged(S3PREFIX, e)} />
                                                <MdbInput id="region" name="Region" value={MpfUtils.emptyIfFalsy(this.state.inputs[S3REGION])} inputChanged={(e) => this.inputChanged(S3REGION, e)} />
                                            </TabPanel>
                                            <TabPanel className="mt-4">
                                                <MdbInput id="connectionstring" name="Connection String" value={MpfUtils.emptyIfFalsy(this.state.inputs[7])} inputChanged={(e) => this.inputChanged(7,e)} />
                                                <MdbInput id="datasource" name="Data Source" value={MpfUtils.emptyIfFalsy(this.state.inputs[8])} inputChanged={(e) => this.inputChanged(8, e)} />
                                                <MdbInput id="username" name="User Name" value={MpfUtils.emptyIfFalsy(this.state.inputs[9])} inputChanged={(e) => this.inputChanged(9, e)} />
                                                <MdbInput id="password" name="Password" value={MpfUtils.emptyIfFalsy(this.state.inputs[10])} inputChanged={(e) => this.inputChanged(10, e)} />
                                            </TabPanel>
                                        </Tabs>                        
                                    </div>



                                </TabPanel>
                                <TabPanel className="mt-4">
                                </TabPanel>
                                <TabPanel className="mt-4">
                                </TabPanel>
                            </Tabs>
                        </div>

{/*
                        <div className="md-form form-sm mt-5">
                            <div className="mb-3">Provider:</div>
                            <RadioGroup value="aws" horizontal>
                                <RadioButton value="aws" rootColor="grey" iconSize={20}>Amazon Web Services</RadioButton>
                                <RadioButton value="gcloud" rootColor="grey" iconSize={20}>Google Cloud</RadioButton>
                                <RadioButton value="azure" rootColor="grey" iconSize={20}>Microsoft Azure</RadioButton>
                            </RadioGroup>
                        </div>

                        <div className="md-form form-sm mt-5">
                            <RadioGroup value="us-east-1" horizontal>
                                <RadioButton value="us-east-1" rootColor="grey" iconSize={20}>US East (N. Virginia)</RadioButton>
                                <RadioButton value="us-west-1" rootColor="grey" iconSize={20}>US West (N. California)</RadioButton>
                                <RadioButton value="eu-west-2" rootColor="grey" iconSize={20}>EU (London)</RadioButton>
                                <RadioButton value="eu-cental-1" rootColor="grey" iconSize={20}>EU (Frankfurt)</RadioButton>
                                <RadioButton value="ap-southeast-1" rootColor="grey" iconSize={20}>Asia Pacific (Singapore)</RadioButton>
                                <RadioButton value="ap-southeast-2" rootColor="grey" iconSize={20}>Asia Pacific (Sydney)</RadioButton>
                            </RadioGroup>
                        </div>
                        
                        <div className="md-form form-sm mt-5">
                            <RadioGroup  horizontal>
                                <RadioButton value="us-east-2" rootColor="grey" iconSize={20}>US East (Ohio)</RadioButton>
                                <RadioButton value="ca-central-1" rootColor="grey" iconSize={20}>Canada (Central)</RadioButton>
                                <RadioButton value="eu-west-1" rootColor="grey" iconSize={20}>EU (Ireland)</RadioButton>
                                <RadioButton value="eu-west-3" rootColor="grey" iconSize={20}>EU (Paris)</RadioButton>
                                <RadioButton value="ap-northeast-1" rootColor="grey" iconSize={20}>Asia Pacific (Tokyo)</RadioButton>
                                <RadioButton value="ap-northeast-2" rootColor="grey" iconSize={20}>Asia Pacific (Seoul)</RadioButton>
                                <RadioButton value="ap-northeast-3" rootColor="grey" iconSize={20}>Asia Pacific (Osaka-Local)</RadioButton>
                                <RadioButton value="ap-south-1" rootColor="grey" iconSize={20}>Asia Pacific (Mumbai)</RadioButton>
                                <RadioButton value="sa-east-1" rootColor="grey" iconSize={20}>South America (São Paulo)</RadioButton>
                            </RadioGroup>
                        </div>

                        <div className="md-form form-sm mt-5">
                            <div className="mb-3">Destinations:</div>
                            <Tabs selectedIndex={this.state.tabIndexDestination} onSelect={tabIndexDestination => this.setState({ tabIndexDestination })}>
                                <TabList>
                                    <Tab>S3</Tab>
                                    <Tab>Redshift</Tab>
                                </TabList>
                
                                <TabPanel className="mt-4">
                                    <MdbInput id="accesskey" name="Access Key" value={MpfUtils.emptyIfFalsy(this.state.inputs[S3ACCESSKEY])} inputChanged={(e) => this.inputChanged(S3ACCESSKEY, e)} />
                                    <MdbInput id="secretkey" name="Secret Key" value={MpfUtils.emptyIfFalsy(this.state.inputs[S3SECRETKEY])} inputChanged={(e) => this.inputChanged(S3SECRETKEY, e)} />
                                    <MdbInput id="bucket" name="Bucket Name" value={MpfUtils.emptyIfFalsy(this.state.inputs[S3BUCKET])} inputChanged={(e) => this.inputChanged(S3BUCKET, e)} />
                                    <MdbInput id="prefix" name="Prefix" value={MpfUtils.emptyIfFalsy(this.state.inputs[S3PREFIX])} inputChanged={(e) => this.inputChanged(S3PREFIX, e)} />
                                    <MdbInput id="region" name="Region" value={MpfUtils.emptyIfFalsy(this.state.inputs[S3REGION])} inputChanged={(e) => this.inputChanged(S3REGION, e)} />
                                </TabPanel>
                                <TabPanel className="mt-4">
                                    <MdbInput id="connectionstring" name="Connection String" value={MpfUtils.emptyIfFalsy(this.state.inputs[7])} inputChanged={(e) => this.inputChanged(7,e)} />
                                    <MdbInput id="datasource" name="Data Source" value={MpfUtils.emptyIfFalsy(this.state.inputs[8])} inputChanged={(e) => this.inputChanged(8, e)} />
                                    <MdbInput id="username" name="User Name" value={MpfUtils.emptyIfFalsy(this.state.inputs[9])} inputChanged={(e) => this.inputChanged(9, e)} />
                                    <MdbInput id="password" name="Password" value={MpfUtils.emptyIfFalsy(this.state.inputs[10])} inputChanged={(e) => this.inputChanged(10, e)} />
                                </TabPanel>
                            </Tabs>                        
                        </div>
*/}
                        <div className="text-center">
                            <button className="btn btn-primary" onClick={this.createClicked}>Create</button>
                            <Link to="/home" role="button" className="btn btn-primary">Cancel</Link>
                        </div>
                    </form>

                </main>
            </div>
        );
    }
}

export default AddStore;


