import React, { Component, PropTypes } from 'react'
const printLength = 50;
const printPageKey = '@@page';
class PageProContent extends Component {

    static getProCont(content,num){
        const ps = (content||'').split('\n');
        let rowProNum = 1;
        const rowsPro = ps.map((i)=>{
            let line = '';
            let count = 0;
            let rowsPro = 0;
            let inRows = [];
            let chr = '';
            for(let c in i){
                chr = i[c];
                line += chr;
                count += 1;
                if(count >= (rowsPro===0?(printLength-2):printLength)){
                    inRows.push(line);
                    line  = '';
                    count = 0;
                    rowsPro += 1;
                    rowProNum +=1;
                    if(rowProNum <= num){
                        if(rowProNum % num === 0) {
                            inRows.push(printPageKey);
                        }
                    }else{
                        if((rowProNum - num)% 44 === 0){
                            inRows.push(printPageKey);
                        }
                    }
                }
            }
            if(line !== ''){
                inRows.push(line);
                rowProNum+=1;
                if(rowProNum <= num){
                    if(rowProNum % num === 0) {
                        inRows.push(printPageKey);
                    }
                }else{
                    if((rowProNum - num)% 44 === 0){
                        inRows.push(printPageKey);
                    }
                }
            }
            return inRows;
        });

        return {rowsPro,rowProNum};
    }

    render() {
        const {rowsPro,content,isPrint} = this.props;
        if(isPrint){
            const contents = (rowsPro||[]).map((i,k)=>
                <div className="content-indent" key={k}>
                    {i.map((r,j)=>
                        (r===printPageKey ?<div key={j}><div className="page-next"></div><div className="page-fixed-height"></div></div>:<p className={j===0?'first-line':''} key={j}>{r}</p>)
                    )}
                </div>
            );
            return <div className="formArch content-indent hidden print-show">{contents}</div>;
        }else{
            const ps = (content||'').split('\n');
            const contents = ps.map((i,k)=><div key={k}>{i}</div>);
            return <div className="no-print">{contents}</div>;
        }
    }
}

PageProContent.propTypes = {
    row: PropTypes.array,
    content: PropTypes.string,
    isPrint: PropTypes.bool.isRequired
};


export default PageProContent;