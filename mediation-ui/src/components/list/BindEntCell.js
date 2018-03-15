import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {ENT_BIND} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import * as enterpriseActions from '../../actions/enterprise'
import * as bannersActions from '../../actions/banners'
import * as navsActions from '../../actions/navs'
import Select from '../Select'

class BindEntCell extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {isSelect: false}
    };

    componentDidUpdate() {
        if(this.state.isSelect){
            this.refs.select.getWrappedInstance().focus();
        }else{
            const {actions,reload,enterprise,bannersActions,navsActions} = this.props;
            const {response,pid} = enterprise||{};
            const {result} = response||{};
            if(result== '1'){
                actions.reset();
                bannersActions.chgNum();
                navsActions.chgNum(pid == this.getUserId());
                if(reload){
                    reload();
                }
            }
        }
    }

    getUserId(){
        const {header} = this.props;
        const {user} = header||{};
        const {response} = user||{};
        const userObj = response.user;
        return (userObj||{}).id;
    }

    clickHandler(){
        this.setState({isSelect: true});
    }

    blurHandler(e){
        this.setState({isSelect: false});
        const val = e.target.value;
        if(val!=null&&val!=''){
            this.bindPeople(val);
        }
    }

    bindPeople(val){
        const	{syncActions,data}=this.props;
        syncActions.request(ENT_BIND,{pid:val},data.id,val);
    }

    render(){
        const {id,width,classes,name,domain,url} = this.props;
        let child = this.state.isSelect ?
            (<Select id={id} ref="select" url={url} domain={domain} onBlurHandler={this.blurHandler.bind(this)}/>) :
            (<a href='javascript:;' onClick={this.clickHandler.bind(this)}>{name}</a>);
        return (
            <td width={width} className={classes}>
                {child}
            </td>
        )
    }

}

BindEntCell.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    classes: PropTypes.oneOfType([PropTypes.object,PropTypes.string]),
    name: PropTypes.string,
    domain: PropTypes.string,
    url: PropTypes.string
};

function mapStateToProps(state) {
    return {
        enterprise: state.enterprise,
        header: state.header
    }
}

function mapDispatchToProps(dispatch) {
    return {
        navsActions: bindActionCreators(navsActions, dispatch),
        bannersActions: bindActionCreators(bannersActions, dispatch),
        syncActions: bindActionCreators(syncActions, dispatch),
        actions: bindActionCreators(enterpriseActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BindEntCell);