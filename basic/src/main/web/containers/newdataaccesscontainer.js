'use strict';

import React from 'react';

import Header from '../components/header';
import NavBar from '../components/navbar';
import NewDataAccessPage from '../pages/newdataaccesspage';


function withNewDataAccess(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                networks: [],
                isLoading: false,
                error: ""
            }

            this.getData = this.getData.bind(this);
        }

        componentDidMount() {
            console.log("withNewDataAccess.componentDidMount()");
            this.getData();
        }

        componentWillUnmount() {
            console.log("withNewDataAccess.componentWillUnmount()");
        }

        getData() {
            console.log("withNewDataAccess.getData() called");

            const availableNetworks = [
                { name: "Hertz (111)", value: "111"},
                { name: "Beyond Interactive (339)", value: "339"},
                { name: "Digital Edge - Full Serve (869)", value: "869"},
                { name: "Friendly (1234)", value: "1234"},
                { name: "WhatsApp (2222)", value: "2222"},
                { name: "Marriott (4406)", value: "4406"},
                { name: "DayGlo (5333)", value: "5333"},
                { name: "MEC Global (6923)", value: "6923"},
                { name: "United Airlines (7286)", value: "7286"},
                { name: "Amgen (7788)", value: "7788"},
                { name: "MEC NA Invisalign (7866)", value: "7866"},
                { name: "Farmers Insurance (7890)", value: "7890"},
                { name: "RiteAid (8567)", value: "8567"},
                { name: "Costco (9234)", value: "9234"},
                { name: "Honda (9567)", value: "9567"},
            ];

            this.setState({ 
                isLoading: true, 
                networks: [],
                error: "" 
            });

            // Simulate calling API that returns a promise 
            new Promise((resolve, reject) => {
                setTimeout(() => {
                     console.log("withNewDataAccess.Promise processing networks...");
                    resolve(availableNetworks);
                    //reject("==> networks rejected");
                }, 100);
            })
            .then(
                result => {
                    console.log("withNewDataAccess.Promise.then resolved networks: ", result);
                    this.setState({
                        isLoading: false,
                        networks: result
                    });
                }, err => {
                    console.log("withNewDataAccess.Promise.then rejected networks: ", err);
                    this.setState({
                        isLoading: false,
                        error: err
                    });
                }
            );
        }

        render() {
            return this.state.isLoading ?
                <div className="container-fluid" style={{height:"100%", width:"100%"}}>
                    <Header />
                    <NavBar />
                    <div className="mx-5">
                        <div>Loading data, please wait...</div>
                        </div>
                </div> :
                this.state.error !== "" ? 
                <div className="container-fluid" style={{height:"100%", width:"100%"}}>
                    <Header />
                    <NavBar />
                    <div className="mx-5">
                        <div>Error: {this.state.error.toString()}</div>
                    </div>
                </div> :
                <WrappedComponent 
                    availableNetworks={this.state.networks}
                    {...this.props} />;
        }
    }
}

const NewDataAccessContainer = withNewDataAccess(NewDataAccessPage);

export default NewDataAccessContainer;
