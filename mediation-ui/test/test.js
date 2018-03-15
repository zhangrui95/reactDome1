import fetchMock from 'fetch-mock'
// import fs from 'fs'
import {DEV_REQ_HOST} from '../src/constants/ActionTypes'

fetchMock.mock(DEV_REQ_HOST+'api/user/menu.json',{navList:[
    {id:'1',name:'卷宗列表',route:'/list/archive'},
    {id:'2',name:'用户列表',route:'/list/user'}
]});

fetchMock.mock(DEV_REQ_HOST+'api/user/uppass.json',{upStatus:'0'});
fetchMock.mock(DEV_REQ_HOST+'api/user/validatePass.json',{result:'0'});

fetchMock.mock(DEV_REQ_HOST+'api/user/me.json',{user:{name:'小燕子1',id:'1'},state:0});
fetchMock.mock(DEV_REQ_HOST+'api/signOut',{state:0});
fetchMock.post(DEV_REQ_HOST+'api/signIn',function(url,option){
    const data = option.body||'';
    if(data!==null && data!== undefined &&
        (typeof data === 'string' ? data.indexOf('user=test')>=0 : data.user==='test') &&
        (typeof data === 'string' ? data.indexOf('pass=test')>=0 : data.pass==='test')){
        if(typeof data === 'string' ? data.indexOf('verify=1872')>=0 : data.verify==='1872'){
            return {user:{name:'小燕子1',id:'1'},state:0}
        }
        return {state:-1,msg:'验证码输入有误'}
    }
    return {state:-1,msg:'用户名或密码输入有误'}
});

fetchMock.mock(DEV_REQ_HOST+'api/archiveType/options.json',[{id:'1',name:'邻里纠纷'},{id:'2',name:'权属纠纷'},{id:'13',name:'其他纠纷'}]);

fetchMock.post(DEV_REQ_HOST+'api/user/list.json',function(){
    return {total:3,data:[
        {id:'1',name:'管理员'},
        {id:'2',name:'调解员1'},
        {id:'3',name:'调解员2'}
    ]}
});

fetchMock.mock('^'+DEV_REQ_HOST+'api/user/listByRole.json',function(){
    return [
        {id:'2',name:'调解员1'},
        {id:'3',name:'调解员2'}
    ]
});

fetchMock.post(DEV_REQ_HOST+'api/archive/list.json',function(){
    return {total:5,data:[
        {id:'1',name:'卷宗1',type:{id:'13',name:'其他纠纷'},state:0,createTime:1499240237246,canPause:0},
        {id:'2',name:'卷宗2',type:{id:'1',name:'邻里纠纷'},state:1,createTime:1499240237246,canPause:0},
        {id:'3',name:'卷宗3',type:{id:'2',name:'权属纠纷'},state:2,createTime:1499240237246,canPause:0},
        {id:'4',name:'卷宗4',type:{id:'2',name:'权属纠纷'},state:-1,createTime:1499240237246,canPause:0},
        {id:'5',name:'卷宗5',type:{id:'2',name:'权属纠纷'},state:0,createTime:1499240237246,canPause:-1},
    ]}
});

