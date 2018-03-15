import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {SIGN_IN_USER} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import {setBodyClass,setMainClass} from '../../utils/body'
import storage from '../../utils/storage'
import Tips from './Tips'
import LoginItem from './LoginItem'
import LoginButton from './LoginButton'
import Remember from './Remember'
import Captcha from './Captcha'
import {SIGN_IN_SUCCESS,CAPTCHA_URL,IMG_LOGIN_BG_URL} from '../../constants/Constant'

class Login extends Component {

    constructor(props, context) {
        super(props, context);
        this.handlerKeyDownWarp = this.handlerKeyDown.bind(this);
        let login_name = storage.local.data('login_name');
        login_name = login_name==null?'':login_name;
        this.state = {form: {
            user:login_name,
            pass:'',
            verify:'',
            remember:false
        },errorTip:''};
    };

    componentWillMount() {
        const loginMsg = storage.local.data('loginMsg');
        if(loginMsg != null && loginMsg != ''){
            storage.local.remove('loginMsg');
            this.setState({errorTip:loginMsg});
            return;
        }
        const old = storage.local.data('state');
        if(old!=null){
            const	{router}	=	this.context;
            router.push('/');
        }
    }

    componentDidMount() {
        setBodyClass('');
        setMainClass('fullwidthbanner-container');
        document.addEventListener('keydown',this.handlerKeyDownWarp);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown',this.handlerKeyDownWarp);
    }

    componentWillReceiveProps(next) {
        const {state,msg} = this.getUserResponse(next)||{};
        if(state == SIGN_IN_SUCCESS){
            const	{router}	=	this.context;
            router.push('/');
            storage.local.data('state',Date.now());
            storage.local.data('login_name',this.state.form.user);
        }else if(msg){
            this.refs.captcha.changeCode();
            this.setState({errorTip:msg});
        }
    }

    getUserResponse(props){
        const {header} = props||this.props;
        const {user} = header||{};
        return (user||{}).response;
    }

    handlerKeyDown(e){
        if (e.keyCode == 13) {
            this.handlerClick();
        }
    }

    handlerClick(){
        const form = this.state.form;
        if(form.user==''){
            this.setState({errorTip:'用户名不能为空'});
            return;
        }
        if(form.pass==''){
            this.setState({errorTip:'密码不能为空'});
            return;
        }
        if(form.verify==''){
            this.setState({errorTip:'验证码不能为空'});
            return;
        }
        const	{actions}	=	this.props;
        actions.request(SIGN_IN_USER,null,form);
    }

    handlerChange(e){
        const form = this.state.form;
        const target = e.target;
        if(target.type=='checkbox'){
            form[target.name] = target.checked;
        }else{
            form[target.name] = target.value;
        }
        this.setState({form});
    }

    render(){
        return (
            <div className="revolution-slider">
                <ul><li className="bg-img" >
                    <img src={IMG_LOGIN_BG_URL} className="img-bg"/>
                    <div className="login-main">
                        <Tips/>
                        <div className="login-right" onChange={this.handlerChange.bind(this)}>
                            <div className="login-head">用户登录</div>
                            <LoginItem title="请输入用户名" name="user" form={this.state.form}/>
                            <LoginItem title="请输入密码" name="pass" form={this.state.form} type="password" inputClass="text-password"/>
                            <LoginItem title="请输入验证码">
                                <Captcha ref="captcha" name="verify" form={this.state.form} src={CAPTCHA_URL}/>
                            </LoginItem>
                            <LoginButton onClick={this.handlerClick.bind(this)}/>
                            <Remember name="remember" form={this.state.form} errorTip={this.state.errorTip}/>
                        </div>
                        <div className="cls"></div>
                    </div>
                </li></ul>

            </div>

        )
    }

}
// <div className="logo-top">{APP_TITLE_NAME}</div>
Login.propTypes = {
    header: PropTypes.object.isRequired
};

Login.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    return {
        header:state.header
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);