'use strict';

import React from 'react';
import { Link } from 'react-router-dom';


const HOME_ACTIVE_NAVITEM = 0;
const ACCESS_ACTIVE_NAVITEM = 1;
const SUPPORT_ACTIVE_NAVITEM = 2;

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // Use sessionStorage to hold current active navbar item
            activeNavItem: this.initActiveNavItem()
        };

        this.initActiveNavItem = this.initActiveNavItem.bind(this);
        this.updateActiveNavItem = this.updateActiveNavItem.bind(this);
    }

    initActiveNavItem() {
        const activeNavItem = sessionStorage.getItem("activeNavItem");
        return !activeNavItem || Number(activeNavItem) === HOME_ACTIVE_NAVITEM ? 
                ["active", "", ""] :  Number(activeNavItem) === ACCESS_ACTIVE_NAVITEM ?
                ["", "active", ""] : ["", "", "active"];
    }

    updateActiveNavItem(activeIndex) {
        sessionStorage.setItem("activeNavItem", activeIndex.toString());
        this.setState({
            activeNavItem: 
                (Number(activeIndex) === HOME_ACTIVE_NAVITEM) ? 
                ["active", "", ""] : (Number(activeIndex) === ACCESS_ACTIVE_NAVITEM) ? 
                ["", "active", ""] : ["", "",  "active"]
        });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark indigo">
                {/*<a className="navbar-brand" href="#">mPlatform</a>*/}
                <button className="navbar-toggler" type="button" data-toggle="collapse" 
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={"nav-item " + this.state.activeNavItem[HOME_ACTIVE_NAVITEM]}>
                            <Link 
                                to="/home" 
                                role="button" 
                                className="nav-link"
                                onClick={() => this.updateActiveNavItem(HOME_ACTIVE_NAVITEM)}>
                                Home
                            </Link>
                        </li>
                        <li className={"nav-item " + this.state.activeNavItem[ACCESS_ACTIVE_NAVITEM]}>
                            <Link 
                                to="/access" 
                                role="button" 
                                className="nav-link"
                                onClick={() => this.updateActiveNavItem(ACCESS_ACTIVE_NAVITEM)}>
                                Access
                            </Link>
                        </li>
                        <li className={"nav-item " + this.state.activeNavItem[SUPPORT_ACTIVE_NAVITEM]}>
                            <Link 
                                to="/support" 
                                role="button" 
                                className="nav-link"
                                onClick={() => this.updateActiveNavItem(SUPPORT_ACTIVE_NAVITEM)}>
                                Support
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav> 
        );
    }
}

export default NavBar;