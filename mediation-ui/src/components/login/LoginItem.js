import React, { Component, PropTypes } from 'react'

class LoginItem extends Component {

    getDefaultChild(){
        const {name,type,form,inputClass} = this.props;
        return <input type={type} value={form[name]} name={name}  className={inputClass} />;
    }

    render(){
        const {title,children} = this.props;
        const childOrDefault = children ? children : this.getDefaultChild();
        return (
            <div className="login-infor">
                <div className="login-title">{title}</div>
                <div className="login-text">{childOrDefault}</div>
            </div>
        )
    }

}

LoginItem.propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    inputClass: PropTypes.string,
    form: PropTypes.object,
    children: PropTypes.node
};

LoginItem.defaultProps = {
    type:'text',
    inputClass:'text-user'
};

export default LoginItem;