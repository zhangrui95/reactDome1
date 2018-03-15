/**
 * Created by Administrator on 2017/7/10 0010.
 */
import React, { Component, PropTypes } from 'react'
import PageContent from './PageContent'

class DisputeCase extends Component {
    render() {
        const {rows,content} = this.props;
        return (
            <div className="formArch content-indent"><PageContent rows={rows} isPrint={true}/><PageContent content={content} isPrint={false}/></div>
        )
    }
}

DisputeCase.propTypes = {
    rows: PropTypes.array,
    content: PropTypes.string
};

export  default DisputeCase;
