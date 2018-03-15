import React, { Component, PropTypes } from 'react'
import { DatePicker } from 'antd';
const RangePicker = DatePicker.RangePicker;
import moment from 'moment'

const format = 'YYYY-MM-DD';

class DateRangeItem extends Component{

    constructor(props){
        super(props);
    }

    handleChange(dates, dateStrings) {
        const {option,onChange} = this.props;
        onChange({
            [option.name1]:dateStrings[0],
            [option.name2]:dateStrings[1]
        });
    }

    render(){
        const {option,data} = this.props;
        let start = data[option.name1];
        start = start==null||start==''?null:moment(start, format);
        let end = data[option.name2];
        end = end==null||end==''?null:moment(end, format);
        return(
            <div className="new-search-style">
                <div className="search-title">{option.label}：</div>
                <div className="search-text">
                    <RangePicker value={[start,end]} onChange={this.handleChange.bind(this)} />
                </div>
            </div>
        )
    }
}

DateRangeItem.propTypes = {
    option: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default DateRangeItem;