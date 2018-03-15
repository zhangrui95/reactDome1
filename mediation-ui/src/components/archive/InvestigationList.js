import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import  SurveyList from './SurveyList'
import {INVESTIGATION_LIST} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import {IMG_NO_DATA,IMG_Loading_URL} from '../../constants/Constant';

class InvestigationList extends Component {
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
        actions.request(INVESTIGATION_LIST,{id});
    }

    clickHandler(e){
        const { params } = this.props;
        const {id} = params;
        if(id !==null && id !== undefined && id!== ''){
            const	{router}	=	this.context;
            router.push('/archive/'+id+'/investigation/create');
        }
    }

    getFinish(archive){
        const {response} = archive;
        const {data} = response||{};
        const {finishState} = data||{}
        return finishState;
    }
    render() {
        const { investigation,params,archive} = this.props;
        const {id} = params;
        const {response} = investigation;
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
                    btns = <div className="empty-btn" onClick={this.clickHandler.bind(this)}>新建调查记录</div>;
                    list = <div className="formBorder gray-border">
                        <img className="list-left empty-img" src={IMG_NO_DATA}/>
                        {btns}
                    </div>
                }else{
                    btns = <div className="list-right" onClick={this.clickHandler.bind(this)}>新建调查记录</div>;
                    list = <div className="formBorder gray-border">
                        <div className="form-title-margin"><div className="list-top"><div className="list-left">调查记录列表</div>{btns}</div></div>
                        <SurveyList dataId={id}  data={data}/>
                    </div>
                }
            }else{
                if(data === null||data === undefined||data.length === 0){
                    list = <div className="formBorder gray-border">
                        <img className="list-left load-img" src={IMG_NO_DATA}/>
                    </div>
                }else{
                    list = <div className="formBorder gray-border">
                        <div className="form-title-margin"><div className="list-top"><div className="list-left">调查记录列表</div></div></div>
                        <SurveyList dataId={id}  data={data}/>
                    </div>
                }
            }


        }
        return (
            <div>
                <div className="title-form-name">人民调解调查记录</div>
                {list}
            </div>
        )
    }
}

InvestigationList.propTypes = {
    children: PropTypes.node
};

InvestigationList.contextTypes = {
    router: PropTypes.object
};

function	select(state)	{
    return	{
        archive:state.archive,
        investigation:state.investigation
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export  default connect(select,actions)(InvestigationList);

