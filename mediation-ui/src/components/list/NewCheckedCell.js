import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {ENT_BIND} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import * as enterpriseActions from '../../actions/enterprise'
import * as bannersActions from '../../actions/banners'
import * as navsActions from '../../actions/navs'
import {getPathVal} from '../../utils/data'
import Pop from '../pop/Pop'
import PopConfirm from '../pop/PopConfirm'
import BindActionBox from './BindActionBox'
import PopAlert from '../pop/PopAlert';

class NewCheckedCell extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {pop:false,msg:'',Confirmoperation:false};
    };

    componentWillReceiveProps(next) {
        const {actions,reload,enterprise,bannersActions,navsActions} = next;
        const {response,pid,old,error} = enterprise||{};
        const {result} = response||{};
        if(result== '1'){
            actions.reset();
            const userId = this.getUserId();
            if(old == null ){
                bannersActions.chgNum();
                navsActions.chgNum(pid == userId);
            }else{
                navsActions.chgNum(pid == userId,old == userId,true);
            }
            if(reload){
                reload();
            }
            this.setState({pop:false});
        }else if(result!=null||error!=null){
            actions.reset();
            // alert('保存失败');
            this.saveFailedPop(); 
        }
    }

    headClicked(){
        this.setState({pop:true});
    }

    bindPeople(val){
        const	{syncActions,data}=this.props;
        const old = getPathVal(data,'supervise.superviseResponsible.id');
        if(old != val){
            syncActions.request(ENT_BIND,{pid:val,old},data.id,val);
        }else{
            this.setState({pop:false});
        }
    }

    getUserId(){
        const {header} = this.props;
        const {user} = header||{};
        const {response} = user||{};
        const userObj = response.user;
        return (userObj||{}).id;
    }

    confirmOperation(){
        const val = this.refs.binBox.value();
        this.bindPeople(val);
    }

    saveButtonClick(){
        const val = this.refs.binBox.value();
        if(val!=null&&val!=''){
            this.confirmPop();
        }else{
            // alert('监管负责人不能为空');
            this.banEmptypop();
        }
        return false;
    }
    msgReset(){
        this.setState({msg:""});
    }
    banEmptypop(){
        this.setState({msg:"监管负责人不能为空！"});
    }
    confirmPop(){
        this.setState({Confirmoperation:true});
    }
    saveFailedPop(){
        this.setState({msg:"保存失败！"});
    }
    opeRation(){
        this.setState({Confirmoperation:false});
    }
    
    render(){
        const {width,classes} = this.props;
        return (
            <td width={width} className={classes}>
                <a href='javascript:;' onClick={this.headClicked.bind(this)}>分配企业监管负责人</a>
                <Pop visible={this.state.pop} title="分配企业监管负责人" closeHandlers={{save:this.saveButtonClick.bind(this)}} closeDoneHandler={()=> this.setState({pop:false})}>
                    <BindActionBox ref="binBox" {...this.props}/>
                </Pop>
                <PopConfirm visible={this.state.Confirmoperation} title="消息提醒" width={400} zIndex={1250} modalzIndex={1240} information="确认当前操作？" onOk={this.confirmOperation.bind(this)}  closeDoneHandler={this.opeRation.bind(this)}/>
                <PopAlert visible={this.state.msg!=''} title="消息提醒"  width={400} zIndex={1270} modalzIndex={1260} message={this.state.msg} closeDoneHandler={this.msgReset.bind(this)}/>
            </td>
        )
    }

}

NewCheckedCell.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    classes: PropTypes.oneOfType([PropTypes.object,PropTypes.string]),
    data: PropTypes.object,
    domain: PropTypes.string,
    url: PropTypes.string,
    option: PropTypes.object,
    onChange: PropTypes.func
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

export default connect(mapStateToProps,mapDispatchToProps)(NewCheckedCell);

