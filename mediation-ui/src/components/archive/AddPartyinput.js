import React, { Component, PropTypes } from 'react'
import PartyInput from './PartyInput'
import merge from 'lodash/merge'

class AddPartyinput extends Component {
    constructor(props) {
        super(props);
        const {onChange,data} = props;
        this.onChange = onChange;
        this.state = {datas:merge([],data||[{},{}])};
        this.count = 0;
    }

    updateDatas(data) {
        this.setState({datas:merge([],data||[{},{}])});
    }

    datas(){
        return this.state.datas.map((e, i) => {
            return this.refs['sub'+i].data();
        });
    }

    getAdd() {
        const datas = this.state.datas.map((e, i) => {
            return this.refs['sub'+i].data();
        });
        datas.push({idx:datas.length});
        const newData = merge([],datas)
        this.setState({datas:newData});
        if(this.onChange){
            this.onChange(newData);
        }
    }

    remove(item) {
        const {key,id} = item;
        const datas = this.state.datas.map((e, idx) => {
            return this.refs['sub'+idx].data();
        });
        const newData = datas.filter(i => i.key !== key)
        this.setState({datas:newData});
        if(this.onChange){
            this.onChange(newData,id);
        }
    }

    update(){
        const datas = this.state.datas.map((e, idx) => {
            return this.refs['sub'+idx].data();
        });
        this.setState({datas:merge([],datas)});
        if(this.onChange){
            this.onChange(this.state.datas);
        }
    }

    render() {
        const {model} = this.props;
        const {datas} = this.state;
        let length = datas.length;
        const tables = datas.sort((a,b)=>{
            const timeA = a.createTime ? a.createTime:a.time;
            const timeB = b.createTime ? b.createTime:b.time;
            if(timeA && timeB){
                return timeA-timeB;
            }else if(timeA){
                return -1;
            }else if(timeB){
                return 1;
            }else{
                return a.idx-b.idx;
            }
        }).map((it,i) =>{
            if(!it.key){
                let key = it.id;
                if(!key){
                    key = 'new_'+ (this.count++);
                }
                it.key = key
            }
            return <PartyInput ref={'sub'+i} key={it.key} model={model} length={length} item={it} idx={i} onRemove={this.remove.bind(this)}/>
        });
        let submitBtn;
        if(model !== 1){
            submitBtn = <div className="formArch" style={{ height:40 }}><input type="button" onClick={this.getAdd.bind(this)} value="添加当事人" className="addPerson"/></div>
        }
        return (
            <div onBlur={this.update.bind(this)}>
                {tables}
                {submitBtn}
            </div>
        )
    }
}

AddPartyinput.propTypes = {
    model: PropTypes.number,
    data: PropTypes.array,
    onChange: PropTypes.func
};


export default AddPartyinput