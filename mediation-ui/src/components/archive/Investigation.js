import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {INVESTIGATION_DETAIL,INVESTIGATION_UPDATE,INVESTIGATION_SAVE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import * as investDetailActions from '../../actions/investDetail'
import {getDateTime} from '../../utils/date';
import Pop from '../pop/Pop';
import PopMediator from './PopMediator'
import { Input } from 'antd';
import TimeChoice from './TimeChoice'
import PopAlert from '../pop/PopAlert';
import DisputeCase from './DisputeCase';
import PageContent from './PageContent';
import {setHeaderClass,setFooterClass} from '../../utils/body'

class Investigation extends Component {
    constructor(props, context) {
        super(props, context);
        const { params,location} = props;
        const {mid} = params;
        const {query} = location;
        const {edit} = query||{};
        this.state = {addBox:false,model: mid !== 'create'&& mid !== null && mid !== undefined && mid !== '' ? (edit?2:1) : 0,time:'',address:'',otherPerson:'',targetPerson:'',content:'',workerIds:'',workersName:'',defaultTime:getDateTime(new Date().getTime()),msg:''};
    }

    componentDidMount() {
        setHeaderClass('print-header-box');
        setFooterClass('print-bottom-box');
    }
    
    componentWillReceiveProps(next){
        const {actions,params} = this.props;
        const {investigationDetail} = next;
        const {response,action,actionResponse} = investigationDetail||{};
        if(action === 'add' && actionResponse) {
            const {state, data} = actionResponse || {};
            if (state === 0) {
                const	{router}	=	this.context;
                router.replace('/archive/'+params.id+'/investigation/'+data.id);
                this.setState({model:1,time:getDateTime(data.investTime),address:data.address,otherPerson:data.otherPerson,targetPerson:data.targetPerson,content:data.content,workerIds:Investigation.getWorkersValue(data),workersName:Investigation.getWorkersName(data)});
            }
            actions.resetAction(actionResponse);
        }else if(action === 'update' && actionResponse){
            const {state,data} = actionResponse || {};
            if (state === 0) {
                this.setState({model:1,time:getDateTime(data.investTime),address:data.address,otherPerson:data.otherPerson,targetPerson:data.targetPerson,content:data.content,workerIds:Investigation.getWorkersValue(data),workersName:Investigation.getWorkersName(data)});
            }
            actions.resetAction(actionResponse);
        }else if(response){
            const {state,data} = response||{};
            if(state === 0){
                this.setState({time:getDateTime(data.investTime),address:data.address,otherPerson:data.otherPerson,targetPerson:data.targetPerson,content:data.content,workerIds:Investigation.getWorkersValue(data),workersName:Investigation.getWorkersName(data)});
            }else{
                this.setState({time:'',address:'',otherPerson:'',targetPerson:'',content:'',workerIds:'',workersName:''});
            }
        }
    }
    upAddClick(){
        this.setState({addBox:true});
    }
    handleWorkersChange(e,value,name){
        this.setState({workerIds:value.join(','),workersName:name.join(',')});
    }
    updateModel(){
        const { investigationDetail} = this.props;
        const {response} = investigationDetail;
        const {data} = response||{};
        const {investTime,address,otherPerson,targetPerson,content} = data||{};
        this.setState({model:2,time:getDateTime(investTime),address:address,otherPerson:otherPerson,targetPerson:targetPerson,content:content,workerIds:Investigation.getWorkersValue(data),workersName:Investigation.getWorkersName(data)});
    }
    updateArchive(){
        if(!this.validate()){
            return
        }
        const {syncActions,investigationDetail} = this.props;
        const {response} = investigationDetail;
        const {data} = response||{};
        const applyTime = this.state.time;
        syncActions.request(INVESTIGATION_UPDATE,null,{id:data.id,investTime:applyTime===''?this.state.defaultTime:applyTime,address:this.state.address,otherPerson:this.state.otherPerson,targetPerson:this.state.targetPerson,content:this.state.content,workerIds:this.state.workerIds});
    }

    componentWillMount(){
        const {syncActions,params} = this.props;
        const {mid} = params;
        if(mid !== 'create'&& mid !== null && mid !== undefined && mid !== ''){
            syncActions.request(INVESTIGATION_DETAIL,{id:mid});
        }
    }
    timeChange(date){
        this.setState({time: date.investTime});
    }
    addressChange(e){
        this.setState({address:e.target.value});
    }
    otherPersonChange(e){
        this.setState({otherPerson:e.target.value});
    }
    targetPersonChange(e){
        this.setState({targetPerson:e.target.value});
    }
    contentChange(e){
        this.setState({content:e.target.value});
    }
    onSave(){
        if(!this.validate()){
            return
        }
        const {syncActions,params} = this.props;
        const {id} = params;
        const applyTime = this.state.time;
        syncActions.request(INVESTIGATION_SAVE,null,{investTime:applyTime===''?this.state.defaultTime:applyTime,address:this.state.address,otherPerson:this.state.otherPerson,targetPerson:this.state.targetPerson,content:this.state.content,workerIds:this.state.workerIds,archive:{id}});
    }
    getWorkers(){
        let workerValue = [];
        if(this.state.workerIds && this.state.workerIds!==''){
            workerValue = this.state.workerIds.split(',');
        }
        return workerValue;
    }
    static getWorkersValue(data){
        let workerValue = '';
        if(data && data.workers){
            workerValue = (data.workers||[]).map(i=>(i.worker||{}).id||'').join(',');
        }
        return workerValue;
    }
    static getWorkersName(data){
        let workerValue = '';
        if(data && data.workers){
            workerValue = (data.workers||[]).map(i=>(i.worker||{}).name||'').join(',');
        }
        return workerValue;
    }
    goBack(){
        const { params } = this.props;
        const {id} = params;
        if(id !==null && id !== undefined && id!== ''){
            const	{router}	=	this.context;
            router.push('/archive/'+id+'/investigation');
        }
    }
    validate(){
        if(this.state.address === ''){
            this.setState({msg:'调查地点不能为空'});
            return false;
        }
        if(this.state.otherPerson === ''){
            this.setState({msg:'参加人不能为空'});
            return false;
        }
        if(this.state.targetPerson === ''){
            this.setState({msg:'被调查人不能为空'});
            return false;
        }
        if(this.state.workerIds === ''){
            this.setState({msg:'调查人不能为空'});
            return false;
        }
        if(this.state.content === ''){
            this.setState({msg:'调查记录不能为空'});
            return false;
        }
        if(this.state.content.length > 1000){
            this.setState({msg:'调查记录字数不能超过1000字'});
            return false;
        }
        return true;
    }
    getFinish(archive){
        const {response} = archive;
        const {data} = response||{};
        const {finishState} = data||{}
        return finishState;
    }
    getPrint(){
        window.print();
    }
    
    render() {
        let times =  '';
        let addresss =  '';
        let otherPersons =  '';
        let targetPersons =  '';
        let contents =  '';
        let creatPerson = '';
        let sign = '';
        let btns = '';
        const model = this.state.model;
        const { params,investigationDetail,archive} = this.props;
        const {id} = params;
        const {response} = investigationDetail;
        const {data} =  response||{};
        const {investTime,address,otherPerson,targetPerson,content} = data||{};
        const workerValue = this.getWorkers();
        const workerNames = this.state.workersName;
        const pageRows = 44;
        const topRows = 14;
        const {rows,rowNum} = PageContent.getRows(content,pageRows-topRows);
        let lastRows = (rowNum  + topRows)%44;
        let next;
        if(lastRows >= 40){
            next = (<div><div className="page-next"></div><div className="page-fixed-height"></div></div>);
        }
        if(model === 0){
            times = <TimeChoice name="investTime" onChange={this.timeChange.bind(this)} value={this.state.time} defaultValue={this.state.defaultTime}/>;
            addresss = <Input name="name" className="text-input"  style={{ width: 300 }} value={this.state.address} placeholder=""  onChange={this.addressChange.bind(this)}/>
            otherPersons = <Input name="name" className="text-input"  style={{ width: 300 }} placeholder="" value={this.state.otherPerson} onChange={this.otherPersonChange.bind(this)}/>
            targetPersons = <Input name="name" className="text-input"  style={{ width: 300 }} placeholder="" value={this.state.targetPerson} onChange={this.targetPersonChange.bind(this)}/>
            creatPerson = <div className="formArch"><div className="margin-form word-title name-style-left">调查人员</div><input className="btn-pop" type="button" value="选择" onClick={this.upAddClick.bind(this)}/> {workerNames}</div>
            contents =  <div className="formArch"><Input type="textarea" rows={4} value={this.state.content} onChange={this.contentChange.bind(this)}/></div>;
            btns = <div className="formArch btn-box" style={{ height:40 }}><input type="button" value="保存" onClick={this.onSave.bind(this)} className="change-btn"/><input type="button" value="取消" onClick={this.goBack.bind(this)} className="change-btn"/></div>
        }else if(model === 1){
            if(data === null || data === undefined){
                return null;
            }
            let editBtn;
            let btnBox = 'formArch btn-box print-btn';
            const finish = this.getFinish(archive);
            if(finish === 0){
                editBtn = <input type="button" className="change-btn" value="编辑" onClick={this.updateModel.bind(this)} />
                btnBox = 'formArch btn-box';
            }
            btns = <div className={btnBox} style={{ height:40 }}>{editBtn}<input type="button" onClick={this.getPrint.bind(this)} className="change-btn" value="打印" /></div>
            times = <div className="margin-word font-big">{getDateTime(investTime)}</div>;
            addresss =  <div className="margin-word font-big">{address}</div>;
            otherPersons =  <div className="margin-word font-big">{otherPerson}</div>;
            targetPersons =  <div className="margin-word font-big">{targetPerson}</div>;
            contents =  <DisputeCase rows={rows} content={content}/>;
            creatPerson = <div className="formArch"><div className="margin-form word-title name-style-left">调查人员</div><div className="margin-word font-big">{workerNames}</div></div>
            // sign = <div>
            //             <div className="formArch">被调查人签字：</div>
            //             <div className="formArch">调查人签字：</div>
            //         </div>
        }else{
            if(data === null || data === undefined){
                return null;
            }
            times = <TimeChoice name="investTime" onChange={this.timeChange.bind(this)} value={this.state.time} defaultValue={this.state.defaultTime}/>;
            addresss = <Input name="name" className="text-input"  style={{ width: 300 }} value={this.state.address} placeholder="" onChange={this.addressChange.bind(this)}/>
            otherPersons = <Input name="name" className="text-input"  style={{ width: 300 }} value={this.state.otherPerson} placeholder="" onChange={this.otherPersonChange.bind(this)}/>
            targetPersons = <Input name="name" className="text-input"  style={{ width: 300 }} value={this.state.targetPerson} placeholder="" onChange={this.targetPersonChange.bind(this)}/>
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.updateArchive.bind(this)} className="addPerson"/></div>
            creatPerson = <div className="formArch"><div className="margin-form word-title name-style-left">调查人员</div><input type="button" className="btn-pop" value="选择" onClick={this.upAddClick.bind(this)}/> {workerNames} </div>
            contents =  <div className="formArch"><Input type="textarea" rows={4} value={this.state.content} onChange={this.contentChange.bind(this)}/></div>;
        }
        return (
            <div>
                <div className="center-box">
                    <div className="top-left"></div>
                    <div className="top-right"></div>
                <div className="title-form-name print-hide" id={params.mid}>调查详情</div>
                <div className="title-form-name hidden print-show" id={params.mid}>人民调解调查记录</div>
                <div className="formArch"><sapn className="goback" onClick={this.goBack.bind(this)}>返回列表</sapn></div>
                    <div className="formBorder">
                        <div className="border-box">
                            <div className="formArch"><div className="margin-form word-title name-style-left">调查时间</div>{times}</div>
                            <div className="formArch"><div className="margin-form word-title name-style-left">调查地点</div>{addresss}</div>
                            <div className="formArch"><div className="margin-form word-title name-style-left">参加人员</div>{otherPersons}</div>
                            <div className="formArch"><div className="margin-form word-title name-style-left">被调查人</div>{targetPersons}</div>
                            {creatPerson}
                            <Pop title="选择调查人" visible={this.state.addBox} closeDoneHandler={()=>this.setState({addBox:false})}>
                                <PopMediator domain="workers" url={'api/archiveWorker/workers.json?aid='+id} name="workers" onChangeHandler={this.handleWorkersChange.bind(this)} value={workerValue}/>
                            </Pop>
                        </div>
                    <div className="formArch"><div className="margin-form word-title name-style-left">调查记录</div></div>
                    {contents}
                    {sign}
                    <div className="fixed-box"></div>
                </div>
                    <div className="bottom-left"></div>
                    <div className="bottom-right"></div>
                </div>
                {btns}
                <div className="fixed-box"></div>
                <PopAlert visible={this.state.msg!==''} title="消息提醒"  width={400} zIndex={1270} modalzIndex={1260} message={this.state.msg} closeDoneHandler={()=>this.setState({msg:""})}/>
                {next}
                <div className="bottom-position">
                    <div className="sign-margin">被调查人签字：</div>
                    <div className="sign-margin">记录人签字：</div>
                </div>
            </div>
        )
    }
}

Investigation.propTypes = {
    children: PropTypes.node
};

Investigation.contextTypes = {
    router: PropTypes.object
};

function	select(state)	{
    return	{
        archive:state.archive,
        investigationDetail:state.investigationDetail
    };
}

function actions(dispatch) {
    return {
        syncActions: bindActionCreators(syncActions, dispatch),
        actions: bindActionCreators(investDetailActions, dispatch),
    }
}

export  default connect(select,actions)(Investigation);
