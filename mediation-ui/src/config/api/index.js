import {NAV_LIST,BANNER,ENT_BIND,LOAD_USER,UPDATE_PASS,VALIDATE_PASS,SELECT_DATA,LIST_ENT,LIST_ENT_RELOAD,LIST_ENT_QUERY,SIGN_IN_USER,
    ARCHIVE_ADD,ARCHIVE_UPDATE,SIGN_OUT_USER,SUSPEND_WORK,ARCHIVE_DETAIL,LIST_BY_ARCHIVE,INVESTIGATION_LIST,MEDIATE_LIST,PROTOCOL_DETAIL,
    INVESTIGATION_SAVE,MEDIATE_SAVE,PROTOCOL_SAVE,CHECKVISIT_SAVE,CHECKVISIT_DETAIL,INVESTIGATION_DETAIL,
    MEDIATE_DETAIL,PROTOCOL_UPDATE,CHECKVISIT_UPDATE,INVESTIGATION_UPDATE,MEDIATE_UPDATE,
    EVIDENCE_DELETE,ARCHIVE_FINISH} from '../../constants/ActionTypes'
import {SIGN_IN_URL} from '../../constants/Constant'
import {formData2Param} from '../../utils/param'

const listApiMsg = (actionMsg) => {
    const option = actionMsg.option;
    let body = option.body||'';
    body += (body.length==0?'':'&')+'offset='+option.start+'&max='+option.limit;
    return {
        endpoint: option.url,
        option:{
            method: 'POST',
            body: body,
            headers:{ 'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }
    }
};

const option = {
    [NAV_LIST]:{endpoint: 'api/user/menu.json'},
    [LOAD_USER]:{endpoint: 'api/user/me.json'},
    [SIGN_OUT_USER]:{endpoint: 'api/signOut'},
    [SIGN_IN_USER]:(actionMsg,formData) => {return{endpoint: SIGN_IN_URL,
        option:{ method: 'POST', body: formData2Param(formData),
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [BANNER]:actionMsg => {return{endpoint: actionMsg.option.url}},
    [UPDATE_PASS]: (actionMsg,oldPass,newPass) => {return {endpoint: 'api/user/uppass.json',
        option:{ method: 'POST', body: "oldPassword="+oldPass+"&newPassword="+newPass,
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [VALIDATE_PASS]: (actionMsg,oldPass) => {return {endpoint: 'api/user/validatePass.json',
        option:{ method: 'POST', body: "oldPassword="+oldPass,
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [SELECT_DATA]: (actionMsg,url) => {return {endpoint: url}},
    [LIST_ENT]:listApiMsg,
    [LIST_ENT_RELOAD]:{
        type:LIST_ENT,
        apiMsg:listApiMsg,
        mergeMsg: (state) =>{return{option:state.lists.option}}
    },
    [LIST_ENT_QUERY]:{
        type:LIST_ENT,
        apiMsg:listApiMsg,
        mergeMsg: (state,actionMsg,formData) =>{
            const option = state.lists.option;
            // const oldBody = option.body;
            const body = formData2Param(formData);
            option.body = body;
            option.start = 0;
            option.current = 1;
            return{option:state.lists.option}
        }
    },
    [ENT_BIND]:(actionMsg,entId,userId) => {return{endpoint: 'api/enterprise/assgiedEnterpriseToUser.json',
    option:{ method: 'POST', body: 'entId='+entId+'&userId='+userId,
        headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
    }}},
    [SUSPEND_WORK]: (actionMsg,id,suspend) => {return {endpoint: 'api/archive/suspend.json',
        option:{ method: 'POST', body: "id="+id+"&suspend="+suspend,
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
    }}},
    [ARCHIVE_DETAIL]:actionMsg => {return {endpoint: 'api/archive/detail.json',
        option:{ method: 'POST', body: "id="+actionMsg.id,
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [LIST_BY_ARCHIVE]:actionMsg => {return {endpoint: 'api/evidence/listByArchive.json',
        option:{ method: 'POST', body: "aid="+actionMsg.id,
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [INVESTIGATION_LIST]:actionMsg => {return {endpoint: 'api/investigation/listByArchive.json',
        option:{ method: 'POST', body: "aid="+actionMsg.id,
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [ARCHIVE_ADD]:(actionMsg,formData) => {return{endpoint: 'api/archive/save.json',
        option:{ method: 'POST', body: formData2Param(formData),
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [ARCHIVE_UPDATE]:(actionMsg,formData) => {return{endpoint: 'api/archive/update.json',
        option:{ method: 'POST', body: formData2Param(formData),
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [MEDIATE_LIST]:actionMsg => {return {endpoint: 'api/mediate/listByArchive.json',
        option:{ method: 'POST', body: "aid="+actionMsg.id,
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [PROTOCOL_DETAIL]:actionMsg => {return {endpoint: 'api/protocol/detailByArchive.json',
        option:{ method: 'POST', body: "aid="+actionMsg.id,
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [INVESTIGATION_SAVE]:(actionMsg,formData) => {return {endpoint: 'api/investigation/save.json',
        option:{ method: 'POST', body: formData2Param(formData),
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [MEDIATE_SAVE]:(actionMsg,formData) => {return {endpoint: 'api/mediate/save.json',
        option:{ method: 'POST', body: formData2Param(formData),
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [PROTOCOL_SAVE]:(actionMsg,formData) => {return {endpoint: 'api/protocol/save.json',
        option:{ method: 'POST', body: formData2Param(formData),
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [CHECKVISIT_SAVE]:(actionMsg,formData) => {return {endpoint: 'api/checkVisit/save.json',
        option:{ method: 'POST', body: formData2Param(formData),
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [CHECKVISIT_DETAIL]:actionMsg => {return {endpoint: 'api/checkVisit/detailByArchive.json',
        option:{ method: 'POST', body: 'aid='+actionMsg.id,
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [INVESTIGATION_DETAIL]:actionMsg => {return {endpoint: 'api/investigation/detail.json',
        option:{ method: 'POST', body: "id="+actionMsg.id,
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [MEDIATE_DETAIL]:actionMsg => {return {endpoint: 'api/mediate/detail.json',
        option:{ method: 'POST', body: "id="+actionMsg.id,
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [EVIDENCE_DELETE]:actionMsg => {return {endpoint: 'api/evidence/delete.json',
        option:{ method: 'POST', body: "id="+actionMsg.id,
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [PROTOCOL_UPDATE]:(actionMsg,formData) => {return {endpoint: 'api/protocol/update.json',
        option:{ method: 'POST', body: formData2Param(formData),
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [CHECKVISIT_UPDATE]:(actionMsg,formData) => {return {endpoint: 'api/checkVisit/update.json',
        option:{ method: 'POST', body: formData2Param(formData),
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [INVESTIGATION_UPDATE]:(actionMsg,formData) => {return {endpoint: 'api/investigation/update.json',
        option:{ method: 'POST', body: formData2Param(formData),
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [ARCHIVE_FINISH]:actionMsg => {return {endpoint: 'api/archive/finish.json',
        option:{ method: 'POST', body: "id="+actionMsg.id,
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
    [MEDIATE_UPDATE]:(actionMsg,formData) => {return {endpoint: 'api/mediate/update.json',
        option:{ method: 'POST', body: formData2Param(formData),
            headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'}
        }}},
};

export default option;