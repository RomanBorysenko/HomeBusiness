import React, {Component} from 'react';
import {shallow, render, mount} from 'enzyme';
import UserCabinet from '../../../src/components/user/UserCabinet';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
require('es6-promise').polyfill();
import configureStore from 'redux-mock-store';
const mockStore = configureStore();
import Immutable, { Map, List, is } from 'immutable';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PropTypes from 'prop-types';
import LeftSideBar from '../../../src/components/sideBar/LeftSideBar';
//import NavBar from '../../../src/components/navBar/NavBar';


Enzyme.configure({ adapter: new Adapter() });


const muiTheme = getMuiTheme();


describe('Component <UserCabinet /> component', () => {
    /**
     * Basic props with mocked functions.
     */

    it('Component exist', function () {
        /**
         * Initialization of root component and child components.
         */
        const enzymeWrapper = mount(
            <UserCabinet
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
                context: { muiTheme },
                childContextTypes: {muiTheme: PropTypes.object}
            });
        expect(enzymeWrapper.contains(<LeftSideBar />)).toBe(true);
        //expect(enzymeWrapper.contains(<NavBar />)).toBe(true);
    });
});