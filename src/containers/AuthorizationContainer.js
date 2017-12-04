import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import validator from 'validator';
import {signIn, recovery} from '../actions/signIn';

export default function authorizationContainer(ChildComponent) {
    class SignIn extends Component {

        static contextTypes = {
            router: PropTypes.object
        };

        constructor(props) {
            super(props);

            this.state = {
                loader: false,
                emailInvalid: false,
                passwordInvalid: false
            };
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps.auth.isAuth !== this.props.auth.isAuth && nextProps.auth.isAuth || nextProps.auth.isAuth) {
                this.completeAuth(nextProps.auth);
            }
        }


        completeAuth = (data) => {
            const {history} = this.context.router;
            const id = data.user.id;

            data.ftv ? history.push(`/users/${id}/profile`) : history.push(`/users/${id}/cabinet`);
        };

        loginAttempt = (emailValue, passwordValue) => {
            if (emailValue && passwordValue) {
                let email = emailValue;
                email = email.replace('@jelvix.com', '');
                email = email + '@jelvix.com';
                let password = passwordValue;
                this.props.signIn(email, password);
            }
        };

        sendRestoreLink = () => {
            // this.props.recovery(history);
        };

        onKeyPress = (e, email, password, valid) => {
            const {auth} = this.props;

            if (e.key === 'Enter' && !auth.loading) {
                if (valid) {
                    this.loginAttempt(email.value, password.value);
                }
            }
        };

        handleSubmit = (email, password, valid) => {
            if (valid) {
                this.loginAttempt(email.value, password.value);
            }
        };

        render() {
            return (
                <ChildComponent
                    {...this.props}
                    {...this.state}
                    sendRestoreLink={this.sendRestoreLink}
                    handleSubmit={this.handleSubmit}
                    onKeyPress={this.onKeyPress}
                />
            );
        }
    }

    SignIn.propTypes = {
        actions: PropTypes.object,
        route: PropTypes.object,
        auth: PropTypes.object,
        path: PropTypes.string,
        signIn: PropTypes.func,
        recovery: PropTypes.func
    };

    const mapStateProps = (state) => {
        return {
            auth: state.get('auth').toJS()
        };
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            signIn: bindActionCreators(signIn, dispatch),
            recovery: bindActionCreators(recovery, dispatch)
        };
    };

    return connect(mapStateProps, mapDispatchToProps)(SignIn);
}