const archiveData = {id:'1',name:'卷宗1',result:0,type:{id:'13',name:'其他纠纷'},state:1,createTime:1499240237246,keepTime:1509240237246,applyTime:1409240238246,canPause:0,content:'为认真学习宣传、贯彻落实《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展，制定如下宣贯方案:以《意见》精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神，牢固树立新发展理念，安全生产“红线”意识，坚持安全第一、预防为主、综合治理方针，提高全民安全生产责任意识，在全省营造良好的安全发展氛围。\n二、宣贯内容\n《中共中央国务院关于推进安全生产领域改革发展的意见》全文，《中共中央国务院关于推进安全生产领域改革发展的意见》学习读本，国务院安委办部署开展《中共中央国务院关于推进安全生产领域改革发展的意见》宣讲提纲。彻落实《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展，制定如下宣贯方案:以《意见》精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神\n彻落实《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展，制定如下宣贯方案:以《意见》精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神彻落实《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展，制定如下宣贯方案:以《意见》精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神.\n彻落实《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展，制定如下宣贯方案:以《意见》精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神彻落实《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展，制定如下宣贯方案:以《意见》精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神彻落实《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展，制定如下宣贯方案:以《意见》精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神彻落实《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展，制定如下宣贯方案:以《意见》精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神彻落实《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展，制定如下宣贯方案:以《意见》精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神彻落实《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展，制定如下宣贯方案:以《意见》精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神。彻落实《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展，制定如下宣贯方案:以《意见》精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神彻落实《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展，制定如下宣贯方案:以《意见》精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神彻落实《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展，制定如下宣贯方案:以《意见》精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神。',protocolPath:'1',
    finishState:0,
    manager:{id:'2',name:'调解员1'},
    creater:{id:'2',name:'调解员1'},
    litigants:[
        {id:'1',name:'p1',card:'230132199602200369',sex:1,nation:'汉',age:12,address:'地址1',contact:'13012345678',createTime:1499240237246,archive:{}},
        {id:'2',name:'p2',card:'230132199602200369',sex:1,nation:'汉',age:12,address:'地址2',contact:'13012345679',createTime:1499240237246,archive:{}}

    ],
    workers:[
        {id:'3',worker:{id:'2',name:'调解员1'},createTime:1499240237246,archive:{}},
        {id:'4',worker:{id:'3',name:'调解员2'},createTime:1499240237246,archive:{}},
    ]
};

fetchMock.post(DEV_REQ_HOST+'api/archive/detail.json',function(){
    return {state:0,
        data:archiveData,
        protocol:{id:'1',remark:'xxx',result:-1,content:'为认真学习宣传、贯彻落实以《意见》精神为指精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神，牢固树立新发展理念，安全生产“红线”意识产责任意识产“红线”意识，坚持安全第一、预防为主、综合治理方针，提高全民安全生产责任意识产“红线”意识，坚持安全第一、预防为主、综合治理方针，提高全民安全生产责任意识产“红线”意识，坚持安全第一、预防为主、综合治理方针，提高全民安全生产责任意识产“红线”意识，坚持安全第一、预防为主。',createTime:1499240237246,creater:{},archive:{},code:'清滨人调【2017】3号'},
        check:{id:'1',visitTime:1499240237246,content:'在本级范围内扩大《意见》宣传的影响力。《中共中央国务院关于推进安全生产领域改革发展的意见》在本级范围内扩大《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展级范围内扩大《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展级范围内扩大《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展级范围内扩大《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展级范围内扩大《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展，制定如下宣贯方案:\n一、指导思想\n以《意见》精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神，牢固树立新发展理念，安全生产“红线”意识，坚持安全第一、预防为主、综合治理方针，提高全民安全生产责任意识，在全省营造良好的安全发展氛围。\n二、宣贯内容\n《中共中央国务院关于推进安全生产领域改革发展的意见》全文，《中共中央国务院关于推进安全生产领域改革发展的意见》学习读本，国务院安委办部署开展《中共中央国务院关于推进安全生产领域改革发展的意见》宣讲提纲。在本级范围内扩大《意见》宣传的影响力。《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展，制定如下宣贯方案:\n一、指导思想\n以《意见》精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神，牢固树立新发展理念，安全生产“红线”意识，坚持安全第一、预防为主、综合治理方针，提高全民安全生产责任意识，在全省营造良好的安全发展氛围。\n二、宣贯内容\n《中共中央国务院关于推进安全生产领域改革发展的意见》全文，《中共中央国务院关于推进安全生产领域改革发展的意见》学习读本，国务院安委办部署开展《中共中央国务院关于推进安全生产领域改革发展的意见》宣讲提纲。',createTime:1499240237246,creater:{},archive:{}}
    }
});
fetchMock.mock(DEV_REQ_HOST+'api/archive/suspend.json',{state:0});

fetchMock.mock(DEV_REQ_HOST+'api/archive/save.json',{state:0, data:Object.assign({},archiveData,{applyTime:1409240238246})});

fetchMock.mock(DEV_REQ_HOST+'api/archive/update.json',{state:0,data:archiveData});

fetchMock.mock(DEV_REQ_HOST+'api/archive/uploadProtocol.json',{state:0,data:archiveData});

fetchMock.mock(DEV_REQ_HOST+'api/archive/finish.json',{state:0,data:archiveData});

fetchMock.mock(DEV_REQ_HOST+'api/litigant/save.json',{state:0, data:{id:'1'}});

