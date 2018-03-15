import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {SELECT_DATA} from '../constants/ActionTypes'
import * as syncActions from '../actions/syncAction'

class Select extends Component {

    constructor(props, context) {
        super(props, context);
        const {onChangeHandler,onBlurHandler} = props;
        this.onChangeHandler = onChangeHandler;
        this.onBlurHandler = onBlurHandler;
        this.state = {value:''};
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
        const	{actions,selectItemData,url,domain}=this.props;
        if(url==null||url==''||domain==null||domain==''){
            return;
        }
        const domainData =(selectItemData||{})[domain];
        if(domainData==null){
            actions.request(SELECT_DATA,{domain},url);
        }
    }

    focus(){
        this.refs.select.focus();
    }

    value(){
        return this.state.value;
    }

    handleChange(e){
        this.setState({value:e.target.value});
        if(this.onChangeHandler){
            this.onChangeHandler(e);
        }
    }

    getHeadOpt(){
        const {id,showHead,head} = this.props;
        let headOpt;
        if(showHead){
            headOpt = <option key={id+'_select_cell_head'} value="">{head}</option>
        }
        return headOpt;
    }

    getOptions(){
        const {id,selectItemData,textKey,valueKey,domain,data} = this.props;
        const domainData =(selectItemData||{})[domain]||data;
        let options;
        if(domainData!=null){
            options = domainData.map((value,index)=>{
                return <option key={id+'_select_cell_'+index} value={value[valueKey]}>{value[textKey]}</option>
            })
        }
        return options;
    }

    render(){
        const {name,className,disabled} = this.props;
        return (
            <select ref="select" name={name} className={className} value={this.state.value} onChange={this.handleChange.bind(this)} disabled={disabled} onBlur={this.onBlurHandler}>
                {this.getHeadOpt()}
                {this.getOptions()}
            </select>
        )
    }

}

Select.propTypes = {
    value: PropTypes.string,
    url: PropTypes.string,
    domain: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.array,
    textKey: PropTypes.string,
    valueKey: PropTypes.string,
    showHead: PropTypes.bool,
    head: PropTypes.string,
    className: PropTypes.string,
    onChangeHandler: PropTypes.func,
    onBlurHandler: PropTypes.func,
    disabled:PropTypes.string
};

Select.defaultProps = {
    showHead:true,
    value:'',
    textKey:'name',
    className:'text-select',
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

export default connect(mapStateToProps,mapDispatchToProps,null,{withRef:true})(Select);