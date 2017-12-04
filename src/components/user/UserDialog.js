import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import './user.scss';

const customContentStyle = {
    width: '20%',
    maxWidth: 'none'
};

const actions = [
    <div style={{textAlign: 'center'}}>
        <RaisedButton
            label="ИЗМЕНИТЬ ПАРОЛЬ"
            primary={true}
            keyboardFocused={true}
            // onClick={this.handleClose}
        />
    </div>
];

class UserDialog extends Component {

    render() {
        const {
            onChangeText,
            changePassword,
            showDialog,
            oldPassword,
            newPassword,
            repeatPassword
        } = this.props;

        return (
            <Dialog
                title="ИЗМЕНИТЬ ПАРОЛЬ"
                actions={actions}
                modal={false}
                open={showDialog}
                onRequestClose={changePassword}
                style={{textAlign: 'center'}}
                contentStyle={customContentStyle}
            >
                <div className='body-dialog'>
                    <div className='input-field'>
                        <div>
                            СТАРЫЙ ПАРОЛЬ
                        </div>
                        <TextField
                            type="password"
                            onChange={(e, name) => onChangeText(e, 'oldPassword')}
                            value={oldPassword}
                            size="20"
                            style={{width: 200}}
                        />
                    </div>
                    <div className='input-field'>
                        <div>
                            НОВЫЙ ПАРОЛЬ
                        </div>
                        <TextField
                            type="password"
                            onChange={(e, name) => onChangeText(e, 'newPassword')}
                            value={newPassword}
                            size="20"
                        />
                    </div>
                    <div className='input-field'>
                        <div>
                            ПОВТОРИТЬ ПАРОЛЬ
                        </div>
                        <TextField
                            type="password"
                            onChange={(e, name) => onChangeText(e, 'repeatPassword')}
                            value={repeatPassword}
                            size="20"
                        />
                    </div>
                </div>
            </Dialog>
        );
    }
}

UserDialog.propTypes = {
    onChangeText: PropTypes.func,
    changePassword: PropTypes.func,
    showDialog: PropTypes.bool,
    oldPassword: PropTypes.string,
    newPassword: PropTypes.string,
    repeatPassword: PropTypes.string
};

export default UserDialog;
