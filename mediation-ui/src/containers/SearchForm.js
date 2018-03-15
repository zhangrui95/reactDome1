import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {LIST_ENT_QUERY} from '../constants/ActionTypes'
import {request} from '../actions/syncAction'
import fromConfig from '../config/form'
import formFactory from '../components/form'

class SearchForm extends Component {

    constructor(props){
        super(props);
        this.state = {data:{},resetClass:'btn-reset'};
    }

    componentWillReceiveProps(next) {
        const newPath	=	this.getPathname(next);
        const oldPath	=	this.getPathname();
        if(oldPath != newPath){
            this.handleReset();
        }
    }

    getPathname(next){
        const {location}	=	next||this.props;
        return location.pathname;
    }

    handleChange(newData){
        this.setState({data:Object.assign(this.state.data,newData),resetClass:'btn-reset-red'})
    }

    handleSearch(){
        const {dataAction} = this.props;
        dataAction.request(LIST_ENT_QUERY,null,this.state.data)
    }

    handleReset(){
        const data = this.state.data;
        for(let i in data){
            data[i] = '';
        }
        this.setState({data,resetClass:'btn-reset'})
    }

    render(){
        const {params} = this.props;
        const option = fromConfig[params.list];
        if(option==null){
            return null;
        }
        const searchItems = option.items.map((item)=> {
            return formFactory(item.type,{key:item.name,option:item,data:this.state.data,onChange:this.handleChange.bind(this)});
        });
        return (
            <div className="search-body">
                {searchItems}
                <div className="search-content">
                    <div className="search-submit">
                            <input type="button" name="button" onClick={this.handleSearch.bind(this)} value="查询" className="btn-pop" />
                            <input type="reset" name="button" onClick={this.handleReset.bind(this)} value="重置" className={this.state.resetClass} />
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        dataAction:bindActionCreators({request}, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchForm)
