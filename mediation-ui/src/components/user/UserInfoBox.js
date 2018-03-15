import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {LOAD_USER, SIGN_OUT_USER} from "../../constants/ActionTypes";
import * as syncActions from "../../actions/syncAction";
import UserActionBox from "./UserActionBox";
import {SIGN_IN_SUCCESS, SESSION_TIMEOUT_MSG, IMG_OPERATION_URL} from "../../constants/Constant";
import storage from "../../utils/storage";
import PopAlert from "../pop/PopAlert";

const LOAD_TIME_NUM = 60*1000;

class UserInfoBox extends Component {

    constructor(props, context) {
        super(props, context);
        this.state={tips:false,msg:''};
        this.handleBodyClickWarp = this.handleBodyClick.bind(this)
    };

    componentWillReceiveProps(next) {
        const user = this.getCacheUser(next);
        if(user){
            storage.local.data('state',Date.now());
        }else{
            // const	{router}	=	this.context;
            // router.push('/signIn');
            // storage.local.remove('state');
            // storage.local.data('loginMsg',SESSION_TIMEOUT_MSG);
            // alert("用户登录超时，请重新登录!");
            this.alertPop();
        }
    }
    goOutBtn(){
        const	{actions}	=	this.props;
        actions.request(SIGN_OUT_USER);
    }
    componentWillMount() {
        const user = this.getCacheUser();
        if(!user){
            this.loadUser();
            this.loadHander = setInterval(this.loadUser.bind(this),LOAD_TIME_NUM);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click',this.handleBodyClickWarp);
        clearInterval(this.loadHander);
    }

    getCacheUser(props){
        const {header} = props||this.props;
        const {user} = header||{};
        const {response} = user||{};
        const {state} = response||{};
        return state == SIGN_IN_SUCCESS ? response.user : undefined;
    }

    handleBodyClick(){
        this.toggle()
    }

    loadUser(){
        const {actions}	=	this.props;
        actions.request(LOAD_USER);
    }

    toggle(){
        const will = !this.state.tips;
        if(will){
            document.addEventListener('click',this.handleBodyClickWarp);
        }else{
            document.removeEventListener('click',this.handleBodyClickWarp);
        }
        this.setState({tips:will});
    }

    handlerClick(){
        this.toggle()
    }

    alertPop(){
        this.setState({msg:"用户登录超时，请重新登录!"});
    }

    msgReset(){
        this.setState({msg:""});
    }
    alertTimeOut(){
        const	{router}	=	this.context;
        router.push('/signIn');
        storage.local.remove('state');
        storage.local.data('loginMsg',SESSION_TIMEOUT_MSG);
    }
    render(){
        const user = this.getCacheUser();
        const {name} = user||{};
        let pobBox;
        if(this.state.tips){
            pobBox = (<UserActionBox/>)
        }
        return (
            <div className="people-infor">
                <div className="infor-body">
                    <div className="infor-name">{name}</div>
                    <div className="infor-operation">
                        <div className="czj-box" >
                            <p>
                                <img src={IMG_OPERATION_URL} height="16" width="16" onClick={this.handlerClick.bind(this)}/>
                            </p>
                            <div className="clear"></div>
                            {pobBox}
                        </div>
                    </div>
                    <div className="cls"></div>
                </div>
                <PopAlert visible={this.state.msg!=''} title="消息提醒"  width={400} zIndex={1270} modalzIndex={1260} message={this.state.msg} onOk={this.alertTimeOut.bind(this)} closeDoneHandler={this.msgReset.bind(this)}/>
            </div>
        )
    }

}

UserInfoBox.propTypes = {
    header: PropTypes.object.isRequired
};

UserInfoBox.contextTypes = {
    router: PropTypes.object
};

function	select(state)	{
    return	{
        header:state.header
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}
export  default connect(select,actions)(UserInfoBox);