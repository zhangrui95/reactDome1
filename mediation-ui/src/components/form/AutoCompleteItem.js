import React, { Component, PropTypes } from 'react'
import { AutoComplete } from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {SELECT_DATA} from '../../constants/ActionTypes'
import * as syncActions from '../../actions/syncAction'

class AutoCompleteItem extends Component{

    constructor(props){
        super(props);
        this.state = {datas:[],value:''}
    }

    componentWillMount() {
        this.setState({value:this.props.value});
    }

    componentWillReceiveProps(next) {
        const	{selectItemData,option}=next;
        const	{name}=option;
        const domainData =(selectItemData||{})[name];
        var value = next.value;
        this.setState({value: value,datas:value==''?[]:domainData});
    }

    loadSelect(value){
        const	{actions,option}=this.props;
        const	{dataUrl,name}=option;
        if(dataUrl==null||dataUrl==''||name==null||name==''){
            return;
        }
        actions.request(SELECT_DATA,{domain:name},dataUrl+'?name='+value);
    }

    handleChange(value){
        if(value!=''){
            this.loadSelect(value);
        }
        const {option,onChange} = this.props;
        onChange({[option.name]:value});
    }

    render(){
        const {option,data} = this.props;
        //text-input
        // <input type="text" className="text-input" value={data[option.name]} onChange={this.handleChange.bind(this)}/>
        return(
            <div className="search-content">
                <div className="new-search-style">
                    <div className="search-title search-name">{option.label}：</div>
                    <div className="search-text">
                        <AutoComplete dataSource={this.state.datas} style={{ width: 565 }} value={data[option.name]} onChange={this.handleChange.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }
}

AutoCompleteItem.propTypes = {
    option: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
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

export default connect(mapStateToProps,mapDispatchToProps)(AutoCompleteItem);