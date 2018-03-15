import React, { Component, PropTypes } from 'react'
import SurveyRow from './SurveyRow';

class SurveyList extends Component {

    render() {
        const {data, dataId} = this.props;
        const arr = data.map((e,i) => {
            return <SurveyRow key={i} dataId={dataId} idx={i} item={e}/>;
        });
        return (
            <table cellPadding="0" cellSpacing="0" className="table-list">
                <thead>
                <tr className="table-list-head">
                    <td>序号</td>
                    <td>调查时间</td>
                    <td>调查地点</td>
                    <td>参加人</td>
                    <td>被调查人</td>
                    <td>调查人</td>
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

export default SurveyList
