import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EvidenceCell from './EvidenceCell'
import {LIST_BY_ARCHIVE} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import {setHeaderClass,setFooterClass} from '../../utils/body'
import PopLoading from '../pop/PopLoading';
import PopAlertHtml from '../pop/PopAlertHtml';

class EvidenceList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {imgId:'',print:false,text:'',msg:''};
    }
    
    componentDidMount() {
        setHeaderClass('print-header-box');
        setFooterClass('print-bottom-box');
    }

    componentWillMount(){
        this.load();
    }

    load(){
        const {actions,params} = this.props;
        const {id} = params;
        actions.request(LIST_BY_ARCHIVE,{id});
    }

    static getArchiveData(archive){
        const {response} = archive;
        const {data} = response||{};
        return data
    }

    getPrint(e){
        this.setState({imgId:e.target.id,print:true});
    }

    imgLoad(){
        window.print();
        this.setState({imgId:'',print:false});
    }

    imgError(){
        this.setState({imgId:'',print:false,msg:'很抱歉，加载打印照片失败！'});
        return false;
    }
    
    render() {
        const { archive,evidence ,params} = this.props;
        const {id} = params;
        const {response} = evidence;
        const {data} = response||{};
        let imgId = this.state.imgId;
        let src = 'api/evidence/photo.json?id='+imgId;
        let imgBox = '';
        let text = this.state.text;
        if(imgId !== ''){
            imgBox = <div><div className="title-form-name hidden print-show">证据照片</div><div className="hidden print-show"><div className="formArch word-title">证据照片</div><img className="evid-img" onLoad={this.imgLoad.bind(this)} onError={this.imgError.bind(this)} src={src}/></div></div>
        }
        if(data === null || data === undefined){
            return null;
        }
        if(this.state.print){
            text = '加载中……';
        }
        return (
            <div>
                <div className="title-form-name print-hide">证据上传</div>
                {imgBox}
                <EvidenceCell getPrint={this.getPrint.bind(this)} dataId={id} archive={EvidenceList.getArchiveData(archive)} data={data} reload={this.load.bind(this)}/>
                <PopLoading visible={text!==''} title=""  width={400} zIndex={1270} modalzIndex={1260} load={text}/>
                <PopAlertHtml visible={this.state.msg!==''} title="消息提醒"  width={400} zIndex={1270} modalzIndex={1260} message={this.state.msg} closeDoneHandler={()=>this.setState({msg:""})}/>
            </div>
        )
    }
}

EvidenceList.propTypes = {
    children: PropTypes.node
};

function	select(state)	{
    return	{
        archive:state.archive,
        evidence:state.evidence
    };
}

function actions(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export  default connect(select,actions)(EvidenceList);
