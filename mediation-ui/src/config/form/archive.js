const option = {
    items:[
        {type:'InputItem',label:'卷宗名称',name:'name'},
        {type:'SelectItem',label:'卷宗类型',name:'typeId',dataUrl:'api/archiveType/options.json'},
        {type:'SelectItem',label:'卷宗状态',name:'state',data:[{id:'0',name:'未完成'},{id:'1',name:'调解成功'},{id:'-1',name:'调解失败'},{id:'2',name:'调解中止'}]},
        {type:'DateRange2Item',label:'立卷时间',name:'createTime',name1:'createTimeStart',name2:'createTimeEnd'}
    ]
};
export default option; 