import React, { Component, PropTypes } from 'react'
class BannerImgBox extends Component {

    constructor(props, context) {
        super(props, context);
        this.handlerClick = props.handlerClick;
    };

    render(){
        const {children} = this.props;
        return (
            <div className="blue-body">
                <div id="subnav-ly" onClick={this.handlerClick}>
                    {children}
                </div>
            </div>
        )
    }
}

BannerImgBox.propTypes = {
    children: PropTypes.node,
    handlerClick: PropTypes.func
};

export default BannerImgBox;