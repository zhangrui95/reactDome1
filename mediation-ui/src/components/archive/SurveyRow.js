import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as syncActions from '../../actions/syncAction';
import {getDateTime} from '../../utils/date';

class SurveyRow extends Component {

    clickHandler(e){
        const { dataId,item} = this.props;
        const	{router}	=	this.context;
        router.push({
            pathname: '/archive/'+dataId+'/investigation/'+item.id,
            query:{ edit: true }
            // state: { fromDashboard: true }
        });
    }
    getDetail(e){
        const { dataId,item} = this.props;
        const	{router}	=	this.context;
        router.push('/archive/'+dataId+'/investigation/'+item.id);
    }
    getFinish(archive){
        const {response} = archive;
        const {data} = response||{};
        const {finishState} = data||{}
        return finishState;
    }
    render() {
        const {idx,item,archive} = this.props;
        let index = idx+1;
        let num = index>9?index:('0'+index);
        let updataBtn = '';
        let updataImg = '';
        const finish = this.getFinish(archive);
        if(finish === 0){
            updataBtn = <a onClick={this.clickHandler.bind(this)}>编辑</a>;
            updataImg = <span> | </span>;
        }
        return (<tr className="odd">
            <td width="40">{num}</td>
            <td width="160">
                <a className="ellipsis" href="javascript:;" onClick={this.getDetail.bind(this)}>{getDateTime(item.investTime)}</a>
            </td>
            <td className="ellipsis">{item.address}</td>
            <td className="ellipsis">{item.otherPerson}</td>
            <td className="ellipsis">{item.targetPerson}</td>
            <td className="ellipsis">{(item.workers||[]).map(i=>(i.worker||{}).name||'').join(',')}</td>
            <td>{updataBtn}</td>
        </tr>)
    }
}
// {updataImg}<a>打印</a>
SurveyRow.contextTypes = {
    router: PropTypes.object
};

function	select(state)	{
    return	{
        archive:state.archive
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export  default connect(select,actions)(SurveyRow);

