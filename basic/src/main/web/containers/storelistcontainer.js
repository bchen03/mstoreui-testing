'use strict';

import React from 'react';
import axios from 'axios';

import StoreList from '../components/storelist';

import {mapStoreListState} from '../selectors/storelistselector';

function withStoreList(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                stores: [],
                isLoading: false,
                error: ""
            }

            this.getData = this.getData.bind(this);
        }

        componentDidMount() {
            this.getData();
        }

        getData() {
            this.setState({
                stores: [],
                isLoading: true,
                error: ""
            });

            axios.get('http://localhost:8090/v1/stores', {
                // params: {
                //   ID: 12345
                // }
            })
            .then(response => {
                console.log("withStoreList.getData success, data: ", response.data.data);
                this.setState({
                    stores: mapStoreListState(response.data.data),
                    isLoading: false,
                    error: ""
                });
            }) 
            .catch(err => {
                console.log("withStoreList.getData failed: ", err);
                this.setState({
                    stores: [],
                    isLoading: false,
                    error: err
                });
            });
        }

        getData2() {
            let data = [
                {
                    id: "1",
                    title: "My first test store",
                    img: "img/mstore3.png",
                    description: `My first test store with DoubleClick LLD data.`,
                    destination: {
                        type: "S3",
                        parameters: [
                            { id: "1", name: "Access key", value: "I/TzedR3sdd6Vttraw"},
                            { id: "2", name: "Secret key", value: "dsgnsdngsngksngksag"},
                            { id: "3", name: "Bucket", value: "mstore/na/first-store"}
                        ]
                    }
                },
                {
                    id: "2",
                    title: "Another test store",
                    img: "img/mstore3.png",
                    description: `For testing purposes only.`,
                    destination: {
                        type: "S3",
                        parameters: [
                            { id: "1", name: "Access key", value: "I/TzedR3sdd6Vttraw"},
                            { id: "2", name: "Secret key", value: "dsgnsdngsngksngksag"},
                            { id: "3", name: "Bucket", value: "mstore/na/another-store"}
                        ]
                    }
                },
            ];

            this.setState({ 
                isLoading: true, 
                stores: [], 
                error: "" 
            });

            // Simulate calling API that returns a promise 
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("withStoreList.Promise resolved");
                    resolve(data);
                }, 100);
            })
            .then(result => {
                console.log("withStoreList.Promise.then resolved: ", result);
                this.setState({
                    stores: result,
                    isLoading: false,
                    error: ""
                });
            })
            .catch(err => {
                console.log("withStoreList.Promise.then rejected: ", err);
                this.setState({
                    stores: [],
                    isLoading: false,
                    error: err
                });
            });
        }

        render() {
            return this.state.isLoading ? <div>Loading data, please wait...</div> :
                this.state.error !== "" ? <div>Error: {this.state.error}</div> : 
                <WrappedComponent stores={this.state.stores} {...this.props} />;
        }
    }
} 

const StoreListContainer = withStoreList(StoreList);

export default StoreListContainer;
