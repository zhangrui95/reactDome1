import React, { Component, PropTypes } from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';

class TimeChoice extends Component{
    onChange(date, dateString){
        this.handleChange('startValue', date, dateString);
    }
    handleChange(field, value, dateString) {
        const {name,onChange} = this.props;
        onChange({[name]:dateString});
    }

    disabledDate(current) {
        return current && current.valueOf() > Date.now();
    }
    render() {
        const { value, defaultValue,hide,dis} = this.props;
        let time = value;
        let html;
        if(time === ''){
            time =  defaultValue;
        }
        if(dis === 0){
            html = <div>
                <div className="margin-form">
                    <DatePicker showTime={true} disabledDate={this.disabledDate} onChange={this.onChange.bind(this)} defaultValue={moment(time,'YYYY-MM-DD HH:mm:ss')} format="YYYY-MM-DD HH:mm:ss" allowClear="false" disabled/>
                </div>
            </div>
        }else{
            if(hide === 0){
                html = <div><div className="margin-form"><DatePicker disabledDate={this.disabledDate} showTime={true} onChange={this.onChange.bind(this)} defaultValue={moment(time,'YYYY-MM-DD')} format="YYYY-MM-DD" allowClear="false"/></div></div>;
            }else{
                html = <div>
                    <div className="margin-form">
                        <DatePicker showTime={true} disabledDate={this.disabledDate} onChange={this.onChange.bind(this)} defaultValue={moment(time,'YYYY-MM-DD HH:mm:ss')} format="YYYY-MM-DD HH:mm:ss" allowClear="false"/>
                    </div>
                </div>;
            }
        }

        return (
            <div>{html}</div>
        );
    }
}
// if(value === ''){
//     html = <div><div className="margin-form"><DatePicker showTime={true} onChange={this.onChange.bind(this)} defaultValue={moment(time,'YYYY-MM-DD HH:mm:ss')} format="YYYY-MM-DD HH:mm:ss"/></div></div>;
// }else{
//     html = <div><div className="apply-name">申请人签字：</div><div className="time-right">
//         <DatePicker showTime={true} onChange={this.onChange.bind(this)} defaultValue={moment(time,'YYYY-MM-DD HH:mm:ss')} format="YYYY-MM-DD HH:mm:ss"/>
//     </div></div>;
// }
export  default TimeChoice;