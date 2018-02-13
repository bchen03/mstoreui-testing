'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => (
    <nav className="navbar navbar-expand-lg navbar-dark indigo">
        <a className="navbar-brand" href="#">mPlatform</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" 
            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link to="/home" role="button" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Support</a>
                </li>
            </ul>
        </div>
    </nav> 
);

export default NavBar;