import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import  MediateCell from './MediateCell'
import {MEDIATE_LIST} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import {IMG_NO_DATA,IMG_Loading_URL} from '../../constants/Constant';

class MediateList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {load:''};
    }

    componentWillReceiveProps(next) {
        if(next){
            this.setState({load:false});
        }
    }

    componentWillMount(){
        this.setState({load:true});
        this.load();
    }

    load(){
        const {actions,params} = this.props;
        const {id} = params;
        actions.request(MEDIATE_LIST,{id});
    }

    clickHandler(e){
        const { params } = this.props;
        const {id} = params;
        if(id !==null && id !== undefined && id!== ''){
            const	{router}	=	this.context;
            router.push('/archive/'+id+'/mediate/create');
        }
    }
    getLitigants(archive){
        const {response} = archive;
        const {data} = response||{};
        const {litigants}= data||{};
        return (litigants||[]).map((i)=>i.name).join(',');
    }
    getWorkers(archive){
        const {response} = archive;
        const {data} = response||{};
        const {workers,manager}= data||{};
        let wnames = (workers||[]).map((i)=>(i.worker||{}).name||'').join(',');
        if(wnames !== ''){
            wnames = ','+wnames;
        }
        return ((manager||{}).name||'')+wnames;
    }
    getFinish(archive){
        const {response} = archive;
        const {data} = response||{};
        const {finishState} = data||{}
        return finishState;
    }
    render() {
        const { mediate,params,archive} = this.props;
        const {id} = params;
        const {response} = mediate;
        const {data} = response||{};
        let loading = this.state.load;
        let list = '';
        let btns = '';
        if(loading == true){
            list = <div className="formBorder gray-border">
                        <img className="list-left load-img" src={IMG_Loading_URL}/>
                    </div>
        }else{
            const finish = this.getFinish(archive);
            if(finish === 0){
                if(data === null||data === undefined||data.length === 0){
                    btns = <div className="empty-btn" onClick={this.clickHandler.bind(this)}>新建调解记录</div>;
                    list = <div className="formBorder gray-border">
                        <img className="list-left empty-img" src={IMG_NO_DATA}/>
                        {btns}
                    </div>
                }else{
                    btns = <div className="list-right" onClick={this.clickHandler.bind(this)}>新建调解记录</div>;
                    list = <div className="formBorder gray-border">
                        <div className="form-title-margin">
                            <div className="list-top"><div className="list-left">调解记录列表</div>{btns}</div>
                        </div>
                        <MediateCell dataId={id} data={data} litigants={this.getLitigants(archive)} workers={this.getWorkers(archive)}/>
                    </div>
                }
            }else{
                if(data === null||data === undefined||data.length === 0){
                    list = <div className="formBorder gray-border">
                        <img className="list-left load-img" src={IMG_NO_DATA}/>
                    </div>
                }else{
                    list = <div className="formBorder gray-border">
                        <div className="form-title-margin">
                            <div className="list-top"><div className="list-left">调解记录列表</div></div>
                        </div>
                        <MediateCell dataId={id} data={data} litigants={this.getLitigants(archive)} workers={this.getWorkers(archive)}/>
                    </div>
                }
            }
        }
        return (
            <div>
                <div className="title-form-name">人民调解记录</div>
                {list}
            </div>
        )
    }
}

MediateList.propTypes = {
    children: PropTypes.node
};

MediateList.contextTypes = {
    router: PropTypes.object
};

function	select(state)	{
    return	{
        mediate:state.mediate,
        archive:state.archive
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export  default connect(select,actions)(MediateList);