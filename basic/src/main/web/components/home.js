'use strict';

import React from 'react';

import Header from './header';
import NavBar from './navbar';
import MockStoreList from './storelist';

const Home = (props) => (
    <div className="container-fluid">
        <Header />
        <NavBar />
        <main className="mx-5">
            <MockStoreList />
        </main>
    </div>
);

export default Home;