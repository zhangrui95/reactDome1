/**
 * Created by Administrator on 2017/8/2 0002.
 */
import React, { Component, PropTypes } from 'react'
const printLength = 50;
const printPageKey = '@@page';
class PageCheckContent extends Component {

    static getCheckCont(content,num){
        const ps = (content||'').split('\n');
        let rowCheckNum =1;
        const rowsCheck = ps.map((i)=>{
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
                    rowCheckNum+=1;
                    if(rowCheckNum <= num){
                        if(rowCheckNum % num === 0) {
                            inRows.push(printPageKey);
                        }
                    }else{
                        if((rowCheckNum - num)% 44 === 0){
                            inRows.push(printPageKey);
                        }
                    }
                }
            }
            if(line !== ''){
                inRows.push(line);
                rowCheckNum+=1;
                if(rowCheckNum <= num){
                    if(rowCheckNum % num === 0) {
                        inRows.push(printPageKey);
                    }
                }else{
                    if((rowCheckNum - num)% 44 === 0){
                        inRows.push(printPageKey);
                    }
                }
            }
            return inRows;
        });
        return {rowsCheck,rowCheckNum};
    }

    render() {
        const {rowsCheck,content,isPrint} = this.props;
        if(isPrint){
            const cont = (rowsCheck||[]).map((i,k)=>
                <div className="content-indent" key={k}>
                    {i.map((r,j)=>
                        (r===printPageKey ?<div key={j}><div className="page-next"></div><div className="page-fixed-height"></div></div>:<p className={j===0?'first-line':''} key={j}>{r}</p>)
                    )}
                </div>
            );
            return <div className="formArch content-indent hidden print-show">{cont}</div>;
        }else{
            const ps = (content||'').split('\n');
            const cont = ps.map((i,k)=><div key={k}>{i}</div>);
            return <div className="no-print">{cont}</div>;
        }
    }
}

PageCheckContent.propTypes = {
    rowsCheck: PropTypes.array,
    content: PropTypes.string,
    isPrint: PropTypes.bool.isRequired
};


export default PageCheckContent;