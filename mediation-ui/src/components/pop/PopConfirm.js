import React, { Component, PropTypes } from 'react'
import Pop from './Pop'

class PopConfirm extends Component {

    pop(){
        this.refs.pop.pop();
    }

    render(){
        const {onOk,onNo} = this.props;
        return (<Pop ref="pop" {...this.props} closeHandlers={{save:onOk,pop_cross:onNo}}>
            <div className="error-height"></div>
            <div className="news-warn">{this.props.information}</div>
            <div className="pop-submit">
                <input type="button" name="button" data-close="save" value="确定"   className="btn-pop"/>
                <input type="button" name="button" value="取消"  className="btn-reset" data-close="pop_cross" />
            </div>
            <div className="error-height"></div>
        </Pop>);
    }
}

Pop.propTypes = {
    information: PropTypes.string,
    onOk:PropTypes.func,
    onNo:PropTypes.func
};

export default PopConfirm;
