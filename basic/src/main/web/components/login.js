'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MpfUtils from './mpfutils';

import MdbInput from './mdbinput';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputs: []
        }

        this.inputChanged = this.inputChanged.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    inputChanged(index, e) {
        console.log("Login.inputChanged index:", index, ", value: ", e.target.value); 
        let newInputs = [...this.state.inputs];
        newInputs[index] = e.target.value;
        this.setState({ inputs: newInputs }); 
    }

    loginClicked(e) {
        e.preventDefault();
        console.log("Login.loginClicked...");
        this.props.history.push("/home");
    }

    render() {
        return (
            <div className="container-fluid">

                <div className="container my-4">

                    <form>
                        <p className="h5 text-center mb-4">Sign in</p>

                        <MdbInput id="email" name="Your Email" value={MpfUtils.emptyIfFalsy(this.state.inputs[0])} inputChanged={(e) => this.inputChanged(0, e)} />
                        <MdbInput id="password" name="Your Password" value={MpfUtils.emptyIfFalsy(this.state.inputs[1])} inputChanged={(e) => this.inputChanged(1, e)} />

                        <div className="text-center">                        
                            <a className="btn btn-default btn-sm" onClick={this.loginClicked}>Login</a>
                        </div>
                    </form>

                </div>

            </div>
        );
    }
}

export default Login;