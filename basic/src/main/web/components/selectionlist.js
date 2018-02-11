'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export default class SelectionList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            pageSize: 5,
            noOfSelectRows: 5
        }

        this.addToSelected = this.addToSelected.bind(this);
        this.removeFromSelected = this.removeFromSelected.bind(this);
        this.first = this.first.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.last = this.last.bind(this);
    }

    addToSelected() {
        let selectedValues = 
            Array
            .apply(null, this.availableRef.options)
            .filter(option => option.selected)
            .map(option =>  option.value);

        let availableItems = 
            this.props.available
            .filter(item => selectedValues.indexOf(item.value) === -1)
            .sort((a, b) => Number(a.value) < Number(b.value) ? -1 : Number(a.value) > Number(b.value) ? 1 : 0);

        let selectedItems = [
            ...this.props.selected,
            ...this.props.available.filter(item => selectedValues.indexOf(item.value) !== -1)
        ];

        console.log("add => availableItems:", availableItems, ", selectedItems:", selectedItems);

        if (this.props.onUpdate) {
            this.props.onUpdate(availableItems, selectedItems);
        }
    }

    removeFromSelected() {
        let selectedValues = 
            Array
            .apply(null, this.selectedRef.options)
            .filter(option => option.selected)
            .map(option => option.value);

        let availableItems = [
            ...this.props.available,
            ...this.props.selected.filter(item => selectedValues.indexOf(item.value) !== -1)
        ].sort((a, b) => Number(a.value) < Number(b.value) ? -1 : Number(a.value) > Number(b.value) ? 1 : 0);
        
        let selectedItems = this.props.selected.filter(item => selectedValues.indexOf(item.value) === -1);

        console.log("remove => availableItems:", availableItems, ", selectedItems:", selectedItems);
        
        if (this.props.onUpdate) {
            this.props.onUpdate(availableItems, selectedItems);
        }
    }

    get canFirstOrPrev() { 
        return this.state.currentPage > 1; 
    }

    get canLastOrNext() { 
        return this.state.currentPage < Math.ceil(this.props.available.length / this.state.pageSize); 
    }

    first() {
        if (this.canFirstOrPrev) {
            this.setState({ currentPage: 1 });
        }
    }

    prev() {
        if (this.canFirstOrPrev) {
            this.setState({ currentPage: this.state.currentPage - 1 });
        }
    }

    next() {
        if (this.canLastOrNext) {
            this.setState({ currentPage: this.state.currentPage + 1 });
        }
    }

    last() {
        if (this.canLastOrNext) {
            this.setState({ currentPage: Math.ceil(this.props.available.length / this.state.pageSize) });
        }
    }

    render() {
        const available = 
            this.props.available
                .slice((this.state.currentPage - 1) * this.state.pageSize, (this.state.currentPage - 1) * this.state.pageSize + this.state.pageSize)
                .map((item, index) => <option key={item.value} value={item.value}>{item.name}</option>);

        const selected = this.props.selected.map((item, index) => 
            <option key={item.value} value={item.value}>{item.name}</option>            
        );

        const fullSize = {
            width: "100%", 
            height: "100%",
            //background: "yellow"
        };

        const selectStyle = {
            // width: "40%", 
            width: "360px", 
            height: "100%", 
            float: "left", 
            overflowY: "auto",
            //background: "cyan"
        };

        return (
            <div className="container-fluid mb-1" style={fullSize}>
                {/*Header/Items count*/}
                <div className="row">
                    <div style={selectStyle}>
                        <div style={{float: "left"}} className="">{this.props.title}</div>
                        <div style={{float: "right"}}>Items: <strong>{available.length}</strong></div>
                    </div>
                    <div style={{width:"100px", background: ""}}></div>
                    <div style={selectStyle}>
                        <div style={{float: "right"}}>Items: <strong>{selected.length}</strong></div>
                    </div>
                </div>
                
                {/*Selects*/}
                <div className="row">
                    <select ref={item => this.availableRef = item} multiple="multiple" size={this.state.noOfSelectRows} style={selectStyle} className="">
                        {available}
                    </select>

                    <div className="mt-2" style={{width:"100px", background: ""}}>
                        <div>
                            <button className="btn btn-sm primary-color waves-effect" style={{marginLeft: "20px"}} 
                                onClick={this.addToSelected}><i className="fa fa-angle-right"></i></button>
                        </div>
                        <div>
                            <button className="btn btn-sm primary-color waves-effect" style={{marginLeft: "20px"}} 
                                onClick={this.removeFromSelected}><i className="fa fa-angle-left"></i></button>
                        </div>
                    </div>

                    <select ref={item => this.selectedRef = item} multiple="multiple" size={this.state.noOfSelectRows} style={selectStyle} className="">
                        {selected}
                    </select>
                </div>

                {/*Pagination*/}
                <div className="row">
                    <div style={{width: "200px", float: "left"}}>
                        <nav className="mb-1">
                            <ul className="pagination pagination-circle" style={{marginLeft: "-10px"}}>
                                {/*First*/}
                                <li className={this.canFirstOrPrev ? "page-item" : "page-item disabled"}>
                                    <a className="page-link" onClick={this.first}>First</a>
                                </li>
                                {/*Arrow left*/}
                                <li className={this.canFirstOrPrev ? "page-item" : "page-item disabled"}>
                                    <a className="page-link" aria-label="Previous" onClick={this.prev}>
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                                {/*Arrow right*/}
                                <li className={this.canLastOrNext ? "page-item" : "page-item disabled"}>
                                    <a className="page-link" aria-label="Next"  onClick={this.next}>
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                                {/*Last*/}
                                <li className={this.canLastOrNext ? "page-item" : "page-item disabled"}>
                                    <a className="page-link" onClick={this.last} style={{}}>
                                        Last
                                    </a>
                                </li>                            
                            </ul>
                        </nav>
                    </div>
                    <div style={{width: "160px", height: "31px", lineHeight: "31px"}}>
                        <div style={{float: "right"}}>Page: {this.state.currentPage}</div>
                    </div>
                    <div style={{width:"100px"}}></div>
                    <div style={selectStyle}>
                    </div>
                </div>
            </div>
        );
    }

    // ES6 examples
    // Method
    // sayHelloMethod() {
    //     console.log("Hello Method!");
    // }

    // Getter
    // get sayHelloGetter() {
    //     console.log("Hello Getter!");
    // }

    // Static
    // static sayHelloStatic() {
    //     console.log("Hello Static!");
    // }

}

// ES6 examples
// var s = new SelectionList();
// s.sayHelloMethod();
// s.sayHelloGetter;
// SelectionList.sayHelloStatic();

FileList.propTypes = {
    title: PropTypes.string,
    available: PropTypes.array,
    selected: PropTypes.array,
    onUpdate: PropTypes.func
}

