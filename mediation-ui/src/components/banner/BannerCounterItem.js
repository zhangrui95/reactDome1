import React, { Component, PropTypes } from 'react'

const defaults = {
    from: 0,               // the number the element should start at
    to: 0,                 // the number the element should end at
    speed: 1000,           // how long it should take to count between the target numbers
    refreshInterval: 100,  // how often the element should be updated
    decimals: 0           // the number of decimal places to show
};

function formatter(value, options) {
    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
}

class BannerCounterItem extends Component {

    constructor(props, context) {
        super(props, context);
        this.formatter = props.formatter == null ? formatter:props.formatter;
        const {data,keys} = props;
        const option = Object.assign({},defaults,{to:data[keys.count]*1});
        const loops = Math.ceil(option.speed / option.refreshInterval);
        this.increment = (option.to - option.from) / loops;
        this.option = option;
        this.state = {current:option.from}
    };

    componentDidMount() {
        const {to,refreshInterval} = this.option;
        if(this.state.current<to){
            this.interval = setInterval(this.updateCount.bind(this),refreshInterval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    updateCount(){
        const {to} = this.option;
        const next = this.increment + this.state.current;
        this.setState({current:next>=to?to:next});
        if(next>=to){
            clearInterval(this.interval)
        }
    }

    renderCount(){
        return this.formatter(this.state.current,this.option);
    }

    render(){
        const {data,keys} = this.props;
        return (
            <div className="counter col_fourth">
                <h2 className="timer count-title">{this.renderCount()}</h2>
                <p className="count-text ">{data[keys.name]}</p>
            </div>
        )
    }

}

BannerCounterItem.propTypes = {
    keys: PropTypes.object,
    data: PropTypes.object,
    formatter: PropTypes.func
};

export default BannerCounterItem;