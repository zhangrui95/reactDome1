import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {EVIDENCE_DELETE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction';
import {getDateTime} from '../../utils/date';
import PopConfirm from '../pop/PopConfirm'

class EvidenceRow extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {msg:''};
    }

    static getHumanSize(size){
        if(size < 1024){
            return size +' B'
        }
        if(size < 1024*1024){
            return Math.round(size/1024) +' K'
        }
        return Math.round(size/1024/1024) +' M'
    }

    componentWillReceiveProps(next) {
        const {evidenceDelete} = next;
        const {response} = evidenceDelete;
        const {state} = response || {};
        if (state === 0) {
            const {reload} = this.props;
            if(reload){
                reload();
            }
        }
    }

    download(){
        const {data} = this.props;
        window.open('api/evidence/download.json?id='+data.id)
    }

    deleteEvidence(){
        this.setState({msg:'确定删除该条数据？'});
        return false;
    }
    confirmOperation(){
        const {syncActions,data} = this.props;
        syncActions.request(EVIDENCE_DELETE,{id:data.id});
    }
    

    static getArchiveData(archive){
        const {response} = archive;
        const {data} = response||{};
        return data
    }

    render() {
        const {archive,data,type,idx,header,getPrint} = this.props;
        if(!header.user || !archive.response){
            return null;
        }
        let printImgPre;
        let printImgAction;
        let previewPreWidth = 230;
        let pop = <PopConfirm visible={this.state.msg!==''} title="消息提醒"  width={400} zIndex={1270} modalzIndex={1260} information={this.state.msg}  onOk={this.confirmOperation.bind(this)}  closeDoneHandler={()=>this.setState({msg:""})}/>;
        if(type===0){
            printImgPre = <span> | </span>
            printImgAction = <a id={data.id} onClick={getPrint}>打印</a>
        }
        let deleteImgPre;
        let deleteImgAction;
        if(EvidenceRow.getArchiveData(archive).finishState === 0 && data.creater.id === header.user.response.user.id){
            deleteImgPre = <span> | </span>
            deleteImgAction = <a onClick={this.deleteEvidence.bind(this)}>删除</a>
        }
        let num = idx>9?idx:('0'+idx);
        return (<tr className="odd">
            <td width="40">{num}</td>
            <td className="line" width={previewPreWidth}>{data.name}</td>
            <td>{EvidenceRow.getHumanSize(data.size)}</td>
            <td>{getDateTime(data.createTime)}</td>
            <td>{data.creater.name}</td>
            <td><a onClick={this.download.bind(this)}>下载</a>{deleteImgPre}{deleteImgAction}{printImgPre}{printImgAction}{pop}</td>
        </tr>)
    }
}

EvidenceRow.propTypes = {
    data: PropTypes.object.isRequired,
    type: PropTypes.number.isRequired,
    idx: PropTypes.number.isRequired,
    reload: PropTypes.func
};

EvidenceRow.contextTypes = {
    router: PropTypes.object
};

function	select(state)	{
    return	{
        header:state.header,
        archive:state.archive,
        evidenceDelete:state.evidenceDelete
    };
}

function actions(dispatch) {
    return {
        syncActions: bindActionCreators(syncActions, dispatch)
    }
}
export  default connect(select,actions)(EvidenceRow);