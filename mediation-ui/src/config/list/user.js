
const option = {
    // init:false,
    title:'全部用户',
    titleBtn:'',
    limit:15,
    columns:[
        {label:'序号',cell:'IndexCell',width:40},
        {label:'用户名称',cell:'ViewEntCell',idKey:"id",url:"api/enterprise/detail?uuid=",dataKey:"name",width:230},
        {label:'用户id',dataKey:""},
        {label:'用户类型',dataKey:"enterpriseType.name"}
    ],
    url:'api/user/list.json'
};

export default option;
