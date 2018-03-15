import React, { Component, PropTypes } from 'react'

const BANNER_VIEW_DIS = '0';

class BannerImgItem extends Component {

    render(){
        const {index,data,keys} = this.props;
        let numView;
        if (data[keys.isView] === BANNER_VIEW_DIS) {//是否显示个数
            numView = BannerImgItem.getItemSub(data,keys);
        }
        return (
            <div className={this.getItemClass()} data-index={index}  data-route={data.route}>
                {numView}
                {BannerImgItem.getIconLink(data,keys)}
                {BannerImgItem.getNameLink(data,keys)}
            </div>
        )
    }

    getItemClass(){
        const {isActive} = this.props;
        let className = 't1-ly';
        if(isActive){
            className += ' t1_bg2';
        }
        return className;
    }

    static getIconLink(data, keys){
        const route = data[keys.route];
        return route==null ? <img src={data[keys.icon]} width="20" height="20"/> : <a><img src={data[keys.icon]} width="20" height="20"/></a>
    }

    static getNameLink(data, keys){
        const route = data[keys.route];
        return route==null ? data[keys.name] : <a>{data[keys.name]}</a>
    }

    static getItemSub(data,keys) {
        let count = data[keys.count];
        count = count==null?0:count*1;
        return <div className={BannerImgItem.getItemSubClassName(data,keys)}>{count}</div>;
    }

    static getItemSubClassName(data,keys) {
        return 'noticetip-'+data[keys.color] + ' noticetip-up noticetip-up-img';
    }
}

BannerImgItem.propTypes = {
    isActive: PropTypes.bool,
    keys: PropTypes.object,
    data: PropTypes.object,
    className: PropTypes.string,
    index: PropTypes.number
};

export default BannerImgItem;