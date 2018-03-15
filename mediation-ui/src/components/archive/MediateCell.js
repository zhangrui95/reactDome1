import React, { Component, PropTypes } from 'react'
import MediateRow from './MediateRow';

class MediateCell extends Component {
    render() {
        const {data,litigants,workers,dataId} = this.props;
        const arr = data.map((e,i) => {
            return <MediateRow key={i} dataId={dataId} idx={i} item={e} litigants={litigants} workers={workers}/>;
        });
        return (
            <table cellPadding="0" cellSpacing="0" className="table-list">
                <thead>
                    <tr className="table-list-head">
                        <td>序号</td>
                        <td>调解时间</td>
                        <td>调解地点</td>
                        <td>当事人</td>
                        <td>调解人</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                {arr}
                </tbody>
            </table>
        )
    }
}

export default MediateCell
