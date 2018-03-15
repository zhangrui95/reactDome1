import React, { Component, PropTypes } from 'react'

class Remember extends Component {

    render(){
        const {name,form,errorTip} = this.props;
        const tip = errorTip != null && errorTip != '' ? <div className="error-login">{errorTip}</div> : null;
        return (
            <div className="login-infor">
                {tip}
            </div>
        )
    }

}
// <div className="password-remember">
//     <input type="checkbox" name={name} checked={form[name]} />
//     记住用户</div>
Remember.propTypes = {
    errorTip: PropTypes.string,
    name: PropTypes.string,
    form: PropTypes.object
};

export default Remember;