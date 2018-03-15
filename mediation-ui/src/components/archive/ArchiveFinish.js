import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {ARCHIVE_FINISH} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction';
import * as arhciveActions from '../../actions/arhcive';
import UpLoading from './UpLoading';
import PopAlert from '../pop/PopAlert';
import {ENVELOPE_Logo_Img} from '../../constants/Constant';
import {getDate,getYear} from '../../utils/date';
import {setHeaderClass,setFooterClass} from '../../utils/body'

class ArchiveFinish extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {msg:''};
    }

    componentDidMount() {
        setHeaderClass('print-header-box-none');
        setFooterClass('print-footer-box-none');
    }

    componentWillReceiveProps(next) {
        const {actions} = this.props;
        const {archive} = next;
        const {action,actionResponse} = archive;
        if(action === 'update' && actionResponse){
            const {data} = actionResponse || {};
            actions.resetAction(data);
        }
    }

    finish(){
        const { params,archive} = this.props;
        const { id} = params;
        const { response} = archive;
        const { data} = response||{};
        const { protocolPath} = data||{};
        if(!protocolPath || protocolPath===''){
            this.setState({msg:'请上传协议书扫描件'});
            return false;
        }
        const {syncActions} = this.props;
        syncActions.request(ARCHIVE_FINISH,{id});
    }
    
    getPrint(){
        window.print();
    }
    
    getWorkers(archive){
        const {response} = archive;
        const {data} = response||{};
        const {workers,manager}= data||{};
        let wnames = (workers||[]).map((i)=>(i.worker||{}).name||'').join(',');
        if(wnames !== ''){
            wnames = ','+wnames;
        }
        return ((manager||{}).name||'')+wnames;
    }
    render() {
        const { params} = this.props;
        const { id} = params;
        const { archive} = this.props;
        const { response} = archive;
        const { data,protocol} = response||{};
        const { finishState,type,name,creater,state} = data||{};
        const {code} = protocol||{};
        let btns;
        let envelope;
        if(finishState === 0){
            btns = (<div className="formArch print-hide" style={{ height:40 }}><input type="button" value="提交" onClick={this.finish.bind(this)} className="addPerson"/></div>)
        }else{
            let protoTime;
            let createTime;
            let keepTime;
            let year;
            if(state !== 2){
                protoTime = getDate(protocol.createTime);
                createTime = getDate(data.createTime);
                keepTime = getDate(data.keepTime);
                year = getYear(data.createTime);
                if(protocol.createTime === null||data.createTime === null||data.keepTime === null||data.createTime === null){
                    return null;
                }
                envelope = <div className="hidden print-show">
                    <div className="title-form-name envelope-title-all">清滨人民调解委员会</div>
                    <div className="envelope-name">卷宗</div>
                    <div className="formArch">
                        <img className="envelope-img" src={ENVELOPE_Logo_Img}/>
                    </div>
                    <div className="envelope-text"><div className="envelope-title">卷宗类别</div><div>：{type.name}</div></div>
                    <div className="envelope-text"><div className="envelope-title">卷宗名称</div><div>：{name}</div></div>
                    <div className="envelope-text"><div className="envelope-title"><span className="envelope-left">年</span><span className="envelope-right">度</span></div><div>：{year}</div></div>
                    <div className="envelope-text"><div className="envelope-title"><span className="envelope-left">卷</span><span className="envelope-right">号</span></div><div>：{code}</div></div>
                    <div className="envelope-text"><div className="envelope-title">调解人员</div><div>：{this.getWorkers(archive)}</div></div>
                    <div className="envelope-text"><div className="envelope-title">调解日期</div><div>：{protoTime}</div></div>
                    <div className="envelope-text"><div className="envelope-title">立卷人员</div><div>：{creater.name}</div></div>
                    <div className="envelope-text"><div className="envelope-title">立卷日期</div><div>：{createTime}</div></div>
                    <div className="envelope-text"><div className="envelope-title">保管期限</div><div>：{keepTime}</div></div>
                </div>;
                btns = (<div className="formArch print-hide" style={{ height:40 }}><input type="button" value="打印封皮" onClick={this.getPrint.bind(this)} className="addPerson"/></div>);
            }

        }
        return (
            <div>
                {envelope}
                <div className="title-form-name print-hide">结案</div>
                <div className="formBorder print-hide">
                    <div className="fixed-box"></div>
                    <div className="formArch word-title">协议书扫描件</div>
                    <div className="formArch"><UpLoading className="btn-pop" dataId={id}/></div>
                </div>
                {btns}
                <PopAlert visible={this.state.msg!==''} title="消息提醒"  width={400} zIndex={1270} modalzIndex={1260} message={this.state.msg} closeDoneHandler={()=>this.setState({msg:""})}/>
            </div>
        )
    }
}

ArchiveFinish.propTypes = {
};

function	select(state)	{
    return	{
        archive:state.archive,
        header:state.header
    };
}

function actions(dispatch) {
    return {
        syncActions: bindActionCreators(syncActions, dispatch),
        actions: bindActionCreators(arhciveActions, dispatch),
    }
}
export  default connect(select,actions)(ArchiveFinish);
