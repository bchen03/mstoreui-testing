import React from 'react';
import PropTypes from 'prop-types';

export default class SelectionList extends React.Component {
    constructor(props) {
        super(props);

        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
    }

    add() {
        let availableItems = 
            Array
            .apply(null, this.availableRef.options)
            .filter(option => !option.selected)
            .map(option => { return { name: option.innerText, value: option.value } });
        
        let oldSelectedItems = 
            Array
            .apply(null, this.selectedRef.options)
            .map(option => { return { name: option.innerText, value: option.value } });

        let addedItems = 
            Array
            .apply(null, this.availableRef.options)
            .filter(option => option.selected)
            .map(option => { return { name: option.innerText, value: option.value } });

        let selectedItems = [...oldSelectedItems, ...addedItems];

        console.log("add results: ", availableItems, ", ", selectedItems);

        if (this.props.onUpdate) {
            this.props.onUpdate(availableItems, selectedItems);
        }

    }

    remove() {
        let selectedItems = 
            Array
            .apply(null, this.selectedRef.options)
            .filter(option => !option.selected)
            .map(option => { return { name: option.innerText, value: option.value } });
        
        let oldAvailableItems = 
            Array.apply(null, this.availableRef.options)
            .map(option => { return { name: option.innerText, value: option.value } });

        let addedItems = 
            Array.apply(null, this.selectedRef.options)
            .filter(option => option.selected)
            .map(option => { return { name: option.innerText, value: option.value } });

        let availableItems = [...oldAvailableItems, ...addedItems];

        console.log("remove results: ", availableItems, ", ", selectedItems);

        if (this.props.onUpdate) {
            this.props.onUpdate(availableItems, selectedItems);
        }
    }

    render() {
        const available = this.props.available.map((item, index) => 
            <option key={index} value={item.value}>{item.name}</option>            
        );

        const selected = this.props.selected.map((item, index) => 
            <option key={index} value={item.value}>{item.name}</option>            
        );

        const fullSize = {
            width: "100%", 
            height: "100%"
        };

        const selectStyle = {
            width: "40%", 
            height: "100%", 
            float: "left", 
            overflowY: "auto",
            //background: "cyan"
        };

        return (
            <div className="container mb-4" style={fullSize}>
                <div className="row">
                    <div style={selectStyle}>
                        <div style={{float: "left"}}><strong>{this.props.title}</strong></div>
                        <div style={{float: "right"}}>Items: <strong>{available.length}</strong></div>
                    </div>
                    <div style={{width:"100px", background: ""}}></div>
                    <div style={selectStyle}>
                        <div style={{float: "right"}}>Items: <strong>{selected.length}</strong></div>
                    </div>
                </div>
                
                <div className="row">
                    <select ref={item => this.availableRef = item} multiple="multiple" size="5" style={selectStyle} className="">
                        {available}
                    </select>

                    <div className="mt-2" style={{width:"100px", background: ""}}>
                        <div>
                            <button className="btn btn-sm btn-primary waves-effect" style={{marginLeft: "20px"}} onClick={this.add}><i className="fa fa-angle-double-right"></i></button>
                        </div>
                        <div>
                            <button className="btn btn-sm btn-primary waves-effect" style={{marginLeft: "20px"}} onClick={this.remove}><i className="fa fa-angle-double-left"></i></button>
                        </div>
                    </div>

                    <select ref={item => this.selectedRef = item} multiple="multiple" size="5" style={selectStyle} className="">
                        {selected}
                    </select>
                </div>
            </div>
        );
    }
}

FileList.propTypes = {
    title: PropTypes.string,
    available: PropTypes.array,
    selected: PropTypes.array,
    onUpdate: PropTypes.func
}

