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

                        <div className="md-form form-sm">
                            <input type="text" id="name" className="form-control" />
                            <label htmlFor="name">Store Name</label>
                        </div>
                        <div className="md-form form-sm">
                            <input type="text" id="description" className="form-control" />
                            <label htmlFor="description">Description</label>
                        </div>

                        <div className="md-form form-sm mt-5 ml-5">
                            <div className="mb-3">Destinations:</div>
                            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                                <TabList>
                                    <Tab>S3</Tab>
                                    <Tab>Redshift</Tab>
                                </TabList>
                
                                <TabPanel className="mt-4">
                                    <div className="md-form form-sm">
                                        <i className="prefix grey-text"></i>
                                        <input type="text" id="accesskey" className="form-control" />
                                        <label htmlFor="accesskey">Access Key</label>
                                    </div>
                                    <div className="md-form form-sm">
                                        <i className="prefix grey-text"></i>
                                        <input type="text" id="secretkey" className="form-control" />
                                        <label htmlFor="secretkey">Secret Key</label>
                                    </div>
                                    <div className="md-form form-sm">
                                        <i className="prefix grey-text"></i>
                                        <input type="text" id="bucket" className="form-control" />
                                        <label htmlFor="bucket">Bucket Name</label>
                                    </div>
                                </TabPanel>
                                <TabPanel className="mt-4">
                                    <div className="md-form form-sm">
                                        <i className="prefix grey-text"></i>
                                        <input type="text" id="connectionstring" className="form-control" />
                                        <label htmlFor="connectionstring">Connection String</label>
                                    </div>
                                    <div className="md-form form-sm">
                                        <i className="prefix grey-text"></i>
                                        <input type="text" id="datasource" className="form-control" />
                                        <label htmlFor="datasource">Data Source</label>
                                    </div>
                                    <div className="md-form form-sm">
                                        <i className="prefix grey-text"></i>
                                        <input type="text" id="username" className="form-control" />
                                        <label htmlFor="username">User Name</label>
                                    </div>
                                    <div className="md-form form-sm">
                                        <i className="prefix grey-text"></i>
                                        <input type="password" id="password" className="form-control" />
                                        <label htmlFor="password">Password</label>
                                    </div>
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


export default AddStore;
