'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export default class Destinations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDestination: "S3"
        }

        this.destinationClicked = this.destinationClicked.bind(this);
        this.renderedDestination = this.renderedDestination.bind(this);
    }

    destinationClicked(event) {
        console.log("event.value: ", event.target.dataset.value);
        this.setState({
            currentDestination: event.target.dataset.value
        });
    }

    renderedDestination() {
        if (this.state.currentDestination === "S3") {
            return (
                <div>S3</div>       
            );
        }
        else if (this.state.currentDestination === "Redshift") {
            return (
                <div>Redshift</div>       
            );
        }
    }

    render() {

        let destinationResult = this.renderedDestination();

        return (
            <div className="container">
                <div className="row">
                    <div className="btn-group">
                        <button className="btn primary-color dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.currentDestination}
                        </button>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#" data-value="S3" onClick={this.destinationClicked}>S3</a>
                            <a className="dropdown-item" href="#" data-value="Redshift" onClick={this.destinationClicked}>Redshift</a>
                        </div>
                    </div>
                </div>
                <div className="row my-3">
                    {destinationResult}
                </div>
            </div>
        );
    }
}

Destinations.propTypes = {

}