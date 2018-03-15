import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {SELECT_DATA} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'
import { Checkbox } from 'antd';

class PopMediator extends Component {

    constructor(props, context) {
        super(props, context);
        const {onChangeHandler} = props;
        this.onChangeHandler = onChangeHandler;
        this.state = {value:[]};
    };

    componentWillMount() {
        this.setState({value:this.props.value});
    }

    componentDidMount(){
        this.loadSelect();
    }

    componentWillReceiveProps(next) {
        this.setState({value:next.value});
    }

    loadSelect(){
        const	{actions,url,domain}=this.props;
        if(url===null||url===undefined||url===''||domain===null||domain===undefined||domain===''){
            return;
        }
        actions.request(SELECT_DATA,{domain},url);
    }

    value(){
        return this.state.value;
    }

    name(value){
        const {selectItemData,textKey,valueKey,domain,data} = this.props;
        const domainData =(selectItemData||{})[domain]||data;
        return (domainData||[]).map(i=>value.indexOf(i[valueKey]) === -1 ? '' : i[textKey]).filter(i=>i!=='');
    }

    handleChange(e){
        const value =  this.state.value;
        if(e.target.checked){
            if(value.indexOf(e.target.value) === -1 || value.length === 0){
                value.push(e.target.value);
                this.setState({value:Object.assign([],value)});
            }
        }else{
            if(value.indexOf(e.target.value) !== -1){
                const value2 = value.filter((i)=>i !== e.target.value);
                this.setState({value: Object.assign([],value2)});
            }
        }
    }

    onOk(e){
        if(this.onChangeHandler){
            const value =  this.state.value;
            this.onChangeHandler(e, value,this.name(value));
        }
    }

    getOptions(){
        const {id,selectItemData,textKey,valueKey,domain,data,name,filter} = this.props;
        const domainData =(selectItemData||{})[domain]||data;
        let options;
        if(domainData!==null && domainData !== undefined){
            options = domainData.filter(v=>v[valueKey] !== filter).map((value,index)=>{
                return <div key={id+'_select_cell_'+index} className="formArch"><Checkbox
                    onChange={this.handleChange.bind(this)} name={name+'['+index+'].id'}
                    checked={this.state.value.indexOf(value[valueKey]) !== -1}
                    value={value[valueKey]}>{value[textKey]}</Checkbox></div>
            })
        }
        return options;
    }
    render() {
        return (
            <div >
                {this.getOptions()}
                <div className="pop-submit">
                    <input type="button" name="button" data-close="save" value="保存"  className="btn-pop" onClick={this.onOk.bind(this)}/>
                    <input type="button" name="button" value="取消"  className="btn-reset" data-close="pop_cross"/>
                </div>
                <div className="error-height"></div>
            </div>
        )
    }
}

PopMediator.propTypes = {
    filter: PropTypes.string,
    value: PropTypes.array,
    url: PropTypes.string,
    domain: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.array,
    textKey: PropTypes.string,
    valueKey: PropTypes.string,
    showHead: PropTypes.bool,
    head: PropTypes.string,
    onChangeHandler: PropTypes.func
};

PopMediator.defaultProps = {
    showHead:true,
    value:[],
    textKey:'name',
    head:'全部',
    valueKey:'id'
};

function mapStateToProps(state) {
    return {
        selectItemData: state.selectItemData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(syncActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps,null,{withRef:true})(PopMediator);