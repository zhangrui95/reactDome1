import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as syncActions from '../../actions/syncAction';
import {getDateTime} from '../../utils/date';

class MediateRow extends Component {
    clickHandler(e){
        const { dataId,item} = this.props;
        const	{router}	=	this.context;
        router.push({
            pathname: '/archive/'+dataId+'/mediate/'+item.id,
            query:{ edit: true }
            // state: { fromDashboard: true }
        });
    }
    getDetail(e){
        const { dataId,item} = this.props;
        const	{router}	=	this.context;
        router.push('/archive/'+dataId+'/mediate/'+item.id);
    }
    getFinish(archive){
        const {response} = archive;
        const {data} = response||{};
        const {finishState} = data||{}
        return finishState;
    }
    render() {
        const {idx,item,litigants,workers,archive} = this.props;
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
                <a className="ellipsis" href="javascript:;" onClick={this.getDetail.bind(this)}>{getDateTime(item.mediateTime)}</a>
            </td>
            <td className="ellipsis med">{item.address}</td>
            <td className="ellipsis med">{litigants}</td>
            <td className="ellipsis med">{workers}</td>
            <td>{updataBtn}</td>
        </tr>)
    }
}
// {updataImg}<a>打印</a>
MediateRow.contextTypes = {
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

export  default connect(select,actions)(MediateRow);

