import React,{Component,PropTypes} from 'react'
import Select from '../Select'

class SelectItem extends Component{

    handleChange(e){
        const {option,onChange} = this.props;
        onChange({[option.name]:e.target.value});
    }

    render(){
        const {option,data} = this.props;
        return(
                <div className="new-search-style">
                    <div className="search-title">{option.label}：</div>
                    <div className="search-select">
                        <Select domain={option.name} url={option.dataUrl} head={option.head} value={data[option.name]} data={option.data} onChangeHandler={this.handleChange.bind(this)} />
                    </div>
                </div>
        )
    }
}

SelectItem.propTypes = {
    option: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SelectItem;
