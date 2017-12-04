import React, {Component} from 'react';
import {shallow, render, mount} from 'enzyme';
import Enzyme from 'enzyme';
require('es6-promise').polyfill();
import Adapter from 'enzyme-adapter-react-16';
import AnimationPage from '../../../src/components/authorization/AnimationPage';

Enzyme.configure({ adapter: new Adapter() });

describe('Login user <AnimationPage /> component', () => {
    /**
     * Basic props with mocked functions.
     */

    it('Component exist', () => {
        /**
         * Initialization of root component and child components.
         */
        const enzymeWrapper = shallow(<AnimationPage />);
        expect(enzymeWrapper.find('svg').hasClass('polygon-main')).toBe(true);
        expect(enzymeWrapper.find('img').length).toBe(3);
    });
});