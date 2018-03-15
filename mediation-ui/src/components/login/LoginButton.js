import React, { Component, PropTypes } from 'react'

class LoginButton extends Component {

    render(){
        return (
            <div className="login-submit">
                <input type="button" name="button" value="立即登录"  className="btn-larger" onClick={this.props.onClick}/>
            </div>
        )
    }

}

LoginButton.propTypes = {
    onClick: PropTypes.func
};

export default LoginButton;