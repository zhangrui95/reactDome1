import React, { Component, PropTypes } from 'react'
import {getPathVal} from '../../utils/data'

class ViewEntCell extends Component {

    clickHandler(){
        const {url,data,idKey} = this.props;
        window.open(url+getPathVal(data,idKey),'detail')
    }

    render(){
        const {width,classes,data,dataKey,maxLength} = this.props;
        const value = getPathVal(data,dataKey);
        let text = value;
        if(maxLength!=null && text.length>maxLength){
            text = text.substring(0,maxLength)+'...';
        }
        return (
            <td width={width} className={classes}>
                <a className="view-cell" href='javascript:;' onClick={this.clickHandler.bind(this)} title={value}>{text}</a>
            </td>
        )
    }
}

ViewEntCell.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    classes: PropTypes.oneOfType([PropTypes.object,PropTypes.string]),
    data: PropTypes.object,
    url: PropTypes.string,
    dataKey: PropTypes.string,
    idKey: PropTypes.string,
    maxLength: PropTypes.number
};

export default ViewEntCell;