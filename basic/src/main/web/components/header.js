'use strict';

import React from 'react';

import "jquery";
import "popper.js";
import "node-waves";
import "bootstrap";
import "mdbootstrap";

import Styles from './styles';

const Header = (props) => {

    return (
        <div>
            <header className="mx-3">
                <img src="../img/mplatform2.jpg" height="90px" width="90px" alt="mPlatform" />
                <span className="float-right" style={{height: "90px" }}>
                    {/*<span className="ml-5">Welcome, {sessionStorage.getItem('email') ? sessionStorage.getItem('email') : 'who ever you are'}!</span>*/}
                    <span className="align-middle" style={{ lineHeight:"90px"}}>
                        <span className="badge badge-pill green" data-toggle="modal" data-target="#userModal">
                            <i className="fa fa-user fa-2x" aria-hidden="true"></i>
                        </span>
                    </span>
                </span>
            </header>

            <div className="modal fade" id="userModal" tabIndex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-sm modal-side modal-top-right" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="userModalLabel">User Information</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="">Signed in as</div>
                            <div className=""><strong>{sessionStorage.getItem('email') ? sessionStorage.getItem('email') : ""}</strong></div>
                            <hr className="my-3" style={Styles.thinHr} />
                            <div className="">Sign Out</div>
                        </div>
                        {/*<div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>*/}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Header;

