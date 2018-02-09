'use strict';

import "jquery";
import "popper.js";
import "node-waves";
import "bootstrap";
import "mdbootstrap";

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Header = (props) => {
    return (
        <header className="mx-3">
        <img src="../img/mplatform2.jpg" height="90px" width="90px" alt="mPlatform" />
        </header>
    );
}

export default Header;
