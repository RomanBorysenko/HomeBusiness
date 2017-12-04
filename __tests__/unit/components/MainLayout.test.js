import React, {Component} from 'react';
import {shallow, render, mount} from 'enzyme';
import Enzyme from 'enzyme';
require('es6-promise').polyfill();
import Adapter from 'enzyme-adapter-react-16';
import MainLayout from '../../../src/components/main/MainLayout';

Enzyme.configure({ adapter: new Adapter() });

describe('MainLayout /> component', () => {
    /**
     * Basic props with mocked functions.
     */
    it('Component exist', () => {
        /**
         * Initialization of root component and child components.
         */
        const enzymeWrapper = shallow(<MainLayout />);
        expect(enzymeWrapper.find('Route').length).toBe(8);
    });
});