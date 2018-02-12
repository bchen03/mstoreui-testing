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
            tabIndex: 1
        };
    }

    render() {
        return (
            <div className="container-fluid">
                <Header />
                <NavBar />
                <main className="container my-4">
                    <form>
                        <p className="h5 text-center mb-4">Create a New Store</p>

                        <MdbInput id="name" name="Store Name" />
                        <MdbInput id="description" name="Description" />

                        <div className="md-form form-sm mt-5 ml-5">
                            <div className="mb-3">Destinations:</div>
                            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                                <TabList>
                                    <Tab>S3</Tab>
                                    <Tab>Redshift</Tab>
                                </TabList>
                
                                <TabPanel className="mt-4">
                                    <MdbInput id="accesskey" name="Access Key" />
                                    <MdbInput id="secretkey" name="Secret Key" />
                                    <MdbInput id="bucket" name="Bucket Name" />
                                </TabPanel>
                                <TabPanel className="mt-4">
                                    <MdbInput id="connectionstring" name="Connection String" />
                                    <MdbInput id="datasource" name="Data Source" />
                                    <MdbInput id="username" name="User Name" />
                                    <MdbInput id="password" name="Password" />
                                </TabPanel>
                            </Tabs>                        
                        </div>

                        <div className="text-center">
                            <button className="btn btn-primary">Create</button>
                            <Link to="/" role="button" className="btn btn-primary">Cancel</Link>
                        </div>
                    </form>

                </main>
            </div>
        );
    }
}

AddStore.propTypes = {
}

// Component work-around for a bug in MDB inputs where 
// label doesn't move up when input gets focus
class MdbInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            className: ""
        }

        this.inputChanged = this.inputChanged.bind(this);
        this.activeFocus = this.activeFocus.bind(this);
        this.blurFocus = this.blurFocus.bind(this);
    }

    inputChanged(e) {
        this.setState({value: e.target.value});
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
                <input type="text" id={this.props.id} onFocus={this.activeFocus} onBlur={this.blurFocus} onChange={this.inputChanged} className="form-control" />
                <label htmlFor={this.props.id} className={this.state.className}>{this.props.name}</label>
            </div>
        );
    }
}

MdbInput.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default AddStore;


