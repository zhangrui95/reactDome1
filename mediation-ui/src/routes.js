import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'
import App from './containers/App'
import Archive from './containers/Archive'
import ArchiveDetail from './components/archive/ArchiveDetail'
import EvidenceList from './components/archive/EvidenceList'
import MediateList from './components/archive/MediateList'
import ApplyFor from './components/archive/ApplyFor'
import Mediate from './components/archive/Mediate'
import InvestigationList from './components/archive/InvestigationList'
import Investigation from './components/archive/Investigation'
import Protocol from './components/archive/Protocol'
import CheckVisit from './components/archive/CheckVisit'
import ArchiveFinish from './components/archive/ArchiveFinish'
import Login from './components/login/Login'
import Main from './components/Main'
import Form from './containers/SearchForm'
import PageList from './containers/PageList'
import {SIGN_IN_SUCCESS} from './constants/Constant'
import {keys} from './reducers'
import storage from './utils/storage'

const clearOld = function (storeState) {
    keys.filter(k => k != 'header').map(k => storeState[k]={});
};

const validUser = store => {
    return (nextState,replace) => {
        const storeState = store.getState();
        const old = storage.local.data('state');
        if(old!=null){
            clearOld(storeState);
            return;
        }
        const {header} = storeState;
        const {user} = header||{};
        const {response} = user||{};
        const {state} = response||{};
        clearOld(storeState);
        if(state != SIGN_IN_SUCCESS){
            replace('/signIn');
        }
    }
};

export default function routes(store){
    return (
        <Route >
            <Route path='/signIn' component={Login}/>
            <Route path='/' onEnter={validUser(store)} component={App}>
                <IndexRedirect to="/list/archive" />
                <Route path='/list/:list' component={Main}>
                    <IndexRoute components={{Form,PageList}}/>
                </Route>
                <Route path='/archive' component={Archive}>
                    <IndexRoute component={ArchiveDetail}/>
                    <Route path=':id' component={ArchiveDetail}/>
                    <Route path=':id/evidence' component={EvidenceList}/>
                    <Route path=':id/investigation' component={InvestigationList}/>
                    <Route path=':id/investigation/:mid' component={Investigation}/>
                    <Route path=':id/mediate' component={MediateList}/>
                    <Route path=':id/mediate/:mid' component={Mediate}/>
                    <Route path=':id/protocol' component={Protocol}/>
                    <Route path=':id/checkVisit' component={CheckVisit}/>
                    <Route path=':id/applyFor' component={ApplyFor}/>
                    <Route path=':id/finish' component={ArchiveFinish}/>
                </Route>
            </Route>
        </Route>
    )
}
