import React, { Component, PropTypes } from 'react'
import { Checkbox } from 'antd'

class SingleCheckBoxItem extends Component{

    constructor(props){
        super(props);
    }

    handleChange(e){
        const {option,onChange} = this.props;
        onChange({[option.name]:e.target.checked?option.value:''});
    }

    render(){
        const {option,data} = this.props;
        let checked = option.checked;
        const value = data[option.name];
        if(value!=null){
            checked = option.value == value;
        }
        return(
            <div className="new-search-style  search-checkbox">
                <div className="search-title">{option.label}：</div>
                <div className="search-text">
                    <Checkbox checked={checked} onChange={this.handleChange.bind(this)}/>
                </div>
            </div>
        )
    }
}

SingleCheckBoxItem.propTypes = {
    option: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SingleCheckBoxItem;