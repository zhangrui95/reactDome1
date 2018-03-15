import React, { Component, PropTypes } from 'react'

class PageBar extends Component {

    constructor(props, context) {
        super(props, context);
        this.pageLinkHandler = props.pageLinkHandler;
        this.pageInputHandler = props.pageInputHandler;
        const {option} = props;
        const {current} = option||{};
        this.state = {pageNo:current*1}
    };

    componentWillReceiveProps(next) {
        const {option} = next;
        const {current} = option||{};
        this.setState({pageNo:current*1});
    }

    keyPressHandler(e){
        if('Enter'==e.key){
            this.pageInputHandler(e);
        }
    }
    
    changeHandler(e){
        var page = e.target.value;
        if(page==null||page==''){
            this.setState({pageNo:''});
        }else if(/^\d*$/.test(page)){
            page = page*1;
            const {option} = this.props;
            if(page<1||page>option.total){
                return false;
            }
            this.setState({pageNo:page});
        }
        // this.pageInputHandler(e);
    }

    render(){
        const {option} = this.props;
        return (
            <div className="pageturning">
                <div className="page-lift">当前显示 {option.displayStart+'-'+option.displayEnd} 条记录/共 {option.count} 条记录</div>
                <div className="page-right" onClick={this.pageLinkHandler}>
                    <a data-page="1" href="javascript:void(0);">首页</a>&nbsp;
                    <a data-page={option.current-1} href="javascript:void(0);">上一页</a>&nbsp;| 第&nbsp;
                    <input type="text" size="6" maxLength="6" value={this.state.pageNo} onKeyPress={this.keyPressHandler.bind(this)} onChange={this.changeHandler.bind(this)}/>&nbsp;页 共{option.total}页 |&nbsp;
                    <a data-page={option.current-0+1} href="javascript:void(0);">下一页</a>&nbsp;
                    <a data-page={option.total} href="javascript:void(0);">尾页</a>
                    </div>
                <div className="cls"></div>
            </div>
        )
    }

}

PageBar.propTypes = {
    option: PropTypes.object.isRequired,
    pageLinkHandler: PropTypes.func.isRequired,
    pageInputHandler: PropTypes.func.isRequired
};

export default PageBar;