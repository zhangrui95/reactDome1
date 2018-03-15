import React, { Component, PropTypes } from 'react'

class PartyCell extends Component {
    render() {
        const { litigants } = this.props;
        let length = litigants.length;
        const arr = (litigants||[]).sort((a,b)=>a.createTime-b.createTime).map(function (i,idx) {
            let style = '';
            if(idx === length-1){
                style = 'formArch'
            }else{
                style = 'formArch bottom-border'
            }
            return (<div className={style} key={idx}>
                <div className="margin-form-party"><span className="news-width print-name-width font-big">当事人姓名：</span><span  className="name-sex-width font-big"><span className="font-big">{i.name}</span><span className="font-big hidden print-show">（{i.sex === 1 ? '男':'女'}）</span></span></div>
                <div className="margin-form-party print-hide"><span className="news-width width-box font-big">性别：</span><span  className="show-style font-big all-width">{i.sex === 1 ? '男':'女'}</span></div>
                <div className="margin-form-party"><span className="news-width width-box font-big" >民族：</span><span  className="show-style font-big all-width">{i.nation}</span></div>
                <div className="margin-form-party"><span className="news-width width-box font-big" >年龄：</span><span  className="show-style font-big all-width">{i.age}</span></div>
                <div className="margin-form-party"><span className="news-width font-big">身份证号：</span><span  className="show-style font-big">{i.card}</span></div>
                <div className="margin-form-party"><span className="news-width font-big">单位或住址：</span><span className="address-width font-big">{i.address}</span></div>
                <div className="margin-form-party"><span className="news-width font-big">联系方式：</span><span  className="show-style font-big">{i.contact}</span></div>
            </div>);
        });
        return (
            <div>{arr}</div>
        )
    }
}

PartyCell.propTypes = {
    litigants: PropTypes.array.isRequired
};

export  default PartyCell;
