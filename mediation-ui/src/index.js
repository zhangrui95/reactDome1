import 'babel-polyfill'
if (process.env.NODE_ENV !== 'production') {
    require('../test/test');
}
import React from 'react'
import { render } from 'react-dom'
import { useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import {basename} from './utils/body'

const init = function(id){
    const store = configureStore();
    const history = syncHistoryWithStore(useRouterHistory(createHistory)({
        basename
    }), store);

    return render(
        <Root store={store} history={history} />,
        document.getElementById(id)
    );
};

const page = init('main');