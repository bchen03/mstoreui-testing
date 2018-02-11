'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// StoreList
class StoreList extends React.Component {
    constructor(props) {
        super(props);

        this.buildDestinationText = this.buildDestinationText.bind(this);
        this.buildStoreList = this.buildStoreList.bind(this);
    }

    buildDestinationText(item) {
        let result = "";
        const destText = item.destination.parameters.map(obj => {
            result += obj["name"] + ": " + obj["value"] + ", ";
        });
        return "Type: " + item.destination.type + ", " + result.slice(0, -2);
    }

    buildStoreList() {
        if (this.props.stores.length === 0) {
            return <div className="">No Stores exist</div>;
        }
        else {
            const storeList = 
                this.props.stores.map(item => 
                    <div className="" key={item.id}>
                        <Link to={"/stores/" + item.id} role="" className="d-flex list-group-item list-group-item-action mb-2 z-depth-1" >
                            <img className="img-fluid mr-3" src={item.img} style={{width: "70px", height: "70px"}} alt={item.title} />
                            <div className="flex-column">
                                <div style={{ color: "black" }}><strong>Store: {item.title}</strong></div>
                                <div style={{ color: "black" }}><strong>Description:</strong> {item.description}</div>
                                <div style={{ color: "black" }}><strong>Destination:</strong> {this.buildDestinationText(item)}</div>
                            </div>
                        </Link>
                    </div>
                );

            return (
                <div className="list-group d-flex" style={{width:"100%"}}>
                    {storeList}
                </div>
            );
        }
    }

    render() {
        {/*
        const cardStyle = {
            width: "100%",
            height: "80px",
            //background: "#dadada"
            background: "#e3f2fd"
        };

        <div className="d-flex m-1 p-2" style={cardStyle} key={item.id}>
            <img className="img-fluid mr-3" src={item.img} width="70px" height="70px" alt={item.title} />
            <div className="flex-col" style={{ width: "100%"}}>
                <Link to={"/stores/" + item.id} role="" className="" >
                    <div style={{ color: "black" }}><strong>Store: {item.title}</strong></div>
                    <div style={{ color: "black" }}><strong>Description:</strong> {item.description}</div>
                    <div style={{ color: "black" }}><strong>Destination:</strong> {this.buildDestinationText(item)}</div>
                </Link>
            </div>
        </div>

        <a className="btn btn-sm btn-primary btn-mdb" onClick={this.addStoreClicked}>
            <i className="fa fa-plus mr-2" />
            Add Store
        </a>
        
        */}

        return (
            <div>
                <div className="d-flex flex-row-reverse mt-2">
                    <Link to={"/addstore"} role="" className="btn btn-sm btn-primary btn-mdb">
                        <i className="fa fa-plus mr-2" />
                        Add Store
                    </Link>
                </div>
                <div className="row mt-2">
                    {this.buildStoreList()}
                </div>
            </div>
        );
    }
}

StoreList.propTypes = {
    stores: PropTypes.array.isRequired
}

export default StoreList;
