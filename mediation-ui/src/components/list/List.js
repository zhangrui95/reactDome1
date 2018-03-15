import React, { Component, PropTypes } from 'react'
import Row from './Row'
import Cell from './Cell'
import DataCell from './DataCell'
import cellsFactory from './'

class List extends Component {

    getHeader() {
        const {id,columns} = this.props;
        const headers = columns.map(function(column,i){
            const {header} = column;
            const headerProps = Object.assign({},column,{key:id+'_head_'+i,colIndex:i});
            return cellsFactory(header,headerProps,null,(<Cell {...headerProps}/>));
        });
        return (
            <thead>
            <tr className="table-list-head">{headers}</tr>
            </thead>
        )
    }
    
    getEmptyRows(){
        const {fillEmptyRow} = this.props;
        let rows;
        if(fillEmptyRow){
            const {id,data,columns,limit} = this.props;
            let start = data.length;
            const left = limit - start;
            if(left > 0){
                const cellNum = columns.length;
                rows = [];
                for(let i = 0; i< left;i++){
                    let cells = [];
                    for(let j = 0; j< cellNum;j++){
                        const key = id+'_cell_'+start+'_'+j;
                        cells.push(<Cell key={key}/>);
                    }
                    rows.push(<Row key={id+'_row_'+start} rowIndex={start}>{cells}</Row>);
                    start++;
                }
            }
        }
        return rows;
    }

    getList(){
        const {id,data,extra,columns,reload,start} = this.props;
        if(data==null||data.length==0){
            return (<tbody><tr>
                <td colSpan={columns.length}><span title="没有找到相关信息">没有找到相关信息</span></td>
            </tr></tbody>);
        }
        const rows = data.map(function(row,i){
            const cells = columns.map(function(column,j){
                const {cell} = column;
                const key = id+'_cell_'+i+'_'+j;
                const cellProps = Object.assign({},column,{id:key,key:key,rowIndex:i,colIndex:j,data:row,reload,start,extra});
                return cellsFactory(cell,cellProps,null,(<DataCell {...cellProps}/>));
            });
            return <Row key={id+'_row_'+i} rowIndex={i}>{cells}</Row>
        });
        return <tbody>{rows}{this.getEmptyRows()}</tbody>;
    }
    render(){
        return (
            <table cellPadding="0" cellSpacing="0" className="table-list">
                {this.getHeader()}
                {this.getList()}
            </table>
        )
    }

}

List.propTypes = {
    id: PropTypes.string,
    data: PropTypes.array,
    extra: PropTypes.object,
    start: PropTypes.number,
    limit: PropTypes.number,
    fillEmptyRow: PropTypes.bool,
    columns: PropTypes.array,
    reload: PropTypes.func
};

List.defaultProps = {
    start:0,
    limit:10,
    fillEmptyRow:false
};

export default List;