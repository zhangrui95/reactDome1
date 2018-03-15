import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import merge from 'lodash/merge'
import {BANNER} from '../../constants/ActionTypes'
import bannerConfig from '../../config/banner'
import * as syncActions from '../../actions/syncAction';
import {getRoute,saveRoute} from '../../utils/routeHelper'
import bannersFactory from './';

const baseOption = {
    box:undefined,
    item:undefined,
    keys:{
        name:'name',
        color:'color',
        count:'count',
        icon:'iconUrl',
        isView:'isView',
        route:'route'
    }
};

const BANNER_ROUTE_CONFIG = {key:'banner',lv:1};

class Banner extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {current: 0};
        this.inited = false
    };

    componentDidMount() {
        const {params}	=	this.props;
        const key = params.list;
        this._loadBannerConfigByKey(key)
    }

    componentWillReceiveProps(next) {
        const {params}	=	next;
        const key = params.list;
        if(key!=this.key){
            this._loadBannerConfigByKey(key)
        }else if(!this.inited){
            const list = this.getList(next);
            if(list.length!=0){
                const init = getRoute(list,BANNER_ROUTE_CONFIG.key);
                if(init){
                    this.setState({current:init.idx})
                }
                this.inited = true;
            }
        }
    }

    _loadBannerConfigByKey(key) {
        const config = bannerConfig[key];
        if(config==null){
            this.option = null;
            console.error('can not found regist banner config '+key);
        }
        this.inited = false
        const option = merge({key},baseOption,config);
        this.key = key;
        const {actions}	=	this.props;
        actions.request(BANNER,{option});
    }

    handlerClick(e) {
        let li = e.target.parentNode;
        if (li.tagName == 'A') {
            li = li.parentNode;
        }
        const will = li.getAttribute('data-index');
        const routeUrl = li.getAttribute('data-route');
        if(will==null||will==''||routeUrl==null||routeUrl==''){
            return;
        }
        saveRoute(will*1,routeUrl,BANNER_ROUTE_CONFIG);
        this.setState({current: will * 1});
        const	{router}	=	this.context;
        router.push(routeUrl);
    }

    getList(next){
        const	{banners}	=	next||this.props;
        const	{response}	=	banners||{};
        const	{bannerList}	=	response||{};
        return (bannerList||[]);
    }

    render() {
        const {option} = this.props.banners;
        if(option==null){
            return null;
        }
        return bannersFactory(option.box,{handlerClick:this.handlerClick.bind(this)},this.getItems(option));
    }

    getItems(option){
        return this.getList().map((b, i)=> {
            return bannersFactory(option.item,{isActive:this.state.current==i,index:i,key:'ns_banners_'+i,data:b,keys:option.keys});
        });
    }

}

Banner.propTypes = {
    banners: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
Banner.contextTypes = {
    router: PropTypes.object
};
function mapStateToProps(state) {
    return {
        banners: state.banners || {}
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Banner)
