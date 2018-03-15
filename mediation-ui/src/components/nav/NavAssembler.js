import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as syncActions from '../../actions/syncAction';
import {getRoute,saveRoute} from '../../utils/routeHelper'
import NavBox from './NavBox';
import NavItem from './NavItem';
import {NAV_LIST} from '../../constants/ActionTypes'

const NAV_ROUTE_CONFIG = {key:'nav',lv:0};

class Nav extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {current:0};
        this.inited = false
    };

    componentWillMount(){
        const	{actions}	=	this.props;
        actions.request(NAV_LIST);
    }

    // componentWillReceiveProps(next) {
    //     if(!this.inited){
    //         const list = this.getList(next);
    //         if(list.length!=0){
    //             let routeUrl = list[0].route;
    //             const init = getRoute(list,NAV_ROUTE_CONFIG.key);
    //             if(init){
    //                 routeUrl = init.route;
    //                 this.setState({current:init.idx})
    //             }
    //             const	{router}	=	this.context;
    //             router.push(routeUrl);
    //             this.inited = true;
    //         }
    //     }
    // }

    handlerClick(e){
        const li = e.target;
        const will = li.getAttribute('data-index');
        const routeUrl = li.getAttribute('data-route');
        if(will==null||will==''||routeUrl==null||routeUrl==''){
            return;
        }
        this.setState({current:will*1});
        saveRoute(will*1,routeUrl,NAV_ROUTE_CONFIG);
        const	{router}	=	this.context;
        router.push(routeUrl);
    }

    render(){
        return (<NavBox handlerClick={this.handlerClick.bind(this)}>{this.getItems()}</NavBox>);
    }

    getList(next){
        const	{navs}	=	next||this.props;
        const	{response}	=	navs||{};
        const	{navList}	=	response||{};
        return (navList||[]);
    }

    getItems() {
        return this.getList().map((item, i)=> {
            return <NavItem  key={'nav_item'+i} className={this.state.current==i?'clicked':''} index={i} data={item}/>
        });
    }

}

Nav.contextTypes = {
    router: PropTypes.object
};

Nav.propTypes = {
    navs: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function	select(state)	{
    return	{
        navs:state.navs||{}
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export default connect(select,actions)(Nav)