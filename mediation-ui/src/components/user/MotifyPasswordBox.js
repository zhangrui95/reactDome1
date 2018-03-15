import React, { Component, PropTypes } from 'react'
import { Tooltip } from 'antd';

class MotifyPasswordBox extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            oldPass:'',
            newPass:'',
            confirm:'',
            oldPassErr:'',
            newPassErr:'',
            confirmErr:''
        };
    };

    componentWillReceiveProps(next) {
        this.setState({oldPassErr:next.oldValid?'':'原密码错误'});
    }

    check(){
        const oldPass = this.state.oldPass;
        const newPass = this.state.newPass;
        const confirm = this.state.confirm;
        let ret = true;
        if(oldPass===''){
            this.setState({oldPassErr:'请输入原密码'});
            ret = false;
        }
        if(newPass===''){
            this.setState({newPassErr:'请输入新密码'});
            ret = false;
        }else{
            this.setState({newPassErr:''});
        }
        if(confirm===''){
            this.setState({confirmErr:'请确认新密码'});
            ret = false;
        }else if(newPass != confirm){
            this.setState({confirmErr:'新密码两次输入不一致'});
            ret = false;
        }else{
            this.setState({confirmErr:''});
        }
        if(!this.props.oldValid){
            this.setState({oldPassErr:'原密码错误'});
            ret = false;
        }
        return ret
        // return ret && window.confirm("确认修改密码？");
    }

    getOldPass(){
        return this.state.oldPass;
    }

    getNewPass(){
        return this.state.newPass;
    }

    blurOldHandler(){
        const oldPass = this.getOldPass();
        if(oldPass===''){
            this.setState({oldPassErr:'请输入原密码'});
            return false;
        }
        this.setState({oldPassErr:''});
        const	{validPass}	=	this.props;
        validPass(oldPass);
    }

    blurNewHandler(){
        const newPass = this.getNewPass();
        if(newPass===''){
            this.setState({newPassErr:'请输入新密码'});
            return false;
        }
        this.setState({newPassErr:''});
    }

    blurConfimHandler(){
        const newPass = this.getNewPass();
        const confirm = this.state.confirm;
        if(confirm===''){
            this.setState({confirmErr:'请确认新密码'});
            return false;
        }
        if(newPass != confirm){
            this.setState({confirmErr:'新密码两次输入不一致'});
            return false;
        }
        this.setState({confirmErr:''});
    }

    handlerChange(e){
        const ele = e.target;
        if(ele.tagName !== 'INPUT'){
            return;
        }
        this.setState({[ele.name]:ele.value});
    }

    render(){
        const oldPassErr = this.state.oldPassErr;
        const newPassErr = this.state.newPassErr;
        const confirmErr = this.state.confirmErr;
        return (
            <div ref="uppassbox" className="error-center" onChange={this.handlerChange.bind(this)}>
                <div className="error-height"></div>
                <div className="error-message-pop">原密码：
                    <Tooltip align={{offset: [70, 0]}} getTooltipContainer={()=>this.refs.uppassbox} visible={oldPassErr!=null&&oldPassErr!=''} trigger={[]} placement="topRight" title={oldPassErr}>
                        <input type="password" name="oldPass" value={this.state.oldPass} className="text-input-pop" onBlur={this.blurOldHandler.bind(this)} />
                    </Tooltip>
                </div>
                <div className="error-message-pop">新密码：
                    <Tooltip align={{offset: [70, 0]}} getTooltipContainer={()=>this.refs.uppassbox} visible={newPassErr!=null&&newPassErr!=''} trigger={[]} placement="topRight" title={newPassErr}>
                        <input type="password" name="newPass" value={this.state.newPass} className="text-input-pop" onBlur={this.blurNewHandler.bind(this)} />
                    </Tooltip>
                </div>
                <div className="error-message-pop">确认新密码：
                    <Tooltip align={{offset: [70, 0]}} getTooltipContainer={()=>this.refs.uppassbox} visible={confirmErr!=null&&confirmErr!=''} trigger={[]} placement="topRight" title={confirmErr}>
                        <input type="password" name="confirm" value={this.state.confirm} className="text-input-pop"  onBlur={this.blurConfimHandler.bind(this)}  />
                    </Tooltip>
                </div>
                <div className="pop-submit">
                    <input type="button" name="button" data-close="save" value="保存"  className="btn-pop"/>
                    <input type="button" name="button" value="取消"  className="btn-reset" data-close="pop_cross"/>
                </div>
                <div className="error-height"></div>
            </div>
        )
    }

}

MotifyPasswordBox.propTypes = {
    validPass: PropTypes.func.isRequired,
    oldValid: PropTypes.bool.isRequired
};

export default MotifyPasswordBox;