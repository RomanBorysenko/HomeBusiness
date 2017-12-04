import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

export default function (ComposedComponent) {

    class Authentication extends Component {

        static contextTypes = {
            router: PropTypes.object
        };

        componentWillMount = () => {
            if (!sessionStorage.getItem('accessToken')) {
                this.context.router.history.push('/login');
            }
        };

        componentWillUpdate = () => {
            // if (!sessionStorage.getItem('access_token')) {
            //    this.context.router.history.push('/login');
            // }
        };

        render = () => {
            return <ComposedComponent {...this.props} />;
        };
    }

    const mapStateToProps = () => {
        return {
            // authenticated: state.getIn(['auth', 'authenticated'])
        };
    };

    return connect(mapStateToProps)(Authentication);
}
