/**
 * Created by Administrator on 2017/8/1 0001.
 */
import React, { Component, PropTypes } from 'react'
const printLength = 50;
const printPageKey = '@@page';
class PageRemark extends Component {

    static getRemark(remark,num){
        const ps = (remark||'').split('\n');
        let rowNumber = 1;
        const row = ps.map((i)=>{
            let line = '';
            let count = 0;
            let row = 0;
            let inRows = [];
            let chr = '';
            for(let c in i){
                chr = i[c];
                line += chr;
                count += 1;
                if(count >= (row===0?(printLength-2):printLength)){
                    inRows.push(line);
                    line  = '';
                    count = 0;
                    row += 1;
                    rowNumber +=1;
                    if(rowNumber <= num){
                        if(rowNumber % num === 0) {
                            inRows.push(printPageKey);
                        }
                    }else{
                        if((rowNumber - num)% 44 === 0){
                            inRows.push(printPageKey);
                        }
                    }
                }
            }
            if(line !== ''){
                inRows.push(line);
                rowNumber+=1;
                if(rowNumber <= num){
                    if(rowNumber % num === 0) {
                        inRows.push(printPageKey);
                    }
                }else{
                    if((rowNumber - num)% 44 === 0){
                        inRows.push(printPageKey);
                    }
                }
            }
            return inRows;
        });
        return {row,rowNumber};
    }

    render() {
        const {row,remark,isPrint} = this.props;
        if(isPrint){
            const remarks = (row||[]).map((i,k)=>
                <div key={k}>
                    {i.map((r,j)=>
                        (r===printPageKey ?<div key={j}><div className="page-next"></div><div className="page-fixed-height"></div></div>:<p className={j===0?'first-line':''} key={j}>{r}</p>)
                    )}
                </div>
            );
            return <div className="hidden print-show">{remarks}</div>;
        }else{
            const ps = (remark||'').split('\n');
            const remarks = ps.map((i,k)=><div key={k}>{i}</div>);
            return <div className="no-print first-line">{remarks}</div>;
        }
    }
}

PageRemark.propTypes = {
    row: PropTypes.array,
    remark: PropTypes.string,
    isPrint: PropTypes.bool.isRequired
};


export default PageRemark;