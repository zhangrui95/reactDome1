import React, { Component, PropTypes } from 'react'
import { DatePicker } from 'antd';
import moment from 'moment'

const format = 'YYYY-MM-DD';

class DateItem extends Component{

    constructor(props){
        super(props);
    }

    handleChange(date, dateString) {
        const {option,onChange} = this.props;
        onChange({[option.name]:dateString});
    }

    render(){
        const {option,data} = this.props;
        let date = data[option.name];
        date = date==null||date==''?null:moment(date, format);
        return(
            <div className="search-content">
                    <div className="search-title">{option.label}：</div>
                    <div className="search-text">
                        <DatePicker value={date} onChange={this.handleChange.bind(this)} />
                    </div>
            </div>
        )
    }
}

DateItem.propTypes = {
    option: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default DateItem;