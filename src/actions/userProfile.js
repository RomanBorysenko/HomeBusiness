import * as Constants from './actionTypes';

export function fetchProfile(history) {
    return (dispatch) => {
        dispatch({
            type: Constants.FETCH_PROFILE,
            payload: {history: history}
        });
    };
}

export function addChild(value) {
    return (dispatch) => {
        dispatch({
            type: Constants.ADD_CHILD,
            payload: value
        });
    };
}

export function updateChild(value) {
    return (dispatch) => {
        dispatch({
            type: Constants.UPDATE_CHILD,
            payload: value
        });
    };
}

export function deleteChild(value) {
    return (dispatch) => {
        dispatch({
            type: Constants.DELETE_CHILD,
            payload: value
        });
    };
}


export function addPhone(value) {
    return (dispatch) => {
        dispatch({
            type: Constants.ADD_PHONE,
            payload: value
        });
    };
}

export function updatePhone(value) {
    return (dispatch) => {
        dispatch({
            type: Constants.UPDATE_PHONE,
            payload: value
        });
    };
}

export function deletePhone(value) {
    return (dispatch) => {
        dispatch({
            type: Constants.DELETE_PHONE,
            payload: value
        });
    };
}

export function updateProfileData(value) {
    return (dispatch) => {
        dispatch({
            type: Constants.UPDATE_PROFILE_DATA,
            payload: value
        });
    };
}

export function uploadFile(value) {
    return (dispatch) => {
        dispatch({
            type: Constants.UPLOAD_FILE,
            payload: value
        });
    };
}




