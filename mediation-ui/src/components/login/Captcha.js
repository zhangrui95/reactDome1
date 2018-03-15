import React, { Component, PropTypes } from 'react'

class Captcha extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {random: Math.random()};
    };

    handleClick(e){
        this.changeCode();
    }

    changeCode(){
        this.setState({random: Math.random()});
    }

    render(){
        const {src,name,form} = this.props;
        return (
            <div>
            <div className="login-captcha-left">
                <input type="text" value={form[name]} name={name} className="text-captcha" />
            </div>
            <div className="login-captcha-right" onClick={this.handleClick.bind(this)}><img src={src+'?'+this.state.random} height="40" width="85" /></div>
            <div className="cls"></div>
            </div>
        )
    }

}

Captcha.propTypes = {
    src: PropTypes.string,
    name: PropTypes.string,
    form: PropTypes.object
};

export default Captcha;