import React, { Component, PropTypes } from 'react'
class NavBox extends Component {

    render(){
        const {children,handlerClick} = this.props;
        return (
            <div id="mainleft">
                <div id="subnav">
                    <div className="subnavbox">
                        <ul id="slide" onClick={handlerClick}>
                            {children}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

NavBox.propTypes = {
    children: PropTypes.node,
    handlerClick: PropTypes.func
};

export default NavBox;