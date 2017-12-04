import React, {Component} from 'react';
import {shallow, render, mount} from 'enzyme';
import Enzyme from 'enzyme';
require('es6-promise').polyfill();
import Adapter from 'enzyme-adapter-react-16';
import NavBar from '../../../src/components/navBar/NavBar';

Enzyme.configure({
    adapter: new Adapter(),
    map: jest.fn()
});

let componentProps = {
    children: [1]
};
map = jest.fn();

describe('Component <NavBar /> component', () => {
    /**
     * Basic props with mocked functions.
     */

    it('Component exist', () => {
        /**
         * Initialization of root component and child components.
         */
        const enzymeWrapper = shallow(<NavBar />, {...componentProps});
        expect(enzymeWrapper.find('svg').hasClass('header-hexagon')).toBe(true);
    });
});