import React, { Component, PropTypes } from 'react'
import UserInfoBox from './user/UserInfoBox';
import {IMG_LOGO_URL,APP_TITLE_NAME} from '../constants/Constant';

class Header extends Component {
    
    render(){
        return (
            <div className="main-top no-print">
                <div className="index-logo">
                    <img src={IMG_LOGO_URL} height="50" width="50" className="logo"/>
                    <p className="logo-name">{APP_TITLE_NAME}<span className="title-font-size">——清滨调解中心</span></p>
                </div>
                <UserInfoBox/>
                <div className="cls"></div>
            </div>

        )
    }
}
export  default Header;