import React, { Component, PropTypes } from 'react'
import Select from '../Select'
import {getPathVal} from '../../utils/data'

class BindActionBox extends Component {
    constructor(props, context) {
        super(props, context);
    };

    value(){
        return this.refs.user.getWrappedInstance().value();
    }

    render() {
        const {id,data,domain,url} = this.props;
        return (
            <div className='error-center'>
                <div className="error-height"></div>
                <div className='select-news'><span className="select-news-left">企业名称：</span><span className="data-name-news">{getPathVal(data,'name')}</span></div>
                <div className='select-news'><span className="select-news-left">企业类型：</span>{getPathVal(data,'enterpriseType.name')}</div>
                <div className='select-news'><span className="select-news-left">行政区划：</span>{getPathVal(data,'area.name')}</div>
                <div className='select-news-search'>
                    <span className="select-news-left">监管负责人：</span>
                    <Select ref="user" id={id} url={url} domain={domain} value={getPathVal(data,'supervise.superviseResponsible.id')} head="请选择"/>
                </div>
                <div className="pop-submit pop-mar-submit">
                    <input type="button" name="button" value="保存"  className="btn-pop" data-close="save"/>
                    <input type="button" name="button" value="取消"  className="btn-reset" data-close="pop_cross"/> 
                </div>
                <div className="error-height"></div>
            </div>
        )
    } 
}
BindActionBox.propTypes = {
    data: PropTypes.object,
    domain: PropTypes.string,
    url: PropTypes.string,
    option: PropTypes.object
};

export default BindActionBox;
