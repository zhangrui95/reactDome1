import React, { Component, PropTypes } from 'react'

class Cell extends Component {

    render(){
        const {width,label,classes} = this.props;
        return (
            <td width={width} className={classes}>
                {label}
            </td>
        )
    }

}

Cell.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    label: PropTypes.string,
    classes: PropTypes.oneOfType([PropTypes.object,PropTypes.string])
};

export default Cell;