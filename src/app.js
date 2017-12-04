import React from 'react';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import configureStore from './store/configureStore';
import {saveState} from './store/localStorage';
import App from './components/App';
import './main.scss';
import mainSaga from '../src/sagas/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore(sagaMiddleware);
sagaMiddleware.run(mainSaga);

store.subscribe(()=>{
    saveState(store.getState());
});

export default function rootApp() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}


