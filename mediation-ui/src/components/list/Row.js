import React, { Component, PropTypes } from 'react'
class Row extends Component {
    upPassWordClick(){
        this.refs.pop.pop();
    }
    render(){
        const {children,rowIndex} = this.props;
        return (
            <tr className={rowIndex%2==0?'odd':'even'}>{children}</tr>
        )
    }

}

Row.propTypes = {
    children: PropTypes.node,
    rowIndex: PropTypes.number
};

export default Row;