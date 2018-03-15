import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {ARCHIVE_UPDATE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction';
import * as arhciveActions from '../../actions/arhcive';
import {getDateTime,getDate} from '../../utils/date';
import PartyCell from './PartyCell';
import TimeChoice from './TimeChoice';
import DisputeCase from './DisputeCase';
import PageContent from './PageContent';
import PopAlert from '../pop/PopAlert';
import {setHeaderClass,setFooterClass} from '../../utils/body'

class ApplyFor extends Component {

    constructor(props, context) {
        super(props, context);
        const { archive} = props;
        const {response} = archive;
        const {data} = response||{};
        const {applyTime} = data||{};
        this.state = {model: applyTime?1:0,applyTime:getDateTime(applyTime),defaultTime:getDateTime(new Date().getTime()),msg:''};
    }

    componentDidMount() {
        setHeaderClass('print-header-box');
        setFooterClass('print-bottom-box');
    }

    componentWillReceiveProps(next) {
        const {actions} = this.props;
        const {archive} = next;
        const {action,actionResponse,response} = archive;
        if(action === 'update' && actionResponse){
            const {state,data} = actionResponse || {};
            const {applyTime} = data||{};
            if (state === 0) {
                this.setState({model:1,applyTime:getDateTime(applyTime),defaultTime:getDateTime(new Date().getTime())});
            }
            actions.resetAction(actionResponse.data);
        }else if(response){
            const {data} = response||{};
            const {applyTime} = data||{};
            this.setState({model:applyTime?1:0,applyTime:getDateTime(applyTime)});
        }
    }

    onChangeHandler(date){
        this.setState(date)
    }

    saveApply(){
        const {syncActions,params} = this.props;
        const {id} = params;
        if(id !== null && id !== undefined && id !== ''){
            const applyTime = this.state.applyTime;
            syncActions.request(ARCHIVE_UPDATE,null,{id,applyTime:applyTime===''?this.state.defaultTime:applyTime});
        }
    }

    updateModel(){
        const { archive} = this.props;
        const {response} = archive;
        const {data} = response||{};
        const {applyTime} = data||{};
        this.setState({model:2,applyTime:getDateTime(applyTime),defaultTime:getDateTime(new Date().getTime())});
    }

    getLitigants(){
        const { archive } = this.props;
        const {response} = archive;
        const {data} = response||{};
        const {litigants} = data||{};
        return litigants||[];
    }

    getPrint(){
        window.print();
    }

    render() {
        const { archive} = this.props;
        const {response} = archive;
        const {data} = response||{};
        const {applyTime,content} = data||{};
        const model = this.state.model;
        let btns = '';
        let time = '';
        if(model === 0){
            btns =  <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.saveApply.bind(this)} className="addPerson"/></div>
            time = <div className="formArch">
                <div className="margin-form"><span className="word-title">申请时间：</span></div><TimeChoice name="applyTime" hide={0} onChange={this.onChangeHandler.bind(this)} value={this.state.applyTime}  defaultValue={this.state.defaultTime}/>
            </div>
        }else if(model === 1){
            let editBtn;
            let btnBox = 'formArch btn-box print-btn';
            if(data && data.finishState === 0){
                editBtn = <input type="button" className="change-btn" value="编辑" onClick={this.updateModel.bind(this)} />
                btnBox = 'formArch btn-box';
            }
            btns = <div className={btnBox} style={{ height:40 }}>{editBtn}<input className="change-btn"  onClick={this.getPrint.bind(this)} type="button" value="打印" /></div>
            time = <div className="formArch no-margin" >
                        <div className="apply-name">申请人签字：</div>
                        <div className="time-right">
                            {getDate(applyTime)}
                        </div>
                    </div>;
        }else{
            btns =  <div className="formArch" style={{ height:40 }}><input type="button" value="保存" onClick={this.saveApply.bind(this)} className="addPerson"/></div>
            time = <div className="formArch">
                <div className="margin-form"><span className="word-title">申请时间：</span></div><TimeChoice name="applyTime" hide={0} onChange={this.onChangeHandler.bind(this)} value={this.state.applyTime}  defaultValue={this.state.defaultTime}/>
            </div>
        }
        let length = this.getLitigants().length;
        const pageRows = 44;
        const topRows = 4;
        let num = pageRows - topRows - 4*length;
        let nextPage;
        if(num < 0){
            nextPage = (<div><div className="page-next"></div></div>);
            num =  0;
        }
        const {rows,rowNum} = PageContent.getRows(content,num);
        let lastRows = (rowNum + topRows + 4*length)%44;
        let next;
        if(lastRows >= 40){
            next = (<div><div className="page-next"></div><div className="page-fixed-height"></div></div>);
        }
        return (
            <div className="min-height">
                <div className="center-box">
                    <div className="top-left"></div>
                    <div className="top-right"></div>
                <div className="title-form-name">人民调解申请书</div>
                <div className="formBorder">
                    <div className="fixed-box"></div>
                        <div className="border-box">
                            <div className="formArch word-title">当事人</div>
                            <PartyCell litigants={this.getLitigants()}/>
                        </div>
                        {nextPage}
                        <div className="border-box">
                            <div className="formArch word-title">纠纷简要情况</div>
                            <DisputeCase rows={rows} content={content}/>
                        </div>
                    <div className="bottom-hide">
                        <div className="formArch font-weight-word">人民调解委员会已将申请人民调解的相关规定告知我，现自愿申请人民调解委员会进行调解。</div>
                        {time}
                    </div>
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
                    <div className="formArch font-weight-word font-news no-margin">人民调解委员会已将申请人民调解的相关规定告知我，现自愿申请人民调解委员会进行调解。</div>
                    {time}
                </div>
            </div>
        )
    }
}

ApplyFor.propTypes = {
    children: PropTypes.node
};

function	select(state)	{
    return	{
        archive:state.archive
    };
}

function actions(dispatch) {
    return {
        syncActions: bindActionCreators(syncActions, dispatch),
        actions: bindActionCreators(arhciveActions, dispatch)
    }
}
export  default connect(select,actions)(ApplyFor);
