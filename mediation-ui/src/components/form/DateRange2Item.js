import React, { Component, PropTypes } from 'react'
import { DatePicker } from 'antd';
import moment from 'moment'

const format = 'YYYY-MM-DD';

class DateRange2Item extends Component{

    constructor(props){
        super(props);
        this.state = {
            startValue: null,
            endValue: null,
            endOpen: false
        };
    }

    disabledStartDate(startValue) {
        if (!startValue || !this.state.endValue) {
            return false;
        }
        return startValue.valueOf() > this.state.endValue.valueOf();
    }

    disabledEndDate(endValue) {
        if (!endValue || !this.state.startValue) {
            return false;
        }
        return endValue.valueOf() <= this.state.startValue.valueOf();
    }

    onStartChange(date, dateString) {
        this.handleChange('startValue', date, dateString);
    }

    onEndChange(date, dateString) {
        this.handleChange('endValue', date, dateString);
    }

    handleStartOpenChange(open) {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange(open) {
        this.setState({ endOpen: open });
    }

    handleChange(field, value, dateString) {
        const {option,onChange} = this.props;
        onChange({[field=='startValue'?option.name1:option.name2]:dateString});
        this.setState({[field]: value});
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
                <div className="search-text new-search-data">
                    <DatePicker
                        disabledDate={this.disabledStartDate.bind(this)}
                        value={start}
                        placeholder="开始日期"
                        onChange={this.onStartChange.bind(this)}
                        onOpenChange={this.handleStartOpenChange.bind(this)}
                    />
                </div>
                <div className="new-search-text">-</div>
                <div className="search-text new-search-data">
                    <DatePicker
                        disabledDate={this.disabledEndDate.bind(this)}
                        value={end}
                        placeholder="结束日期"
                        onChange={this.onEndChange.bind(this)}
                        open={this.state.endOpen}
                        onOpenChange={this.handleEndOpenChange.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

DateRange2Item.propTypes = {
    option: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default DateRange2Item;