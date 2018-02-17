'use strict';

import React from 'react';

import Header from './header';
import NavBar from './navbar';
import StoreListContainer from '../containers/storelistcontainer';

const Home = (props) => (
    <div className="container-fluid">
        <Header />
        <NavBar /> 
        <main className="mx-5">
            <StoreListContainer />
        </main>
    </div>
);

export default Home;