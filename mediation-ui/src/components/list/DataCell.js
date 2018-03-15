import React, { Component, PropTypes } from 'react'
import {getPathValSep} from '../../utils/data'

class DataCell extends Component {

    render(){
        const {width,classes,data,dataKey,maxLength} = this.props;
        const value = getPathValSep(data,dataKey);
        let text = value;
        if(maxLength!=null && text.length>maxLength){
            text = text.substring(0,maxLength)+'...';
        }
        return (
            <td width={width} className={classes} title={value}>
                {text}
            </td>
        )
    }
}

DataCell.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    classes: PropTypes.oneOfType([PropTypes.object,PropTypes.string]),
    data: PropTypes.object,
    maxLength: PropTypes.number,
    dataKey: PropTypes.string
};

export default DataCell;