import React, { Component, PropTypes } from 'react'
import TimeChoice from './TimeChoice'
import { Input } from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {CHECKVISIT_SAVE,CHECKVISIT_DETAIL,CHECKVISIT_UPDATE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import * as checkvisitActions from '../../actions/checkvisit'
import * as arhciveActions from '../../actions/arhcive'
import {getDateTime,getDate} from '../../utils/date';
import PopAlert from '../pop/PopAlert';
import DisputeCase from './DisputeCase';
import PageContent from './PageContent';
import {setHeaderClass,setFooterClass} from '../../utils/body'

class CheckVisit extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {model: 0,input:'',date:'',defaultTime:getDateTime(new Date().getTime()),msg:''};
    }

    componentDidMount() {
        setHeaderClass('print-header-box');
        setFooterClass('print-bottom-box');
    }

    componentWillReceiveProps(next) {
        const {actions,arhciveActions} = this.props;
        const {checkvisit} = next;
        const {response,action,actionResponse} = checkvisit||{};
        if(action === 'add' && actionResponse) {
            const {state, data} = actionResponse || {};
            if (state === 0) {
                this.setState({model:1,input:data.content,date:getDateTime(data.visitTime)});
                arhciveActions.setCheck(data);
            }
            actions.resetAction(actionResponse);
        }else if(action === 'update' && actionResponse){
            const {state,data} = actionResponse || {};
            if (state === 0) {
                this.setState({model:1,input:data.content,date:getDateTime(data.visitTime)});
                arhciveActions.setCheck(data);
            }
            actions.resetAction(actionResponse);
        }else if(response){
            const {state,data} = response||{};
            if(state === 0){
                this.setState({model:1,input:data.content,date:getDateTime(data.visitTime)});
            }else{
                this.setState({model:0,input:'',date:''});
            }
        }
    }

    updateModel(){
        const { checkvisit} = this.props;
        const {response} = checkvisit;
        const {data} = response||{};
        this.setState({model:2,input:data.content,date:getDateTime(data.visitTime)});
    }
    updateArchive(){
        if(!this.validate()){
            return
        }
        const {syncActions,checkvisit} = this.props;
        const {response} = checkvisit;
        const {data} = response||{};
        const applyTime = this.state.date;
        syncActions.request(CHECKVISIT_UPDATE,null,{id:data.id,content:this.state.input,visitTime:applyTime===''?this.state.defaultTime:applyTime});
    }

    inputChange(e){
        this.setState({input: e.target.value});
    }
    componentWillMount(){
        const {syncActions,params} = this.props;
        const {id} = params;
        syncActions.request(CHECKVISIT_DETAIL,{id});
    }
    timeChange(date){
        this.setState({date: date.visitTime});
    }
    onSave(){
        if(!this.validate()){
            return
        }
        const {syncActions,params} = this.props;
        const {id} = params;
        const applyTime = this.state.date;
        syncActions.request(CHECKVISIT_SAVE,null,{content:this.state.input,visitTime:applyTime===''?this.state.defaultTime:applyTime,archive:{id}});
    }

    validate(){
        if(this.state.input === ''){
            this.setState({msg:'回访情况不能为空'});
            return false;
        }
        if(this.state.input.length > 1000){
            this.setState({msg:'回访情况字数不能超过1000字'});
            return false;
        }
        return true;
    }

    getLitigants(archive){
        const {response} = archive;
        const {data} = response||{};
        const {litigants}= data||{};
        return (litigants||[]).map((i)=>i.name).join(',');
    }
    getResult(archive){
        const {response} = archive;
        const {protocol} = response||{};
        const {result}= protocol||{};
        return result;
    }
    getData(archive){
        const {response} = archive;
        const {data} = response||{};
        return data;
    }

    getPrint(){
        window.print();
    }

    render() {
        let time = '';
        let contents = '';
        let btns = '';
        let visitTime = '';
        const model = this.state.model;
        const { archive ,checkvisit} = this.props;
        const {response} = checkvisit;
        const {data} = response||{};
        const {content} = data||{};
        const litigantsName = this.getLitigants(archive);
        const result = this.getResult(archive);
        const pageRows = 44;
        const topRows = 9;
        const {rows,rowNum} = PageContent.getRows(content,pageRows-topRows);
        let lastRows = (rowNum + topRows)%44;
        let next;
        if(lastRows >= 39){
            next = (<div><div className="page-next"></div><div className="page-fixed-height"></div></div>);
        }
        if(model === 0){
            const archiveData = this.getData(archive);
            if(archiveData && archiveData.finishState === 0){
                if(result === -1){
                    contents = <div className="formArch"><Input type="textarea" rows={4} onChange={this.inputChange.bind(this)} value={this.state.input} disabled/></div>;
                    time = <TimeChoice name="visitTime" onChange={this.timeChange.bind(this)} value={this.state.date} defaultValue={this.state.defaultTime} dis={0}/>;
                    btns = ''
                }else{
                    contents = <div className="formArch"><Input type="textarea" rows={4} onChange={this.inputChange.bind(this)} value={this.state.input}/></div>;
                    time = <TimeChoice name="visitTime" onChange={this.timeChange.bind(this)} value={this.state.date} defaultValue={this.state.defaultTime}/>;
                    btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.onSave.bind(this)} className="addPerson"/></div>
                }
            }else{
                contents = <div className="formArch"><Input type="textarea" rows={4} onChange={this.inputChange.bind(this)} value={this.state.input} disabled/></div>;
                time = <TimeChoice name="visitTime" onChange={this.timeChange.bind(this)} value={this.state.date} defaultValue={this.state.defaultTime} dis={0}/>;
                btns = ''
            }
        }else if(model === 1){
            if(data === null || data === undefined){
                return null;
            }
            let editBtn;
            let btnBox = 'formArch btn-box print-btn';
            const archiveData = this.getData(archive)
            if(archiveData && archiveData.finishState === 0){
                editBtn = <input type="button" className="change-btn" value="编辑" onClick={this.updateModel.bind(this)} />
                btnBox = 'formArch btn-box';
            }
            btns = <div className={btnBox} style={{ height:40 }}>{editBtn}<input type="button" onClick={this.getPrint.bind(this)} className="change-btn" value="打印" /></div>
            contents = <DisputeCase rows={rows} content={content}/>;
            time = <div className="margin-word font-big">{getDateTime(data.visitTime)}</div>;
            visitTime = getDate(data.visitTime);
        }else{
            if(data === null || data === undefined){
                return null;
            }
            contents = <div className="formArch"><Input type="textarea" rows={4} onChange={this.inputChange.bind(this)} value={this.state.input}/></div>;
            time = <TimeChoice name="visitTime" onChange={this.timeChange.bind(this)} value={this.state.date} defaultValue={this.state.defaultTime}/>;
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.updateArchive.bind(this)} className="addPerson"/></div>
        }

        return (
            <div>
                <div className="center-box">
                    <div className="top-left"></div>
                    <div className="top-right"></div>
                <div className="title-form-name">人民调解回访记录</div>
                <div className="formBorder">
                    <div className="border-box">
                        <div className="formArch"><div className="margin-form word-title name-style-left">回访时间</div>{time}</div>
                        <div className="formArch"><div className="margin-form word-title name-style-left">被回访人</div><div className="margin-word font-big">{litigantsName}</div></div>
                    </div>
                    <div className="formArch"><div className="margin-form word-title name-style-left">回访情况</div></div>
                    {contents}
                </div>
                    <div className="bottom-left"></div>
                    <div className="bottom-right"></div>
                </div>
                {btns}
                <div className="fixed-box"></div>
                <PopAlert visible={this.state.msg!==''} title="消息提醒"  width={400} zIndex={1270} modalzIndex={1260} message={this.state.msg} closeDoneHandler={()=>this.setState({msg:""})}/>
                {next}
                <div className="bottom-position">
                    <div className="sign-margin">回访人签字：</div>
                    <div className="time-right">{visitTime}</div>
                </div>
            </div>
        )
    }
}

CheckVisit.propTypes = {
    children: PropTypes.node
};

function	select(state)	{
    return	{
        archive:state.archive,
        checkvisit:state.checkvisit
    };
}

function actions(dispatch) {
    return {
        syncActions: bindActionCreators(syncActions, dispatch),
        arhciveActions: bindActionCreators(arhciveActions, dispatch),
        actions: bindActionCreators(checkvisitActions, dispatch)
    }
}

export  default connect(select,actions)(CheckVisit);
