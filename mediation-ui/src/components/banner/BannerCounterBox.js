import React, { Component, PropTypes } from 'react'
class BannerCounterBox extends Component {

    constructor(props, context) {
        super(props, context);
        this.handlerClick = props.handlerClick;
    };

    render(){
        const {children} = this.props;
        return (
            <div className="wrapper" onClick={this.handlerClick}>
                {children}
            </div>
        )
    }
}

BannerCounterBox.propTypes = {
    children: PropTypes.node,
    handlerClick: PropTypes.func
};

export default BannerCounterBox;