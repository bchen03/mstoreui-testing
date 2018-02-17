'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Styles from './styles';

// StoreList
class StoreList extends React.Component {
    constructor(props) {
        super(props);

        this.buildDestinationText = this.buildDestinationText.bind(this);
//        this.buildStoreList = this.buildStoreList.bind(this);
    }

    buildDestinationText(item) {
        let result = "";
        const destText = item.destination.parameters.map(obj => {
            result += obj["name"] + ": " + obj["value"] + ", ";
        });
        return "Type: " + item.destination.type + ", " + result.slice(0, -2);
    }

    // buildStoreList() {
    //     if (this.props.stores.length === 0) {
    //         return <div className="">No Stores exist</div>;
    //     }
    //     else {
    //         const storeList = 
    //             this.props.stores.map(item => 
    //                 <div className="blue lighten-5" key={item.id}>
    //                     <Link to={"/stores/" + item.id} role="" className="d-flex list-group-item list-group-item-action mb-2 z-depth-1" >
    //                         <img className="img-fluid mr-3" src={item.img} style={{width: "70px", height: "70px"}} alt={item.title} />
    //                         <div className="flex-column">
    //                             <div style={{ color: "black" }}><strong>Store: {item.title}</strong></div>
    //                             <div style={{ color: "black" }}><strong>Description:</strong> {item.description}</div>
    //                             <div style={{ color: "black" }}><strong>Destination:</strong> {this.buildDestinationText(item)}</div>
    //                         </div>
    //                     </Link>
    //                 </div>
    //             );

    //         return (
    //             <div className="list-group d-flex" style={{width:"100%"}}>
    //                 {storeList}
    //             </div>
    //         );
    //     }
    // }

    render() {
        {/*
            <div>
                <div className="d-flex mt-2">
                    <div className="mt-3"><strong>My Stores:</strong></div>
                    <Link to={"/addstore"} role="" className="ml-auto btn btn-sm btn-primary btn-mdb">
                        <i className="fa fa-plus mr-2" />
                        Add Store
                    </Link>
                </div>
                <div className="row mt-2">
                    {this.buildStoreList()}
                </div>
            </div>
        */}     

        let storeList = 
            this.props.stores.map(item => 
                <tr key={item.id}>
                    <td><Link to={"/stores/" + item.id}>{item.title}</Link></td>
                    <td><Link to={"/stores/" + item.id}>{item.description}</Link></td>
                    <td><Link to={"/stores/" + item.id}>{this.buildDestinationText(item)}</Link></td>
                    <td style={{textAlign: "center", verticalAlign: "middle"}}><Link to={"/stores/" + item.id}><i className="fa fa-gear"/></Link></td>
                </tr>
        );

        if (storeList.length === 0) {
            storeList = <tr><td>No stores found</td><td></td><td></td><td></td></tr>;
        }

        return (
            <div className="my-3">
                <div className="d-flex my-3">
                    <div className="mt-3"><strong>My Stores:</strong></div>
                    <Link to={"/addstore"} role="" className="ml-auto btn btn-sm btn-primary btn-mdb">
                        <i className="fa fa-plus mr-2" />
                        Add Store
                    </Link>
                </div>

                <hr style={Styles.thinHr} />

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th style={{width: "50%"}}>Destination</th>
                        <th style={{width: "60px"}}></th>
                    </tr>
                    </thead>
                    <tbody>
                        {storeList}
                    </tbody>
                </table>
            </div>
      
        );
    }
}

StoreList.propTypes = {
    stores: PropTypes.array.isRequired
}

export default StoreList;
