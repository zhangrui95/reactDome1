/**
 * Created by Administrator on 2017/7/13 0013.
 */
import React, { Component, PropTypes } from 'react'

class HeaderTop extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const {data,isActive,add} = this.props;
        let style = '';
        let numStyle = '';
        if(isActive){
            style = 'header-top tap-blue';
            numStyle = 'num-click-blue'
        }else{
            if(add ==='add'){
                style = 'header-top-gary';
                numStyle = 'num-gray'
            }else{
                style = 'header-top';
                numStyle = 'num-blue'
            }
        }
        return (
            <div className={style} >
                <div className={numStyle}>0{data.index+1}</div>
                <div className="data-name" data-route={data.route} data-index={data.index}>{data.name}</div>
            </div>
        )
    }
}


export default HeaderTop