import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {ARCHIVE_ADD,ARCHIVE_UPDATE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction';
import * as arhciveActions from '../../actions/arhcive';
import {getDateTime,getDate} from '../../utils/date';
import {cardValid} from './RegularValidator';
import { Input } from 'antd';
import Select from '../Select'
import Pop from '../pop/Pop';
import PopMediator from './PopMediator'
import AddPartyinput from './AddPartyinput'
import merge from 'lodash/merge'
import PopAlertHtml from '../pop/PopAlertHtml';
import PopLoading from '../pop/PopLoading';
import DisputeCase from './DisputeCase';
import PageContent from './PageContent';
import PageProContent from './PageProContent'
import PageCheckContent from './PageCheckContent';
import {setHeaderClass,setFooterClass} from '../../utils/body'

class ArchiveDetail extends Component {
    constructor(props, context) {
        super(props, context);
        const { params,archive,header} = props;
        const {id} = params;
        const {response} = archive;
        const {data} = response || {};
        this.state = {addBox:false,model: id !== null && id !== undefined && id !== '' ? 1 : 0,data:merge({},ArchiveDetail.data2state(data||{},header)),msg:'',workersName:ArchiveDetail.getWorkersName(data),load:''};
    }

    componentDidMount() {
        setHeaderClass('print-header-box');
        setFooterClass('print-bottom-box');
    }

    componentWillReceiveProps(next) {
        const {actions} = this.props;
        const {archive,header} = next;
        const {response,action,actionResponse} = archive;
        if(action === 'add' && response) {
            const {state, data} = response || {};
            if (state === 0) {
                const	{router}	=	this.context;
                router.replace('/archive/'+data.id);
                this.setState({model:1,data:merge({},ArchiveDetail.data2state(data,header)),workersName:ArchiveDetail.getWorkersName(data)});
            }
            actions.resetAction();
        }else if(action === 'update' && actionResponse){
            const {state,data} = actionResponse || {};
            if (state === 0) {
                this.setState({model:1,data:merge({},ArchiveDetail.data2state(data,header)),workersName:ArchiveDetail.getWorkersName(data)});
            }
            actions.resetAction(data);
        }else if(response){
            if(!this.state.data.id){
                const {data} = response || {};
                this.setState({data:merge({},ArchiveDetail.data2state(data||{},header)),workersName:ArchiveDetail.getWorkersName(data)});
            }
        }
    }

    static getUser(header){
        return header.user ? header.user.response.user.id : null;
    }

    static data2state(data, header){
        let mid = (data.manager || {}).id;
        if(!mid){
            mid = ArchiveDetail.getUser(header)
        }
        return {id:data.id,name:data.name,type:{id:(data.type||{}).id},state:data.state,
            manager:{id:mid},content:data.content,
            workerIds:ArchiveDetail.getWorkersValue(data),litigants:ArchiveDetail.getLitigants(data),litigantsDel:''};
    }

    upAddClick(){
        this.setState({addBox:true});
    }

    getData(){
        this.state.data.litigants = [];
        return merge({},this.state.data,{litigants:this.refs.litigants.datas()})
    }

    addNewArchive(){
        const data = this.getData();
        if(!this.validate(data)){
            return
        }
        const {syncActions} = this.props;
        syncActions.request(ARCHIVE_ADD,null,data);
    }

    updateArchive(){
        const data = this.getData();
        if(!this.validate(data)){
            return
        }
        const {syncActions} = this.props;
        syncActions.request(ARCHIVE_UPDATE,null,data);
    }

    updateModel(){
        this.refs.litigants.updateDatas(this.state.data.litigants);
        this.setState({model:2});
        this.node.scrollIntoView();
    }

    handleChange(name){
        return (e) =>{
            let newData;
            if(name.indexOf('.') !== -1){
                const names = name.split('.');
                newData = {[names[0]]:{[names[1]]:e.target.value}};
            }else{
                newData = {[name]:e.target.value};
            }
            this.setState({data: merge({},this.state.data,newData)});
        }
    }

    handleManageChange(e){
        const id = e.target.value;
        const {options,selectedIndex} = e.target;
        const name = options[selectedIndex].text;
        const workersName = (this.state.workersName||'').split(',').filter(i=>i!==name).join(',');
        const workerIds = (this.state.data.workerIds||'').split(',').filter(i=>i!==id).join(',');
        const newData = {manager:{id},workerIds};
        this.setState({data: merge({},this.state.data,newData),workersName});
    }

    handleWorkersChange(e,value, name){
        this.setState({data: merge({},this.state.data,{workerIds:value.join(',')}),workersName:name.join(',')});
    }

    handleLitigantChange(datas,delId){
        this.state.data.litigants = [];
        let litigantsDel = this.state.data.litigantsDel||'';
        if(delId && delId !== ''){
            litigantsDel += delId+',';
        }
        this.setState({data: merge({},this.state.data,{litigants:datas,litigantsDel})});
    }

    getPrint(){
        window.print();
    }

    static validateLitigants(item, idx){
        const errs = [];
        let value = item.card;
        if(!cardValid(value)){
            errs.push('身份证号码不能正确');
        };
        let contact = item.contact;
        let phone =  /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
        if(phone.test(contact)==false){
            errs.push('联系方式不能正确');
        };
        if(!item.name || item.name === ''){
            errs.push('姓名不能为空');
        }
        if(!item.card || item.card === ''){
            errs.push('身份证号码不能为空');
        }
        if(!item.sex || item.sex === ''){
            errs.push('性别不能为空');
        }
        if(!item.nation || item.nation === ''){
            errs.push('民族不能为空');
        }
        if(!item.age || item.age === '' || item.age < 1){
            errs.push('年龄不能为空或小于1');
        }
        if(!item.address || item.address === ''){
            errs.push('单位或住址不能为空');
        }
        if(!item.contact || item.contact === ''){
            errs.push('联系方式不能为空');
        }
        return errs.length === 0 ?'':('当事人'+(idx+1)+':有'+errs.length+'处错误');
    }

    validate(data){
        if(!data.name || data.name === ''){
            this.setState({msg:'卷宗名称不能为空'});
            return false;
        }
        if(!data.type || !data.type.id || data.type.id === ''){
            this.setState({msg:'请选择卷宗类别'});
            return false;
        }
        if(!data.content || data.content === ''){
            this.setState({msg:'纠纷简要情况不能为空'});
            return false;
        }
        if(!data.manager || !data.manager.id || data.manager.id === ''){
            this.setState({msg:'请选择调解员'});
            return false;
        }
        if(!data.litigants || data.litigants.length < 2){
            this.setState({msg:'当事人不能小于2'});
            return false;
        }
        if(data.content.length > 1000){
            this.setState({msg:'纠纷简要情况字数不能超过1000字'});
            return false;
        }
        const litigants = (data.litigants||[]).map((it,i)=> ArchiveDetail.validateLitigants(it,i)).filter(i=>i!=='').join('<br/>');
        if(litigants !== ''){
            this.setState({msg:litigants});
            return false;
        }
        return true;
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

    static getLitigant(data,idx){
        return {id:data.id,name:data.name,card:data.card,sex:data.sex,nation:data.nation,age:data.age,address:data.address,contact:data.contact,time:data.createTime,idx};
    }

    static getLitigants(data){
        let litigants = [{idx:0},{idx:1}];
        if(data && data.litigants){
            litigants = (data.litigants||[]).map((i,idx)=>ArchiveDetail.getLitigant(i||{},idx));
        }
        return litigants;
    }

    static getTitle(archive){
        let text = '';
        const {response} = archive;
        const {data} = response||{};
        const {state} = data||{};
        switch(state)
        {
            case -1:
                text = '调解失败';
                break;
            case 0:
                text = '未完成';
                break;
            case 1:
                text = '调解成功';
                break;
            case 2:
                text = '调解中止';
                break;
            default:
        }
        return {state:text};
    }

    getProContent(response){
        const {protocol} = response||{};
        const {content} = protocol||{};
        return content;
    }

    getCheckContent(response){
        const {check} = response||{};
        const {content} = check||{};
        return content;
    }

    renderByData(data,readData) {
        const { archive,header } = this.props;
        const {model} = this.state;
        const {response,action} = archive;
        const {state,protocol,check} = response||{};
        const {code} = protocol||{};
        const {content,litigants} = data||{};
        const title = ArchiveDetail.getTitle(archive);
        let proContent = this.getProContent(response);
        let checkContent = this.getCheckContent(response);
        let proof = '';
        if(code !== null||code !== undefined||code !== ''){
            proof = <span><span className='reference-number'>文号</span><span className="font-big font-margin-top">{code}</span></span>
        }
        let name;
        let type;
        let contents;
        let creater;
        let createTime = '';
        let keepTime = '';
        let protoTime = '';
        let protoText = '';
        let checkText = '';
        let failTime = '';
        let litigantsName = '';
        let workersName = '';
        let workers = '';
        let litigant = '';
        let manager = '';
        let btns;
        let loading = this.state.load;
        if(action === null||action === ''||action === undefined){
            loading = '';
        }else{
            loading = '保存中……';
        }
        let length = (litigants||[]).length;
        const pageRows = 44;
        const topRows = 7;
        let num = pageRows - topRows - 4*length;
        let nextPage;
        if(num < 0){
            nextPage = (<div><div className="page-next"></div><div className="page-fixed-height"></div></div>);
            num =  0;
        }
        const {rows,rowNum} = PageContent.getRows(content,num);
        let lastRows = (rowNum + topRows + 4*length)%44;
        let proNum = pageRows - lastRows - 6;
        let next;
        let nexts;
        if(lastRows >= 38){
            next = (<div><div className="page-next"></div><div className="page-fixed-height"></div></div>);
        }else{
            if(lastRows + 6 > 41){
                nexts = (<div><div className="page-next"></div><div className="page-fixed-height"></div></div>);
            }
        }
        const {rowsPro,rowProNum} = PageProContent.getProCont(proContent,proNum);
        let lastRowPro = (rowNum + topRows + 4*length + rowProNum + 6)%44;
        let remarkRows = pageRows - lastRowPro - 3;
        let nextPages;
        if(lastRowPro >= 41){
            nextPages = (<div><div className="page-next"></div><div className="page-fixed-height"></div></div>);
        }
        const {rowsCheck,rowCheckNum} = PageCheckContent.getCheckCont(checkContent,remarkRows);
        let lastRowCheck = (rowNum + topRows + 4*(length-2) + rowProNum + rowCheckNum + 6)%44;
        let nextPageCheck;
        if(lastRowCheck >= 40){
            nextPageCheck = (<div><div className="page-next"></div><div className="page-fixed-height"></div></div>);
        }
        if(model === 0){
            if(!header.user){
                return null;
            }
            name = <Input name="name" className="text-input" style={{ width: 635 }} placeholder="" value={data.name}  onChange={this.handleChange('name').bind(this)} maxLength={50}/>
            type = <Select name="type" domain="type.id" url="api/archiveType/options.json" head="请选择" value={(data.type||{}).id} onChangeHandler={this.handleChange('type.id').bind(this)} />
            contents = <div className="formArch"><Input name="content" type="textarea" rows={4} value={content} onChange={this.handleChange('content').bind(this)}/></div>
            manager = <Select domain="manager.id" url="api/user/listByRole.json?role=2" head="请选择" value={(data.manager||{}).id} onChangeHandler={this.handleManageChange.bind(this)}/>
            workersName = this.state.workersName;
            workers = <input className="btn-pop" onClick={this.upAddClick.bind(this)} type="button" value="选择"/>
            litigant = <AddPartyinput ref="litigants" model={model} data={litigants}  onChange={this.handleLitigantChange.bind(this)}/>
            creater = header.user.response.user.name;
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.addNewArchive.bind(this)} className="addPerson"/></div>
        }else if(model === 1){
            if(state !== 0){
                return null;
            }
            name = <div className="font-margin font-big">{data.name}</div>;
            type = <div className="font-margin font-big">{data.type.name}</div>;
            contents = <DisputeCase rows={rows} content={content}/>;
            manager = data.manager.name;
            if(data.workers){
                workers = data.workers.map((i)=>i.worker.name).join(',');
            }
            litigant = <AddPartyinput ref="litigants" model={model} data={litigants} onChange={this.handleLitigantChange.bind(this)}/>
            createTime = getDateTime(data.createTime);
            keepTime = getDateTime(data.keepTime);
            if(protocol){
                protoTime = getDateTime(protocol.createTime);
                if(data.state === -1){
                    failTime = protoTime;
                }
                protoText = <div><PageProContent rowsPro={rowsPro} isPrint={true}/><PageProContent content={proContent} isPrint={false}/></div>;
            }
            if(check){
                checkText = <div><PageCheckContent rowsCheck={rowsCheck} isPrint={true}/><PageCheckContent content={checkContent} isPrint={false}/></div>;
            }
            litigantsName = (litigants||[]).map((i)=>i.name).join(',');
            creater = data.creater.name;
            let editBtn;
            let btnBox = 'formArch btn-box print-btn';
            if(data.finishState === 0){
                editBtn = <input type="button" className="change-btn" value="编辑" onClick={this.updateModel.bind(this)} />
                btnBox = 'formArch btn-box';
            }
            btns = <div className={btnBox} style={{ height:40 }}>{editBtn}<input type="button" onClick={this.getPrint.bind(this)} className="change-btn" value="打印" /></div>
        }else{
            if(state !== 0){
                return null;
            }
            name = <Input name="name" className="text-input" style={{ width: 635 }} placeholder="" value={data.name}  onChange={this.handleChange('name').bind(this)} maxLength={50}/>
            type = <Select domain="type.id" url="api/archiveType/options.json" head="请选择" value={(data.type||{}).id} onChangeHandler={this.handleChange('type.id').bind(this)} />
            contents = <div className="formArch"><Input name="content" type="textarea" rows={4} value={content} onChange={this.handleChange('content').bind(this)}/></div>
            manager = <Select domain="manager.id" url="api/user/listByRole.json?role=2" head="请选择" value={(data.manager||{}).id} onChangeHandler={this.handleManageChange.bind(this)}/>
            workersName = this.state.workersName;
            workers = <input className="btn-pop" onClick={this.upAddClick.bind(this)} type="button" value="选择"/>
            litigant = <AddPartyinput ref="litigants" model={model} data={litigants} onChange={this.handleLitigantChange.bind(this)}/>
            createTime = getDateTime(readData.createTime);
            keepTime = getDateTime(readData.keepTime);
            if(protocol){
                protoTime = getDateTime(protocol.createTime);
                if(readData.state === -1){
                    failTime = protoTime;
                }
                protoText = protocol.content;
            }
            if(check){
                checkText = check.content
            }
            litigantsName = (litigants||[]).map((i)=>i.name).join(',');
            creater = readData.creater.name;
            btns = <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.updateArchive.bind(this)} className="addPerson"/></div>
        }
        let workerValue = [];
        if(data.workerIds){
            workerValue = data.workerIds.split(',');
        }
        let wordNum = '';
        if(data.result !== -1){
            wordNum = <div className="word-num hidden print-show">{proof}</div>;
        }
        return (
            <div ref={node => this.node = node}>
                <div className="center-box">
                    <div className="top-left"></div>
                    <div className="top-right"></div>
                    <div className="title-form-name">人民调解登记表</div>
                    <div className="formBorder">
                        <div className="border-box no-print">
                            <div className="formArch">
                                <div><span className='word-title name-style-left null-margin'>卷宗名称</span>{name}</div>
                            </div>
                        </div>
                        <div className="border-box">
                            <div className="formArch">
                                <div><span className='word-title name-style-left null-margin'>卷宗类别</span>{type}</div>
                                {wordNum}
                            </div>
                        </div>
                        <div className="border-box">
                            <div className="formArch word-title">当事人</div>
                            {litigant}
                        </div>
                        {nextPage}
                        <div className="border-box">
                            <div className="formArch word-title">纠纷简要情况</div>
                            {contents}
                        </div>
                        <div className="border-box no-print">
                            <div className="formArch word-title">调解员</div>
                            <div className="formArch">
                                <div className="margin-form font-big">第一调解员：{manager}</div>
                            </div>
                            <div className="formArch">
                                <div className="margin-form font-big">第二调解员：{workers} {workersName}
                                    <Pop title="添加调解员" visible={this.state.addBox} closeDoneHandler={()=>this.setState({addBox:false})}>
                                        <PopMediator domain="manager.id" url="api/user/listByRole.json?role=2" name="workers" filter={(data.manager||{}).id} onChangeHandler={this.handleWorkersChange.bind(this)} value={workerValue}/>
                                    </Pop>
                                </div>
                            </div>
                        </div>
                        <div className="formArch no-print"><span className="word-title find-style-left">立卷人</span><span className="left-news">{creater}</span></div>
                        <div className="formArch no-print"><span className="word-title find-style-left">立卷时间</span><span className="left-news">{createTime}</span></div>
                        <div className="formArch no-print"><span className="word-title find-style-left">调解日期</span><span className="left-news">{protoTime}</span></div>
                        <div className="formArch no-print"><span className="word-title find-style-left">保管期限</span><span className="left-news">{keepTime}</span></div>
                        {next}
                        <div className="formArch"><span className="word-title find-style-left">达成协议时间</span><span className="left-news print-hide">{protoTime}</span></div>
                        <div className="formArch content-indent first-line hidden print-show">{protoTime}</div>
                        <div className="formArch hidden print-show"><span className="word-title find-style-left">调解结果</span></div>
                        <div className="formArch hidden print-show"><div className="content-indent first-line">{title.state}</div></div>
                        {nexts}
                        <div className="formArch"><span className="word-title find-style-left">调解协议</span><span className="left-news print-hide">{protoText}</span></div>
                        <div className="hidden print-show">{protoText}</div>
                        {nextPages}
                        <div className="formArch"><span className="word-title find-style-left">协议履行情况</span><span className="left-news print-hide">{checkText}</span></div>
                        <div className="hidden print-show">{checkText}</div>
                        <div className="formArch no-print"><span className="word-title find-style-left">调解失败时间</span><span className="left-news">{failTime}</span></div>
                        <div className="formArch no-print"><span className="word-title find-style-left">当事人姓名</span><span className="left-news">{litigantsName}</span></div>
                        <div className="formArch no-print"><span className="word-title find-style-left">登记人</span><span className="left-news">{creater}</span></div>
                        <div className="formArch no-print"><span className="word-title find-style-left">登记日期</span><span className="left-news">{createTime}</span></div>
                    </div>
                    <div className="bottom-left"></div>
                    <div className="bottom-right"></div>
                </div>
                {btns}
                <div className="fixed-box"></div>
                <PopAlertHtml visible={this.state.msg!==''} title="消息提醒"  width={400} zIndex={1270} modalzIndex={1260} message={this.state.msg} closeDoneHandler={()=>this.setState({msg:""})}/>
                <PopLoading visible={loading!==''} title=""  width={400} zIndex={1270} modalzIndex={1260} load={loading}/>
                {nextPageCheck}
                <div className="bottom-position">
                    <div className="sign-margin">登记人签字：</div>
                    <div className="time-right">{getDate(data.createTime)}</div>
                </div>
            </div>
        )
    }

    render() {
        const { archive } = this.props;
        const {response} = archive;
        const readData = (response||{}).data;
        const {model} = this.state;
        let data;
        if(model === 1){
            data = readData;
        }else{
            data = this.state.data;
        }
        return this.renderByData(data,readData)
    }
}

ArchiveDetail.propTypes = {
    children: PropTypes.node
};

ArchiveDetail.contextTypes = {
    router: PropTypes.object
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
export  default connect(select,actions)(ArchiveDetail);
