'use strict';

import "jquery";
import "popper.js";
import "node-waves";
import "bootstrap";
import "mdbootstrap";

import React from 'react';
import PropTypes from 'prop-types';

import SelectionList from './selectionlist';

import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import '../main.css';


export default class App extends React.Component {
	constructor(props) {
		super(props);

		console.log("App:href: ", window.location.href);

		this.state = {
            availableNetworks: [
                { name: "Item 1", value: "1"},
                { name: "Item 2", value: "2"},
                { name: "Item 3", value: "3"},
                { name: "Item 4", value: "4"},
                { name: "Item 5", value: "5"},
                { name: "Item 6", value: "6"},
                { name: "Item 7", value: "7"},
                { name: "Item 8", value: "8"},
                { name: "Item 9", value: "9"},
                { name: "Item 10", value: "10"}
            ],
            selectedNetworks: [
            ],
            availableAdvertisers: [
                { name: "Item 1", value: "1"},
                { name: "Item 2", value: "2"},
                { name: "Item 3", value: "3"},
                { name: "Item 4", value: "4"},
                { name: "Item 5", value: "5"},
                { name: "Item 6", value: "6"},
                { name: "Item 7", value: "7"},
                { name: "Item 8", value: "8"},
                { name: "Item 9", value: "9"},
                { name: "Item 10", value: "10"}
            ],
            selectedAdvertisers: [
            ]
        };

        this.networksUpdated = this.networksUpdated.bind(this);
        this.advertisersUpdated = this.advertisersUpdated.bind(this);

	}

	componentDidMount() {
	}

    networksUpdated(available, selected) {
        console.log("networksUpdated: ", available, ",", selected);

        this.setState({
            availableNetworks: available,
            selectedNetworks: selected
        });
    }

    advertisersUpdated(available, selected) {
        console.log("advertisersUpdated: ", available, ",", selected);

        this.setState({
            availableAdvertisers: available,
            selectedAdvertisers: selected
        });

    }

	render() {
		return (
		    <div style={{height:"100%"}}>
                <SelectionList title="Networks" available={this.state.availableNetworks} selected={this.state.selectedNetworks} onUpdate={this.networksUpdated} />
                <SelectionList title="Advertisers" available={this.state.availableAdvertisers} selected={this.state.selectedAdvertisers} onUpdate={this.advertisersUpdated} />
            </div>
		)
	}
}

