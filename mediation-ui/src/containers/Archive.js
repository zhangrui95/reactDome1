import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {ARCHIVE_DETAIL} from '../constants/ActionTypes'
import * as syncActions from '../actions/syncAction';
import * as arhciveActions from '../actions/arhcive';
import ArchiveHeader from './../components/archive/ArchiveHeader'
import PageHeader from '../components/archive/PageHeader';
import PageFooter from '../components/archive/PageFooter';
import {setHeaderClass,setFooterClass} from '../utils/body'

class Archive extends Component {

    componentDidMount() {
        setHeaderClass('print-header-box');
        setFooterClass('print-bottom-box');
    }

    constructor(props, context) {
        super(props, context);
    };

    componentWillMount(){
        const {actions,syncActions,params} = this.props;
        const {id} = params;
        if(id !== null && id !== undefined && id !== ''){
            syncActions.request(ARCHIVE_DETAIL,{id});
        }else {
            actions.reset();
        }
    }

    render() {
        const { children } = this.props;
        return (
            <div id="mainright">
                <PageHeader/>
                <ArchiveHeader {...this.props}/>
                { children }
                <PageFooter/>
            </div>
        )
    }
}

Archive.propTypes = {
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
export  default connect(select,actions)(Archive);
