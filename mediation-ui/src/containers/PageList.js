import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import PageBar from '../components/PageBar'
import listConfig from '../config/list'
import List from '../components/list/List'
import {LIST_ENT,LIST_ENT_RELOAD} from '../constants/ActionTypes'
import * as syncActions from '../actions/syncAction';


const baseOption = {
    title:'',
    titleBtn:undefined,
    titleBtnUrl:undefined,
    limit:10,
    current:0,
    start:0,
    displayStart:0,
    displayEnd:0,
    total:1,
    count:0,
    url:undefined,
    init:true,
    displayTotalInHead:false,
    fillEmptyRow:false,
    columns:[]
};

let counter = 0;

class PageList extends Component {

    constructor(props, context) {
        super(props, context);
        let id = props.id;
        if(id==null||id==''){
            id = 'ns_pagelist_'+counter;
            counter++;
        }
        this.id = id;
    };

    componentDidMount() {
        const {params}	=	this.props;
        const key = params.list;
        this._loadListConfigByKey(key)
    }

    componentWillReceiveProps(next) {
        const {params}	=	next;
        const key = params.list;
        if(key!=this.key){
            this._loadListConfigByKey(key)
        }
    }

    _loadListConfigByKey(key){
        const config = listConfig[key];
        if(config==null){
            console.error('can not found regist list config '+key);
        }
        this.option = Object.assign({},baseOption,config);
        this.key = key;
        this.page(1);
    }

    reload(){
        // this.props.actions.reload();
        this.props.actions.request(LIST_ENT_RELOAD);
    }

    page(page,forceLoad){
        if(this.checkErrPage(page)|| (!forceLoad && page==this.option.current)){
            return
        }
        const {actions}	=	this.props;
        const option = this.option;
        option.current = page;
        option.start = (option.current-1) * option.limit;
        actions.request(LIST_ENT,{option});
    }

    checkErrPage(page){
        return page<1||page>this.option.total;
    }

    pageInputHandler (e) {
        var page = e.target.value;
        page = page==null||page==''?1:page*1;
        if(page<1||page>this.option.total||page==this.option.current){
            return false;
        }
        this.page(page)
    }

    pageLinkHandler (e) {
        var target = e.target;
        var page = target.getAttribute('data-page');
        if(page==null||page==''){
            return false;
        }
        this.page(page);
        return false;
    }

    titleBtnHandler(){
        const option = this.option;
        if(option===null || option === undefined){
            return null;
        }
        const routeUrl = option.titleBtnUrl;
        if(routeUrl===null || routeUrl === undefined || routeUrl === ''){
            return null;
        }
        const	{router}	=	this.context;
        router.push(routeUrl);
    }

    render(){
        const response = this.props.lists.response||{};
        const data = response.data||[];
        const extra = response.extra||{};
        const option = this.option;
        if(option===null || option === undefined){
            return null;
        }
        const title = option.title + (option.displayTotalInHead ? ('('+option.count+')'):'');
        const titleBtn = option.titleBtn;
        const titleBtnUrl = option.titleBtnUrl;
        let titleBtnDiv;
        if(titleBtn !== null && titleBtn !== undefined && titleBtn !== '' && titleBtnUrl !== null && titleBtnUrl !== undefined){
            titleBtnDiv = <div className="list-right"  onClick={this.titleBtnHandler.bind(this)}>{titleBtn}</div>
        }
        return (
            <div className="rightpagebox">
                <div className="list-top">
                    <div className="list-left">{title}</div>
                    {titleBtnDiv}
                </div>
                <div className="widget-table">
                    <List id={this.id+'_list'} data={data} extra={extra} reload={this.reload.bind(this)} start={option.start} limit={option.limit} fillEmptyRow={option.fillEmptyRow} columns={option.columns}/>
                </div>
                <PageBar option={option} pageLinkHandler={this.pageLinkHandler.bind(this)} pageInputHandler={this.pageInputHandler.bind(this)}/>
            </div>
        )
    }
    
}

PageList.propTypes = {
    lists: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    id: PropTypes.string
};

PageList.contextTypes = {
    router: PropTypes.object
};

function	mapStateToProps(state)	{
    return	{
        lists:state.lists||{}
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PageList);