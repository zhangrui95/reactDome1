import React, { Component, PropTypes } from 'react'

class InputItem extends Component{

    constructor(props){
        super(props);
    }

    handleChange(e){
        const {option,onChange} = this.props;
        onChange({[option.name]:e.target.value});
    }

    render(){
        const {option,data} = this.props;
        return(
            <div className="search-content">
                <div className="new-search-style">
                    <div className="search-title search-name">{option.label}：</div>
                    <div className="search-text">
                        <input type="text" className="text-input" value={data[option.name]} onChange={this.handleChange.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }
}

InputItem.propTypes = {
    option: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default InputItem;