fetchMock.mock(DEV_REQ_HOST+'api/litigant/update.json',{state:0});

fetchMock.mock('^'+DEV_REQ_HOST+'api/archiveWorker/workers.json',function(){
    return [
        {id:'2',name:'调解员1'},
        {id:'3',name:'调解员2'}
    ]
});

const investData = {id:'1',investTime:1499240237246,address:'xxx',otherPerson:'xxx',targetPerson:'xxx',content:'为认真学习宣传、贯彻落实《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展，制定如下宣贯方案:\n一、指导思想\n以《意见》精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神，牢固树立新发展理念，安全生产“红线”意识，坚持安全第一、预防为主、综合治理方针，提高全民安全生产责任意识，在全省营造良好的安全发展氛围。\n二、宣贯内容\n《中共中央国务院关于推进安全生产领域改革发展的意见》全文，《中共中央国务院关于推进安全生产领域改革发展的意见》学习读本，国务院安委办部署开展《中共中央国务院关于推进安全生产领域改革发展的意见》宣讲提纲。\n三、宣贯方法\n（一）系统学习。各地、各有关部门和单位要深刻领会《意见》精神实质和重要内容，充分认识《意见》出台的重大意义，掌握文件精神、了解熟悉相关政策要求，强化抓好贯彻落实的政治自觉和责任自觉，进一步强化安全发展理念，统一思想、提高认识，使每一名干部、职工提高领导安全生产改革发展的能力和水平。\n（二）媒体宣传。利用本级主流各类媒体集中报道、广泛宣传，向社会大众深度解读《意见》涉及重点难点问题。积极踊跃向省局已开设的“一报一刊一网”专栏投稿，根据不同媒体特点，加大深度宣传报道力度。各地、各有关部门和单位要通过官方网站、双微平台、行业媒体抓好学习宣传、经验推广，在本级范围内扩大《意见》宣传的影响力。\n（三）专题宣讲。以国务院安委办部署开展《中共中央国务院关于推进安全生产领域改革发展的意见》宣讲工作为依托，倡导各地邀请各个领域的权威安全生产专家以开展访谈、研讨、讲座的形式针对《意见》进行细致解读，并不定期组织深入基层和企业开展宣讲活动，使《意见》精神成为社会各方面的共识，激励各级部门和企业为改革发展多做贡献。\n（四）活动促学。把《意见》宣贯工作纳入2017年度“安全生产月”、“安全生产龙江行”等活动，印发解读本、宣传资料，结合“七进”进行多范围、全覆盖宣传，广泛凝聚安全发展共识。',createTime:1499240237246,
    workers:[
        {id:'3',worker:{id:'2',name:'调解员1'},createTime:1499240237246,investigation:{}},
        {id:'4',worker:{id:'3',name:'调解员2'},createTime:1499240237246,investigation:{}},
    ],
    creater:{},
    archive:{}
};

fetchMock.mock(DEV_REQ_HOST+'api/investigation/listByArchive.json',{data:[
    investData,
    investData
]});

fetchMock.mock(DEV_REQ_HOST+'api/investigation/detail.json',{state:0,data:investData});
fetchMock.mock(DEV_REQ_HOST+'api/investigation/save.json',{state:0,data:investData});
fetchMock.mock(DEV_REQ_HOST+'api/investigation/update.json',{state:0,data:investData});

