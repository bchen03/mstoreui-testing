'use strict';

import React from 'react';
import axios from 'axios';

import StoreList from '../components/storelist';

function withMockStoreList(WrappedComponent) {
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
                console.log("withMockStoreList.getData success, data: ", response.data.data);

                const storeResults = response.data.data.map(item => {
                    const destinationParameterResults = 
                        item.destinationParameters.map(item => {
                            return { 
                                id: item.destinationParameterId, 
                                name: item.destinationTypeParameterName, 
                                value: item.destinationParameterValue
                            }
                        });

                    console.log("withMockStoreList.getData destinationParameters: ", destinationParameterResults);

                    return {
                        id: item.storeId,
                        title: item.storeName,
                        img: "img/mstore3.png",
                        description: item.storeDescription,
                        owner: item.owner,
                        destination: {
                            type: item.destinationTypeName,
                            parameters: destinationParameterResults
                        }
                    }
                });

                console.log("withMockStoreList.getData storeResults: ", storeResults);

                this.setState({
                    stores: storeResults,
                    isLoading: false,
                    error: ""
                });
            }) 
            .catch(err => {
                console.log("withMockStoreList.getData failed: ", err);
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
                    console.log("withMockStoreList.Promise resolved");
                    resolve(data);
                }, 100);
            })
            .then(result => {
                console.log("withMockStoreList.Promise.then resolved: ", result);
                this.setState({
                    stores: result,
                    isLoading: false,
                    error: ""
                });
            })
            .catch(err => {
                console.log("withMockStoreList.Promise.then rejected: ", err);
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

const StoreListContainer = withMockStoreList(StoreList);

export default StoreListContainer;
