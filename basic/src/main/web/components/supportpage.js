'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import Header from './header';
import NavBar from './navbar';


const SupportPage = () => (
    <div className="container-fluid">
        <Header />
        <NavBar /> 
        <main className="">
            <div className="d-flex flex-column align-items-center mt-3">
                <div>For support please contact:</div>
                <div>Phuongnam Tran</div>
                <div>Singapore</div>
                <div>0-999-123-4567</div>
            </div>
        </main>
    </div>
);

export default SupportPage;