import React, {Component, PropTypes} from "react";
import {getPathVal} from "../../utils/data";
import {getDateTime} from "../../utils/date";

class DateCell extends Component {

    render(){
        const {width,classes,data,dataKey,type} = this.props;
        const value = getPathVal(data,dataKey);
        const text = getDateTime(value,type);
        return (
            <td width={width} className={classes} title={text}>
                {text}
            </td>
        )
    }
}

DateCell.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    classes: PropTypes.oneOfType([PropTypes.object,PropTypes.string]),
    data: PropTypes.object,
    type: PropTypes.string,
    dataKey: PropTypes.string
};

export default DateCell;