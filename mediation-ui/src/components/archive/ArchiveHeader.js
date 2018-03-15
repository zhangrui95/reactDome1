import React, { Component, PropTypes } from 'react'
import HeaderTop from "./HeaderTop";
import {GO_BACK_URL} from '../../constants/Constant';
const msg=[
    {
        'route':'',
        'name':'登记表',
        'index': 0,
    },
    {
        'route':'/evidence',
        'name':'证据上传',
        'index': 1,
    },
    {
        'route':'/applyFor',
        'name':'申请书',
        'index': 2,
    },
    {
        'route':'/investigation',
        'name':'调查记录',
        'index': 3,
    },
    {
        'route':'/mediate',
        'name':'调解记录',
        'index': 4,
    },
    {
        'route':'/protocol',
        'name':'协议书',
        'index': 5,
    },
    {
        'route':'/checkVisit',
        'name':'回访记录',
        'index': 6,
    },
    {
        'route':'/finish',
        'name':'结案',
        'index': 7,
    },

];
class ArchiveHeader extends Component {
    constructor(props, context) {
        super(props, context);
        const { params } = props;
        const {id} = params;
        let add = 'add';
        if(id !==null && id !== undefined && id!== ''){
            add = '';
        }
        this.state = {index:this.findIndex(props),add};
    }
    componentWillReceiveProps(next) {
        const { params } = next;
        const {id} = params;
        let add = 'add';
        if(id !==null && id !== undefined && id!== ''){
            add = '';
        }
        const index = this.findIndex(next);
        if(this.state.index !== index || this.state.add !== add ){
            this.setState({index,add});
        }
    }
    clickHandler(e){
        const { params } = this.props;
        const {id} = params;
        if(id !==null && id !== undefined && id!== ''){
            const div = e.target;
            const routeUrl = div.getAttribute('data-route')||'';
            if(routeUrl === null || routeUrl === undefined){
                return
            }
            const index = div.getAttribute('data-index')*1;
            this.setState({index});
            const	{router}	=	this.context;
            router.push('/archive/'+id+routeUrl);
        }
    }
    goBack(){
        const	{router}	=	this.context;
        router.push('/list/archive');
    }
    findIndex(props){
        const { params,location} = props;
        const {id,mid} = params;
        const { basename,pathname } = location;
        if(id !==null && id !== undefined && id!== ''){
            const prefix = basename === '/' ? '':'/';
            const midPath = mid && mid !== '' ? ('/'+mid):'';
            const idx = msg.findIndex((i)=>{
                return pathname === (prefix+'archive/'+id+i.route+midPath)
            });
            return idx === -1 ? 0: idx;
        }
        return 0;
    }
    static getTitle(archive){
        const {response} = archive;
        const {data} = response||{};
        if(data === null || data === undefined){
            return {name:'创建新案件',state:'',colorFont : 'color-red name-left-font',headline:''};
        }
        const {name,state} = data||{};
        let colorFont = '';
        let text = '';
        let headline = '卷宗名称：';
        switch(state)
        {
            case -1:
                text = '(调解失败)';
                colorFont = 'color-gray name-left-font';
                break;
            case 0:
                text = '(未完成)';
                colorFont = 'color-red name-left-font';
                break;
            case 1:
                text = '(调解成功)';
                colorFont = 'color-blue name-left-font';
                break;
            case 2:
                text = '(调解中止)';
                colorFont = 'color-grays name-left-font';
                break;
            default:
        }
        return {name,state:text,colorFont,headline};
    }

    render() {
        const list = msg.map((data,i)=>{
            return <HeaderTop key={i} isActive={i===this.state.index} add={this.state.add} data={data}/>
        });
        const {archive} = this.props;
        const title = ArchiveHeader.getTitle(archive);
        return (
            <div className="no-print">
                <div className="name-style">
                    <div className="name-left">{title.headline}{title.name}<span className={title.colorFont}>{title.state}</span></div>
                    <div className="name-right"><a className="go-first" onClick={this.goBack.bind(this)}><img className="go-back-img" src={GO_BACK_URL}/> 返回首页</a></div>
                </div>
                <div className="archeader-box" onClick={this.clickHandler.bind(this)} >
                    {list}
                </div>
            </div>
        )
    }
}
// <a className="go-first" onClick={this.goBack.bind(this)}>&lt;&lt;返回首页</a>
ArchiveHeader.propTypes = {
    children: PropTypes.node
};

ArchiveHeader.contextTypes = {
    router: PropTypes.object
};

export default ArchiveHeader
