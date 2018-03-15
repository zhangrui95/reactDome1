import React, { Component, PropTypes } from 'react'
import Pop from './Pop'

class PopAlert extends Component {

    pop(){
        this.refs.pop.pop();
    }

    saveHndler(){
        const {onOk,message} = this.props;
        if(onOk){
            onOk(message)
        }
    }

    render(){
        return (<Pop ref="pop" {...this.props} closeHandler={this.saveHndler.bind(this)}>
            <div className="error-height"></div>
            <div className="news-warn">{this.props.message}</div>
            <div className="pop-submit">
                <input type="button" name="button" data-close="save" value="确定"  className="btn-pop"/>
            </div>
            <div className="error-height"></div>
        </Pop>);
    }
} 

Pop.propTypes = {
    message: PropTypes.string,
    onOk:PropTypes.func
};

export default PopAlert;