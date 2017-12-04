import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import 'es6-promise/auto';
import 'isomorphic-fetch';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {BrowserRouter} from 'react-router-dom';
import createApp from './app';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './main.scss';

injectTapEventPlugin();

const Root = () => (
    <BrowserRouter>
        <MuiThemeProvider>
            {createApp({state: window.__INITIAL__STATE__, props: window.__INITIAL__PROPS__})}
        </MuiThemeProvider>
    </BrowserRouter>
);

render((<Root/>), document.getElementById('react-container'));

if (module.hot) {
    module.hot.accept();
}
