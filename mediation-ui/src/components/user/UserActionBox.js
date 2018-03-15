import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {UPDATE_PASS,SIGN_OUT_USER,VALIDATE_PASS} from '../../constants/ActionTypes'
import {IMG_MODIFY_URL,IMG_OUT_URL,CHANGE_PASS_SUCC,CHANGE_PASS_OLD_ERROR,CHANGE_PASS_FAIL,PATH_ROUTE_KEY} from '../../constants/Constant'
import Pop from '../pop/Pop';
import PopAlert from '../pop/PopAlert';
import PopConfirm from '../pop/PopConfirm'
import MotifyPasswordBox from './MotifyPasswordBox';
import * as syncActions from '../../actions/syncAction';
import * as headerActions from '../../actions/header';
import storage from "../../utils/storage";

class UserActionBox extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {passBox:false,oldValid:true,msg:'',passConfirm:false,goOutConfirm:false};
    };

    componentWillReceiveProps(next) {
        const {header} = next;
        const {signOut,updatePass,validPass} = header||{};
        const {isFetch} = signOut||{};
        if(isFetch != null && isFetch){
            return;
        }
        const {response} = updatePass||{};
        const {upStatus} = response||{};
        if(upStatus === CHANGE_PASS_SUCC){
            // alert("密码修改成功，请重新登录！");
            this.successPop();
        }else if(upStatus === CHANGE_PASS_OLD_ERROR){
            // alert("原密码验证失败");
            this.passwordFailure();
        }else if(upStatus === CHANGE_PASS_FAIL){
            // alert("修改失败");
            this.errorPop();
        }

        if(validPass){
            const vResponse = (validPass||{}).response;
            const {result} = vResponse||{};
            this.setState({oldValid:result === CHANGE_PASS_SUCC});
        }

        if(updatePass||validPass){
            const	{headerActions}	=	this.props;
            headerActions.reset();
        }
    }

    signOut(){
        const	{router}	=	this.context;
        router.push('/signIn');
        storage.local.remove('state');
        storage.local.remove(PATH_ROUTE_KEY);
        const	{actions}	=	this.props;
        actions.request(SIGN_OUT_USER);
    }

    /*修改密码弹出点击事件*/
    upPassWordClick(){
        this.setState({passBox:true});
    }
    /* 退出登录事件*/
    loginOutClick(){
        this.setState({goOutConfirm:true});
    }
    saveButtonClick(){
        const passBox = this.refs.passBox;
        if(!passBox.check()){
            return false;
        }
        this.popChangePassword();
        return false;
    }
    confirmBtn(){
        const passBox = this.refs.passBox;
        this.updatePass(passBox.getOldPass(),passBox.getNewPass());
    }
    validPass(oldPass){
        const	{actions}	=	this.props;
        actions.request(VALIDATE_PASS,null,oldPass);
    }

    updatePass(oldPass,newPass){
        const	{actions}	=	this.props;
        actions.request(UPDATE_PASS,null,oldPass,newPass);
    }

    popChangePassword(){
        this.setState({passConfirm:true});
    }

    successPop(){
        this.setState({msg:"密码修改成功，请重新登录！"});
    }

    passwordFailure(){
        this.setState({msg:"原密码验证失败！"});
    }
    errorPop(){
        this.setState({msg:"修改失败！"});
    }
    msgReset(){
        this.setState({msg:""});
    }
    infReset(){
        this.setState({passConfirm:false});
    }
    goOutReset(){
        this.setState({goOutConfirm:false});
    }
    alertOk(msg){
        if(msg=='密码修改成功，请重新登录！'){
            this.signOut();
        }
    }
    render(){
        return (
            <div onClick={ e => e.nativeEvent.stopImmediatePropagation()}>
                <div className="account-box">
                    <ul>
                        <li>
                            <div className="operation-all">
                                <div className="images-left"> <img src={IMG_MODIFY_URL} height="26" width="15" /> </div>
                                <div className="images-right">
                                    <a href="javascript:;" onClick={this.upPassWordClick.bind(this)}>修改密码</a>
                                </div>
                                <div className="cls"></div>
                            </div>
                        </li>
                        <li>
                            <div className="operation-all">
                                <div className="images-left"> <img src={IMG_OUT_URL} height="26" width="15"/></div>
                                <div className="images-right"> <a href="javascript:;" onClick={this.loginOutClick.bind(this)} >退出登录</a> </div>
                                <div className="cls"></div>
                            </div>
                        </li>
                    </ul>
                </div>
                <Pop title="修改密码" visible={this.state.passBox} closeHandlers={{save:this.saveButtonClick.bind(this)}} closeDoneHandler={()=>this.setState({passBox:false})}>
                    <MotifyPasswordBox ref="passBox" oldValid={this.state.oldValid} validPass={this.validPass.bind(this)}/>
                </Pop>
                <PopConfirm visible={this.state.goOutConfirm} title="消息提醒" width={400} zIndex={1250} modalzIndex={1240} information="您是否确定退出当前系统？" onOk={this.signOut.bind(this)}  closeDoneHandler={this.goOutReset.bind(this)}/>
                <PopConfirm visible={this.state.passConfirm} title="消息提醒" width={400} zIndex={1250} modalzIndex={1240} information="您确认修改密码？" onOk={this.confirmBtn.bind(this)}  closeDoneHandler={this.infReset.bind(this)}/>
                <PopAlert visible={this.state.msg!=''} title="消息提醒"  width={400} zIndex={1270} modalzIndex={1260} message={this.state.msg} onOk={this.alertOk.bind(this)}  closeDoneHandler={this.msgReset.bind(this)}/>
            </div>
        ) 
    }

}

UserActionBox.propTypes = {
    header: PropTypes.object.isRequired
};

UserActionBox.contextTypes = {
    router: PropTypes.object
};
function	select(state)	{
    return	{ 
        header:state.header
    };
}

function actions(dispatch) {
    return {
        headerActions: bindActionCreators(headerActions, dispatch),
        actions: bindActionCreators(syncActions, dispatch)
    }
}
export  default connect(select,actions)(UserActionBox);