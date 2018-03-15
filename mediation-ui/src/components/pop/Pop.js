import React, { Component, PropTypes } from 'react'

const TYPE_CENTER = 'center';
const TYPE_TOP = 'top';

class Pop extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {visible:false,location:{top:'',left:''}};
        this.closeHandlers= props.closeHandlers;
        this.closeHandler= props.closeHandler;
        this.closeDoneHandler= props.closeDoneHandler;
        this.init = false;
        this.resizeHandler = this.resize.bind(this);
    };

    componentWillMount() {
        this.setVisible(this.props.visible);
        window.addEventListener('resize',this.resizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize',this.resizeHandler);
    }

    componentDidUpdate() {
        this.remeasure();
    }

    componentDidMount() {
        this.remeasure();
    }

    componentWillReceiveProps(next) {
        this.setVisible(next.visible);
        this.remeasure(true);
    }

    resize(){
        this.remeasure(true);
    }

    remeasure(force){
        if(!force&&this.init){
            return;
        }
        const panel = this.refs.panel;
        const popWidth = panel.offsetWidth;
        const popHeight = panel.offsetHeight;
        if(popWidth==0||popHeight==0){
            return;
        }
        const body = document.body;
        const winWidth = body.offsetWidth;
        const winHeight = body.offsetHeight;
        const {type} = this.props;
        if(type == TYPE_TOP){
            this.setState({location:{top:'50px',left:(winWidth-popWidth)/2+'px'}});
        }else{
            this.setState({location:{top:(winHeight-popHeight)/2+'px',left:(winWidth-popWidth)/2+'px'}}); 
        } 
        this.init = true;
    }

    toggle(){
        this.setVisible(!this.state.visible);
    }

    close(){
        this.setVisible(false);
    }

    pop(){
        this.setVisible(true);
    }

    setVisible(visible){
        this.setState({visible:visible});
    }

    static _doCloseHandler(handler,ele,attr) {
        let ret = true;
        if(handler!=null){
            ret = handler(ele,attr);
            ret = ret==null?true:ret;
        }
        return ret;
    }

    handlerClose(e){
        const ele = e.target;
        if(!ele.hasAttribute('data-close')){
            return;
        }
        const attr = ele.getAttribute('data-close');
        if(!Pop._doCloseHandler(this.closeHandler,ele,attr)){
            return;
        }
        const closeHandlers = this.closeHandlers;
        if(closeHandlers!=null){
            if(!Pop._doCloseHandler(closeHandlers[attr],ele,attr)){
                return;
            }
        }
        const closeDoneHandler = this.closeDoneHandler;
        if(closeDoneHandler!=null){
            closeDoneHandler();
        }
        this.setVisible(false);
    }

    render(){
        const {width,title,modal,children,zIndex,modalzIndex} = this.props;
        const modalDiv = modal ? <div className="pop-gray-bg" style={{zIndex:modalzIndex}}></div>:null;
        const {top,left} = this.state.location;
        const display = this.state.visible?'block':'none';
        let titleStyle = 'error-top';
        if(title==''){
            titleStyle = 'error-title-null';
        }
        return (
        <div style={{display}}>
            <div ref="panel" className="pop-error no-print" style={{width,top,left,zIndex}} onClick={this.handlerClose.bind(this)}>
                <div className={titleStyle} style={{width}}>
                    <div className="error-title">{title}</div>
                    <div className="cls"></div>
                </div>
                {children}
            </div>
            {modalDiv}
        </div>
        )
    }

}
// <div className="error-close" data-close="pop_cross"></div>
Pop.propTypes = {
    children: PropTypes.node,
    closeHandlers: PropTypes.object,
    closeHandler: PropTypes.func,
    closeDoneHandler: PropTypes.func,
    visible: PropTypes.bool,
    modal: PropTypes.bool,
    title: PropTypes.string,
    width: PropTypes.number,
    zIndex: PropTypes.number,
    modalzIndex: PropTypes.number,
    height: PropTypes.string,
    type: PropTypes.string
};

Pop.defaultProps = {
    visible:false,
    modal:true,
    title:'窗口',
    width:500,
    zIndex:1210,
    modalzIndex:1200,
    type:TYPE_CENTER
};

export default Pop;