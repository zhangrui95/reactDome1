import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as syncActions from '../../actions/syncAction';
import * as arhciveActions from '../../actions/arhcive';
import { Upload, Button, Icon } from 'antd';

const fileList = [];

const props = {
    action: 'api/archive/uploadProtocol.json',
    listType: 'picture',
    defaultFileList: [...fileList],
    className: 'upload-end',
    withCredentials: true,
    showUploadList: false
};

class UpLoading extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {state:0,show:0,text:'',count:0};
    }

    beforeUpload(file) {
        const isJPG = true;
        // const isJPG = file.type === 'image/jpeg';
        // if (!isJPG) {
        //     console.log('You can only upload JPG file!');
        // }
        const isLt2M = file.size / 1024 / 1024 < 20;
        let text = '开始上传...';
        if (!isLt2M) {
            text = '文件大于20M';
        }
        this.setState({show:0,text});
        return isJPG && isLt2M;
    }

    onChangeHandler(info){
        // if (info.file.status !== 'uploading') {
        //     console.log('info',info);
        // }
        if (info.event) {
            this.setState({show:0,text:'上传'+Math.round(info.event.percent*100)/100+'%'});
        }
        if (info.file.status === 'done') {
            const {actions} = this.props;
            const {state,data} = info.file.response;
            if(state === 0){
                actions.resetAction(data);
                this.setState({show:1,text:'上传成功',count:this.state.count+1});
            }else{
                this.setState({show:0,text:'上传失败'});
            }
        } else if (info.file.status === 'error') {
            this.setState({show:0,text:'上传失败'});
        }
    }

    download(){
        const { dataId} = this.props;
        window.open('api/archive/protocolDownload.json?id='+dataId)
    }

    render() {
        const { dataId,archive} = this.props;
        const { response} = archive;
        const { data} = response||{};
        const { name,protocolPath,finishState} = data||{};
        let img,upload;
        if(this.state.show === 1 || (protocolPath && protocolPath !== '')){
            // img = <img src={'api/archive/protocolPhoto.json?id='+dataId+'&rn='+this.state.count}/>
            img = <a onClick={this.download.bind(this)}>《{name}》<span className="black-word">协议书扫描件下载</span></a>
        }
        if(finishState === 0){
            upload = (<Upload {...props} data={{id:dataId}} onChange={this.onChangeHandler.bind(this)} beforeUpload={this.beforeUpload.bind(this)}>
                <Button>
                    <Icon type="upload" /> 上传
                </Button>
            </Upload>)
        }
        return (
            <div>
                {upload}
                <span>{this.state.text}</span>
                {img}
            </div>
        )
    }

}

UpLoading.propTypes = {
    dataId: PropTypes.string.isRequired
};

function	select(state)	{
    return	{
        archive:state.archive,
        header:state.header
    };
}

function actions(dispatch) {
    return {
        syncActions: bindActionCreators(syncActions, dispatch),
        actions: bindActionCreators(arhciveActions, dispatch),
    }
}
export  default connect(select,actions)(UpLoading);