fetchMock.mock(DEV_REQ_HOST+'api/mediate/listByArchive.json',{data:[
    {id:'1',mediateTime:1499240237246,address:'xx01',content:'x001',createTime:1499240237246,creater:{},archive:{},workers:[]},
    {id:'2',mediateTime:1499240238246,address:'xx02',content:'x002',createTime:1499240238246,creater:{},archive:{},workers:[]}
]});
fetchMock.mock(DEV_REQ_HOST+'api/mediate/detail.json',{state:0,data:{id:'1',mediateTime:1499240237246,address:'xxx1',content:'为认真学习宣传、贯彻落实《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展，制定如下宣贯方案:\n一、指导思想\n以《意见》精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神，牢固树立新发展理念，安全生产“红线”意识，坚持安全第一、预防为主、综合治理方针，提高全民安全生产责任意识，在全省营造良好的安全发展氛围。\n二、宣贯内容\n《中共中央国务院关于推进安全生产领域改革发展的意见》全文，《中共中央国务院关于推进安全生产领域改革发展的意见》学习读本，国务院安委办部署开展《中共中央国务院关于推进安全生产领域改革发展的意见》宣讲提纲。\n三、宣贯方法\n（一）系统学习。各地、各有关部门和单位要深刻领会《意见》精神实质和重要内容，充分认识《意见》出台的重大意义，掌握文件精神、了解熟悉相关政策要求，强化抓好贯彻落实的政治自觉和责任自觉，进一步强化安全发展理念，统一思想、提高认识，使每一名干部、职工提高领导安全生产改革发展的能力和水平。\n（二）媒体宣传。利用本级主流各类媒体集中报道、广泛宣传，向社会大众深度解读《意见》涉及重点难点问题。积极踊跃向省局已开设的“一报一刊一网”专栏投稿，根据不同媒体特点，加大深度宣传报道力度。各地、各有关部门和单位要通过官方网站、双微平台、行业媒体抓好学习宣传、经验推广，在本级范围内扩大《意见》宣传的影响力。\n（三）专题宣讲。以国务院安委办部署开展《中共中央国务院关于推进安全生产领域改革发展的意见》宣讲工作为依托，倡导各地邀请各个领域的权威安全生产专家以开展访谈、研讨、讲座的形式针对《意见》进行细致解读，并不定期组织深入基层和企业开展宣讲活动，使《意见》精神成为社会各方面的共识，激励各级部门和企业为改革发展多做贡献。\n（四）活动促学。把《意见》宣贯工作纳入2017年度“安全生产月”、“安全生产龙江行”等活动，印发解读本、宣传资料，结合“七进”进行多范围、全覆盖宣传，广泛凝聚安全发展共识江行”等活动，印发解读本、宣传资料。',createTime:1499240237246,creater:{},archive:{},workers:[]}});
fetchMock.mock(DEV_REQ_HOST+'api/mediate/save.json',{state:0,data:{id:'1',mediateTime:1499240237246,address:'xxx1',content:'xxx1',createTime:1499240237246,creater:{},archive:{},workers:[]}});
fetchMock.mock(DEV_REQ_HOST+'api/mediate/update.json',{state:0,data:{id:'1',mediateTime:1499240237246,address:'xxx1',content:'xxx1',createTime:1499240237246,creater:{},archive:{},workers:[]}});


fetchMock.mock(DEV_REQ_HOST+'api/protocol/detailByArchive.json',{state:-1,data:{id:'1',code:'清滨人调【2017】3号',remark:'xxx',result:0,content:'经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过经过刚才的调解，纠纷当事人自愿达成如下协议：经过刚才的调解，纠纷当事人自愿达成如下协议：经过',createTime:1499240237246,creater:{},archive:{}}});
fetchMock.mock(DEV_REQ_HOST+'api/protocol/save.json',{state:0,data:{id:'1',remark:'爱迪生dfdafdfsd按时付款',createTime:1499240237246,creater:{},archive:{}}});
fetchMock.mock(DEV_REQ_HOST+'api/protocol/update.json',{state:0,data:{id:'1',remark:'xxx',result:0,content:'xxx',createTime:1499240237246,creater:{},archive:{}}});

