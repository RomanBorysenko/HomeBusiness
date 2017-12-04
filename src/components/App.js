import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MainLayout from './main/MainLayout';

class App extends Component {
    render() {
        return (
            <MainLayout />
        );
    }
}

App.propTypes = {
    location: PropTypes.object
};

export default App;

