'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Header from './header';
import NavBar from './navbar';

import 'react-tabs/style/react-tabs.css';


class AddStore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabIndex: 0,
            inputs: []
        };

        this.inputChanged = this.inputChanged.bind(this);
        this.createClicked = this.createClicked.bind(this);
    }

    inputChanged(index, e) {
        console.log("AddStore.inputChanged index:", index, ", value: ", e.target.value); 
        let newInputs = [...this.state.inputs];
        newInputs[index] = e.target.value;
        this.setState({ inputs: newInputs }); 
    }

    createClicked(e) {
        e.preventDefault();
        console.log("AddStore.createClicked tabIndex: ", this.state.tabIndex,  "inputs: ", this.state.inputs);
    }

    mapValue(value) {
        return value ? value : "";
    }

    render() {
        return (
            <div className="container-fluid">
                <Header />
                <NavBar />
                <main className="container my-4">
                    <form>
                        <p className="h5 text-center mb-4">Create a New Store</p>

                        <MdbInput id="name" name="Store Name" value={this.mapValue(this.state.inputs[0])} inputChanged={(e) => this.inputChanged(0, e)} />
                        <MdbInput id="description" name="Description" value={this.mapValue(this.state.inputs[1])} inputChanged={(e) => this.inputChanged(1, e)} />

                        <div className="md-form form-sm mt-5 ml-5">
                            <div className="mb-3">Destinations:</div>
                            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                                <TabList>
                                    <Tab>S3</Tab>
                                    <Tab>Redshift</Tab>
                                </TabList>
                
                                <TabPanel className="mt-4">
                                    <MdbInput id="accesskey" name="Access Key" value={this.mapValue(this.state.inputs[2])} inputChanged={(e) => this.inputChanged(2, e)} />
                                    <MdbInput id="secretkey" name="Secret Key" value={this.mapValue(this.state.inputs[3])} inputChanged={(e) => this.inputChanged(3, e)} />
                                    <MdbInput id="bucket" name="Bucket Name" value={this.mapValue(this.state.inputs[4])} inputChanged={(e) => this.inputChanged(4, e)} />
                                </TabPanel>
                                <TabPanel className="mt-4">
                                    <MdbInput id="connectionstring" name="Connection String" value={this.mapValue(this.state.inputs[5])} inputChanged={(e) => this.inputChanged(5,e)} />
                                    <MdbInput id="datasource" name="Data Source" value={this.mapValue(this.state.inputs[6])} inputChanged={(e) => this.inputChanged(6, e)} />
                                    <MdbInput id="username" name="User Name" value={this.mapValue(this.state.inputs[7])} inputChanged={(e) => this.inputChanged(7, e)} />
                                    <MdbInput id="password" name="Password" value={this.mapValue(this.state.inputs[8])} inputChanged={(e) => this.inputChanged(8, e)} />
                                </TabPanel>
                            </Tabs>                        
                        </div>

                        <div className="text-center">
                            <button className="btn btn-primary" onClick={this.createClicked}>Create</button>
                            <Link to="/" role="button" className="btn btn-primary">Cancel</Link>
                        </div>
                    </form>

                </main>
            </div>
        );
    }
}

// Component work-around for a bug in MDB inputs where 
// label doesn't move up when input gets focus or stay
// up when there's a value in the input field 
class MdbInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            className: ""
        }

        this.init = this.init.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
        this.activeFocus = this.activeFocus.bind(this);
        this.blurFocus = this.blurFocus.bind(this);
    }

    componentDidMount() {
        this.init();
    }

    init() {
        if (this.state.value) {
            this.activeFocus();
        }
    }

    inputChanged(e) {
        console.log("MdbInput.inputChanged:", e.target.value);
        this.setState({value: e.target.value});     // Needed to set proper label position 
        this.props.inputChanged(e);                 // Set input value in parent
    }

    activeFocus() {
        this.setState({className: "active"});
    }

    blurFocus() {
        this.setState({className: this.state.value ? "active" : ""});
    }

    render() {
        return (
            <div className="md-form form-sm">
                <i className="prefix grey-text"></i>
                <input type="text" id={this.props.id} value={this.props.value} onFocus={this.activeFocus} onBlur={this.blurFocus} onChange={this.inputChanged} className="form-control" />
                <label htmlFor={this.props.id} className={this.state.className}>{this.props.name}</label>
            </div>
        );
    }
}

MdbInput.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    inputChanged: PropTypes.func.isRequired
}

export default AddStore;


