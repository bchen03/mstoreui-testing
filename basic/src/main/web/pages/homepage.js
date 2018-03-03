'use strict';

import React from 'react';

import Header from '../components/header';
import NavBar from '../components/navbar';
import StoreListContainer from '../containers/storelistcontainer';

const HomePage = (props) => (
    <div className="container-fluid">
        <Header />
        <NavBar /> 
        <main className="mx-5">
            <StoreListContainer />
        </main>
    </div>
);

export default HomePage;