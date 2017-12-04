import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form/immutable';
import authorizationContainer from '../../containers/AuthorizationContainer';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import validate from './validator/signInValidator';
import {TextField} from 'redux-form-material-ui';

const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

import './style.scss';
import './animation.scss';

const styles = {
    block: {
        maxWidth: 250
    },
    checkbox: {
        marginBottom: 16,
        marginLeft: 10
    }
};


class SignIn extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    static defaultProps = {
        auth: {}
    };

    constructor(props) {
        super(props);

        this.state = {
            checked: false,
            loading: true,
            emailInvalid: false,
            passwordInvalid: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.error) {
            if (nextProps.auth !== this.props.auth) {
                this.addAlert('Ошибка отправки данных на сервер');
            }
        }

        if (nextProps.auth.isAuth !== this.props.auth.isAuth && !nextProps.auth.isAuth) {
            this.addAlert('Пользователь не зарегистрирован');
        }
    }

    updateCheck = () => {
        this.setState((oldState) => {
            return {
                checked: !oldState.checked
            };
        });
    };

    addAlert = (message) => {
        this.container.success(
            '',
            message, {
                timeOut: 3000,
                extendedTimeOut: 1000
            });
    };

    render() {
        const {
            handleSubmit,
            valid,
            onKeyPress
        } = this.props;

        return (
            <form onSubmit={(e)=>handleSubmit(e, this.props.valid)} className="form-control-page">
                <ToastContainer
                    ref={(input) => {
                        this.container = input;
                    }}
                    toastMessageFactory={ToastMessageFactory}
                    className="toast-top-right"
                />
                <div className="animation-wrap">
                    <div className="anim-line"></div>
                    <div className="anim-form-test">
                        <div className="form-wrapper">
                            <div className="form-group">
                                <div className="e-mail">
                                    <div className="form-control">
                                        <Field
                                            component={TextField}
                                            ref={(input) => {this.email = input}}
                                            className="input"
                                            type="text"
                                            hintText="E-mail"
                                            name='email'
                                        />
                                        <div className="label"><span>@gmail.com</span></div>
                                    </div>
                                </div>
                                <div className="password">
                                    <div className="form-control">
                                        <Field
                                            component={TextField}
                                            ref={(input) => {this.password = input}}
                                            className="input"
                                            type="password"
                                            hintText="Password"
                                            name='password'
                                            onKeyPress={(e)=>onKeyPress(e, this.email, this.password, valid)}
                                            underlineStyle={{width: 400}}
                                        />
                                    </div>
                                </div>
                                <div className='checkbox'>
                                    <Checkbox
                                        label="ОСТАТЬСЯ В СИСТЕМЕ"
                                        checked={this.state.checked}
                                        onCheck={this.updateCheck}
                                        className="label-radio"
                                        style={styles.checkbox}
                                        labelStyle={{width: 'auto'}}
                                        // iconStyle={{ height: 20 }}
                                    />
                                </div>

                                    <div className='button'>
                                        <RaisedButton
                                            fullWidth={true}
                                            primary={true}
                                            disabled={!valid}
                                            label="ВОЙТИ"
                                            onClick={()=>handleSubmit(this.email, this.password, valid)}
                                            labelStyle={{fontSize: 20, verticalAlign: 'center'}}
                                            buttonStyle={{backgroundColor: '#4c9ad1', height: 63}}
                                            overlayStyle={{backgroundColor: 'transparent'}}
                                            labelPosition="after"

                                        />
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

SignIn.propTypes = {
    auth: PropTypes.object,
    emailInvalid: PropTypes.bool,
    passwordInvalid: PropTypes.bool,
    onChangePassword: PropTypes.func,
    onKeyPress: PropTypes.func,
    loginAttempt: PropTypes.func,
    email: PropTypes.string,
    password: PropTypes.string,
    onChangeEmail: PropTypes.func,
    sendRestoreLink: PropTypes.func,
    handleSubmit: PropTypes.func
};

SignIn = reduxForm({
    form: 'signIn',
    enableReinitialize: true,
    validate
})(SignIn);

export default authorizationContainer(SignIn);
