/**
 * Created by Administrator on 2017/7/5 0005.
 */
import React, { Component, PropTypes } from 'react'
import {getPathValSep} from '../../utils/data'

class DataCell extends Component {

    render(){
        const {width,classes,data,dataKey,maxLength} = this.props;
        const value = getPathValSep(data,dataKey);
        let text = '';
        let colorFont = '';
        if(maxLength!=null && text.length>maxLength){
            text = text.substring(0,maxLength)+'...';
        }
        switch(value)
        {
            case -1:
                text = '调解失败';
                colorFont = 'color-gray';
                break;
            case 0:
                text = '未完成';
                colorFont = 'color-red';
                break;
            case 1:
                text = '调解成功';
                colorFont = 'color-blue';
                break;
            case 2:
                text = '调解中止';
                colorFont = '';
                break;
            default:
                text = value;
        }
        return (
            <td width={width} className={colorFont} title={text}>
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