/**
 * Created by Administrator on 2017/7/24 0024.
 */
import React, { Component, PropTypes } from 'react'
import Pop from './Pop'
import {IMG_Loading_URL} from '../../constants/Constant';

class PopLoading extends Component {

    pop(){
        this.refs.pop.pop();
    }

    render(){
        return (<Pop ref="pop" {...this.props}>
            <div className="error-height"></div>
            <div className="news-warn">
                <img className="pop-img" src={IMG_Loading_URL}/>
                <div className="news-warn">{this.props.load}</div>
            </div>
            <div className="error-height"></div>
        </Pop>);
    }
}

Pop.propTypes = {
    load: PropTypes.string
};

export default PopLoading;