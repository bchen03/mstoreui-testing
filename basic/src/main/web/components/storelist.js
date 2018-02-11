'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// StoreList
class StoreList extends React.Component {
    constructor(props) {
        super(props);

        this.buildDestinationText = this.buildDestinationText.bind(this);
    }

    buildDestinationText(item) {
        let result = "";
        const destText = item.destination.parameters.map(obj => {
            result += obj["name"] + ": " + obj["value"] + ", ";
        });
        return "Type: " + item.destination.type + ", " + result.slice(0, -2);
    }

    render() {
        const cardStyle = {
            width: "100%",
            height: "80px",
            //background: "#dadada"
            background: "#e3f2fd"
        };

        const storelist = 
            this.props.stores.length === 0 ?
            <div className="">No Stores exist</div> : 
            this.props.stores.map(item => 
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
            );

        return (
            <div>
                <div className="d-flex flex-row-reverse mt-2">
                    <a className="btn btn-sm btn-primary btn-mdb">
                        <i className="fa fa-plus mr-2" />
                        Add Store
                    </a>
                </div>
                <div className="row mt-2">
                    {storelist}
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
            let data = [
                {
                    id: "1",
                    title: "My first test store",
                    img: "img/mstore.jpg",
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
                    img: "img/mstore.jpg",
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

const MockStoreList = withMockStoreList(StoreList);

export default MockStoreList;