fetchMock.mock(DEV_REQ_HOST+'api/checkVisit/detailByArchive.json',{state:0,data:{id:'1',visitTime:1499240237246,content:'为认真学习宣传、贯彻落实《中共中央国务院关于推进安全生产领域改革发展的意见》（以下简称《意见》）精神，统筹推动安全生产领域改革发展，制定如下宣贯方案:\n一、指导思想\n以《意见》精神为指导，坚决贯彻落实习近平总书记、李克强总理等各级领导关于加强安全生产工作的重要讲话和指示精神，牢固树立新发展理念，安全生产“红线”意识，坚持安全第一、预防为主、综合治理方针，提高全民安全生产责任意识，在全省营造良好的安全发展氛围。\n二、宣贯内容\n《中共中央国务院关于推进安全生产领域改革发展的意见》全文，《中共中央国务院关于推进安全生产领域改革发展的意见》学习读本，国务院安委办部署开展《中共中央国务院关于推进安全生产领域改革发展的意见》宣讲提纲。\n三、宣贯方法\n（一）系统学习。各地、各有关部门和单位要深刻领会《意见》精神实质和重要内容，充分认识《意见》出台的重大意义，掌握文件精神、了解熟悉相关政策要求，强化抓好贯彻落实的政治自觉和责任自觉，进一步强化安全发展理念，统一思想、提高认识，使每一名干部、职工提高领导安全生产改革发展的能力和水平。\n（二）媒体宣传。利用本级主流各类媒体集中报道、广泛宣传，向社会大众深度解读《意见》涉及重点难点问题。积极踊跃向省局已开设的“一报一刊一网”专栏投稿，根据不同媒体特点，加大深度宣传报道力度。各地、各有关部门和单位要通过官方网站、双微平台、行业媒体抓好学习宣传、经验推广，在本级范围内扩大《意见》宣传的影响力。\n（三）专题宣讲。以国务院安委办部署开展《中共中央国务院关于推进安全生产领域改革发展的意见》宣讲工作为依托，倡导各地邀请各个领域的权威安全生产专家以开展访谈、研讨、讲座的形式针对《意见》进行细致解读，并不定期组织深入基层和企业开展宣讲活动，使《意见》精神成为社会各方面的共识，激励各级部门和企业为改革发展多做贡献。\n（四）活动促学。把《意见》宣贯工作纳入2017年度“安全生产月”、“安全生产龙江行”等活动，印发解读本、宣传资料，结合“七进”进行多范围、全覆盖宣传，广泛凝聚安全发展共识。乙',createTime:1499240237246,creater:{},archive:{}}});
fetchMock.mock(DEV_REQ_HOST+'api/checkVisit/save.json',{state:0,data:{id:'1',visitTime:1499240237246,content:'xxxxxse',createTime:1499240237246,creater:{},archive:{}}});
fetchMock.mock(DEV_REQ_HOST+'api/checkVisit/update.json',{state:0,data:{id:'1',visitTime:1499240237246,content:'xxxxxse',createTime:1499240237246,creater:{},archive:{}}});

fetchMock.mock(DEV_REQ_HOST+'api/evidence/listByArchive.json',{data:[
    {id:'a1',name:'x1',type:0,size:12,createTime:1499240237246,creater:{id:'1',name:'rw'},archive:{}},
    {id:'b1',name:'x1',type:0,size:12,createTime:1499240237246,creater:{id:'1',name:'rw'},archive:{}},
    {id:'c1',name:'x1',type:0,size:12,createTime:1499240237246,creater:{id:'1',name:'rw'},archive:{}},
    {id:'2',name:'x2',type:1,size:32,createTime:1499240237246,creater:{id:'2',name:'asd'},archive:{}},
    {id:'3',name:'x3',type:2,size:22,createTime:1499240237246,creater:{id:'3',name:'三大'},archive:{}}
]});
fetchMock.mock(DEV_REQ_HOST+'api/evidence/save.json',{state:0, data:{id:'1'}});
fetchMock.mock(DEV_REQ_HOST+'api/evidence/delete.json',{state:0});
// fetchMock.mock(DEV_REQ_HOST+'api/evidence/download.json',function(req,res){
//     res.setHeader('Content-Type','application/octet-stream');
//     res.setHeader('Content-Disposition','attachment; filename="' + encodeURI('下载测试文件') + '"');
//     res.end(fs.readFileSync(__dirname+'/resources/test.txt'));
// });
// fetchMock.mock(DEV_REQ_HOST+'api/evidence/photo.json',function(req,res){
//     res.setHeader('Content-Type','image/png');
//     res.end(fs.readFileSync(__dirname+'/resources/img.jpg'));
// });
// fetchMock.mock(DEV_REQ_HOST+'api/archive/protocolPhoto.json',function(req,res){
//     res.setHeader('Content-Type','image/png');
//     res.end(fs.readFileSync(__dirname+'/resources/img.jpg'));
// });
// fetchMock.mock(DEV_REQ_HOST+'api/archive/protocolDownload.json',function(req,res){
//     res.setHeader('Content-Type','application/octet-stream');
//     res.setHeader('Content-Disposition','attachment; filename="' + encodeURI('下载测试文件') + '"');
//     res.end(fs.readFileSync(__dirname+'/resources/test.txt'));
// });