'use strict';

//import "jquery";
//import "popper.js";
import "node-waves";
import "bootstrap";
import "mdbootstrap";

import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

import Header from './header';
import NavBar from './navbar';


// Home
export default class Home extends React.Component {
	constructor(props) {
		super(props);
//		console.log("App:href: ", window.location.href);
	}

	render() {
        const thinHr = {
            marginTop: "0",
            marginBottom: "0",
            clear: "both",
            border: "0",
            height: "1px",
            backgroundColor: "#bdbdbd"
        };

		return (
            <div className="container-fluid" style={{height:"100%", width:"100%"}}>
                <Header />
                <NavBar />
                <main className="mx-5">
                    <StoreListWithMockLayout />
                </main>
            </div>
		)
	}
}

// StoreList
export class StoreList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const fullWidth = {
            width: "100%"
        };

        const cardStyle = {
            width: "100%",
            height: "60px",
            //background: "#dadada"
            background: "#e3f2fd"
        };

        const thinHr = {
            marginTop: "0",
            marginBottom: "0",
            clear: "both",
            border: "0",
            height: "1px",
            backgroundColor: "#bdbdbd"
        };

        const stores = 
            this.props.stores.length === 0 ?
            <div className="">No Stores exist</div> : 
            this.props.stores.map(item => 
                <div className="d-flex m-1 p-2" style={cardStyle} key={item.id}>
                    <img className="img-fluid mr-3" src={item.img} width="50px" height="50px" alt={item.title} />
                    <div className="flex-col" style={{ width: "100%"}}>
                        <Link to={"/storedetails/" + item.id} role="" className="" >
                            <div className="" style={{ color: "black" }}>Store: <strong>{item.title}</strong></div>
                            <div className="" style={{ color: "black" }}>Description: {item.description}</div>
                        </Link>
                    </div>
                </div>
            );

        return (
            <div className="" style={fullWidth}>
                <div className="d-flex flex-row-reverse mt-2">
                    <a className="btn btn-sm btn-primary btn-mdb"><i className="fa fa-plus mr-2" />Add Store</a>
                </div>
                <div className="row mt-2">
                    {stores}
                </div>
            </div>
        );
    }
}

StoreList.propTypes = {
    stores: PropTypes.array.isRequired
}

// StoreList HOC
function withMockStoreList(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                emptyStores: [],
                stores: [
                    {
                        id: "1",
                        title: "My first test store",
                        img: "img/mstore.jpg",
                        description: `My first test store with DoubleClick LLD data.`,
                        link: "/storedetails"
                    },
                    {
                        id: "2",
                        title: "Another test store",
                        img: "img/mstore.jpg",
                        description: `For testing purposes only.`,
                        link: "/storedetails"
                    },
                ]
            }
        }

        render() {
            return <WrappedComponent stores={this.state.stores} {...this.props} />;
        }
    }
} 

const StoreListWithMockLayout = withMockStoreList(StoreList);
