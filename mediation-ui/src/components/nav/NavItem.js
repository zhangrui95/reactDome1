import React, { Component, PropTypes } from 'react'

const NAV_VIEW_DIS = '0';

class NavItem extends Component {

    render(){
        const {className,index,data} = this.props;
        let countNum;
        if (data.isView === NAV_VIEW_DIS) {
            countNum = NavItem.getItemSub(data);
        }
        return (
            <li className={className} data-index={index} data-route={data.route}>
                {data.name}
                {countNum}
            </li>
        )
    }


    static getItemSub(item) {
        let count = item.count;
        count = count==null?0:count*1;
        return <div className={NavItem.getItemSubClassName(item)}>{count}</div>;
    }

    static getItemSubClassName(item) {
        return 'noticetip-'+item.color + ' noticetip-up noticetip-up-text';
    }
}

NavItem.propTypes = {
    data: PropTypes.object,
    className: PropTypes.string,
    index: PropTypes.number
};

export default NavItem;