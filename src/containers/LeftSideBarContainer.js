import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import validator from 'validator';
import {logOut} from '../actions/signIn';

export default function leftSideBarContainer(ChildComponent) {
    class SideBar extends Component {

        static contextTypes = {
            router: PropTypes.object
        };

        constructor(props) {
            super(props);

            this.state = {};
        }

        onClick = (value) => {
            value === 'login' ? this.props.logOut() : null;
        };

        render() {
            return (
                <ChildComponent
                    {...this.props}
                    {...this.state}
                    onClick={this.onClick}
                />
            );
        }
    }

    SideBar.propTypes = {
        route: PropTypes.object,
        logOut: PropTypes.func
    };


    const mapDispatchToProps = (dispatch) => {
        return {
            logOut: bindActionCreators(logOut, dispatch)
        };
    };

    return connect(null, mapDispatchToProps)(SideBar);
}
