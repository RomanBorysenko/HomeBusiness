import React, {Component} from 'react';
import {shallow, render, mount} from 'enzyme';
import Enzyme from 'enzyme';
require('es6-promise').polyfill();
import Adapter from 'enzyme-adapter-react-16';
import LeftSideBar from '../../../src/components/sideBar/LeftSideBar';

Enzyme.configure({
    adapter: new Adapter(),
    map: jest.fn()
});

let componentProps = {
    children: [1]
};
map = jest.fn();

describe('Component <LeftSideBar /> component', () => {
    /**
     * Basic props with mocked functions.
     */

    it('Component exist', () => {
        /**
         * Initialization of root component and child components.
         */
        const enzymeWrapper = shallow(<LeftSideBar />, {...componentProps});
        expect(enzymeWrapper.find('li').length).toBe(9);
    });
});