import * as Constants from './actionTypes';

export function signIn(email, password) {
    return (dispatch) => {
        dispatch({
            type: Constants.FETCH_SIGNIN,
            payload: {
                email,
                password
            }
        });
    };
}

export function logOut() {
    return (dispatch) => {
        sessionStorage.setItem('accessToken', '');
        dispatch({
            type: Constants.LOG_OUT
        });
    };
}

export function recovery(history) {
    return (dispatch) => {
        dispatch({
            type: Constants.FETCH_RECOVERY,
            history,
            test: 'test'
        });
    };
}
