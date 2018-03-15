import React, { Component, PropTypes } from 'react'

class IndexCell extends Component {

    render(){
        const {width,classes,rowIndex,start} = this.props;
        const idx = rowIndex+1+(start==null?0:(start*1));
        const idxStr = idx<10? ('0'+idx):idx;
        return (
            <td width={width} className={classes}>
                {idxStr}
            </td>
        )
    }

}

IndexCell.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    classes: PropTypes.oneOfType([PropTypes.object,PropTypes.string]),
    rowIndex: PropTypes.number,
    start: PropTypes.number
};

export default IndexCell;