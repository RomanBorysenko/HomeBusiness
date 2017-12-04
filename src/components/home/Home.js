import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Home extends Component {
    render() {
        return (
            <div className="wrapper">
                <div className="content-wrapper">
                    <text>TEST</text>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object
};

export default Home;
