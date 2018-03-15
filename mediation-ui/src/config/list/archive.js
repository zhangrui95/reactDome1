
const option = {
    // init:false,
    title:'全部卷宗',
    titleBtn:'创建新案件',
    titleBtnUrl: '/archive',
    limit:15,
    displayTotalInHead:true,
    columns:[
        {label:'序号',cell:'IndexCell',width:40},
        {label:'卷宗名称',cell:'ArchiveLinkCell',idKey:"id",dataKey:"name",width:230,url:'/archive'},
        {label:'卷宗类型',dataKey:"type.name"},
        {label:'卷宗状态',cell:'StateCell',dataKey:"state"},
        {label:'立卷时间',cell:'DateCell',type:'date',dataKey:"createTime"},
        {label:'操作',cell:'ArchiveActionCell',dataKey:"canPause"}
    ],
    url:'api/archive/list.json'
};

export default option;
