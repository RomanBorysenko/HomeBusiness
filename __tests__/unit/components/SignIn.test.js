import React, {Component} from 'react';
import {shallow, render, mount} from 'enzyme';
import SignIn from '../../../src/components/authorization/SignIn';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
require('es6-promise').polyfill();
import configureStore from 'redux-mock-store';
const mockStore = configureStore();
import Immutable, { Map, List, is } from 'immutable';
import AnimationPage from '../../../src/components/authorization/AnimationPage';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';


Enzyme.configure({ adapter: new Adapter() });


const muiTheme = getMuiTheme();


describe('Login user <SignIn /> component', () => {
    /**
     * Basic props with mocked functions.
     */
    let componentProps = {
        auth: {},
        emailInvalid: false,
        passwordInvalid: false,
        onChangePassword: jest.fn(),
        onKeyPress: jest.fn(),
        loginAttempt: jest.fn(),
        email: '',
        password: '',
        onChangeEmail: jest.fn(),
        sendRestoreLink: jest.fn()
    };

    it('Component exist', function () {
        /**
         * Initialization of root component and child components.
         */
        const enzymeWrapper = mount(
            <SignIn
                {...componentProps}
                store={mockStore(Map({
                    auth: Immutable.fromJS({
                        loading: false,
                        clientId: null,
                        clientSecret: null,
                        accessToken: null,
                        expiresIn: null,
                        refreshToken: null,
                        user: null,
                        email: null,
                        errorMessage: '',
                        error: false,
                        isAuth: null
                    })
                }))}
            />, {
                state: {loading: false},
                context: { muiTheme },
                childContextTypes: {muiTheme: PropTypes.object}
            });
        expect(enzymeWrapper.contains(<AnimationPage />)).toBe(true);
    });
});