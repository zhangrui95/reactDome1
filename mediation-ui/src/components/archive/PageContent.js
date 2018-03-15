import React, { Component, PropTypes } from 'react'
const printLength = 50;
const printPageKey = '@@page';
class PageContent extends Component {

    static getRows(content,num){
        const ps = (content||'').split('\n');
        let rowNum = 1;
        const rows = ps.map((i)=>{
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
                    rowNum+=1;
                    if(rowNum <= num){
                        if(rowNum % num === 0) {
                            inRows.push(printPageKey);
                        }
                    }else{
                        if((rowNum - num)% 44 === 0){
                             inRows.push(printPageKey);
                        }
                    }
                }
            }
            if(line !== ''){
                inRows.push(line);
                rowNum+=1;
                if(rowNum <= num){
                    if(rowNum % num === 0) {
                        inRows.push(printPageKey);
                    }
                }else{
                    if((rowNum - num)% 44 === 0){
                        inRows.push(printPageKey);
                    }
                }
            }
            return inRows;
        });
        return {rows,rowNum};
    }

    render() {
        const {rows,content,isPrint} = this.props;
        if(isPrint){
            const cont = (rows||[]).map((i,k)=>
                <div className="content-indent" key={k}>
                    {i.map((r,j)=>
                        (r===printPageKey ?<div key={j}><div className="page-next"></div><div className="page-fixed-height"></div></div>:<p className={j===0?'first-line':''} key={j}>{r}</p>)
                    )}
                </div>
            );
            return <div className="hidden print-show">{cont}</div>;
        }else{
            const ps = (content||'').split('\n');
            const cont = ps.map((i,k)=><div key={k}>{i}</div>);
            return <div className="no-print first-line">{cont}</div>;
        }
    }
}

PageContent.propTypes = {
    rows: PropTypes.array,
    content: PropTypes.string,
    isPrint: PropTypes.bool.isRequired
};


export default PageContent;