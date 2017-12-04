import {call, put} from 'redux-saga/effects';
import {API_URL} from '../constants';
import * as Constants from '../actions/actionTypes';
import {dataSending} from '../components/utils/dataFormating';
import axios from 'axios';

export function profile(payload) {
    debugger
    return axios(`${API_URL}${payload.partUrl}`, payload)
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                // return res.json();
                return res.data;
            }
        }).catch();
}

export function* fetchProfile(action) {
    debugger
    try {
        let value = yield call(
            profile,
            {
                method: 'POST',
                headers: {'X-Auth-Token': sessionStorage.getItem('accessToken')},
                partUrl: '/v1/profile'
            });
        if (value) {
            yield put({type: Constants.FETCH_PROFILE_SUCCESS, value});
            yield fetchPositions();
        } else {
            yield put({type: Constants.FETCH_PROFILE_FAILURE, error: value.message});
        }
    } catch (error) {
        debugger
        yield put({type: Constants.FETCH_PROFILE_FAILURE, error: error.message});
        history.push(`/login`);
    }
}

export function* addChild(action) {
    try {
        let value = yield call(
            profile,
            {
                method: 'PUT',
                headers: {
                    'X-Auth-Token': sessionStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(action.payload),
                partUrl: '/v1/profile/child'
            });
        if (value) {
            yield fetchProfile();
        } else {
            yield put({type: Constants.FETCH_PROFILE_FAILURE, error: value.message});
        }
    } catch (error) {
        yield put({type: Constants.FETCH_PROFILE_FAILURE, error: error.message});
    }
}

export function* updateChild(action) {
    try {
        let value = yield call(
            profile,
            {
                method: 'POST',
                headers: {
                    'X-Auth-Token': sessionStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(action.payload),
                partUrl: `/v1/profile/child/${action.payload.id}`
            });
        if (value) {
            yield fetchProfile();
        } else {
            yield put({type: Constants.FETCH_PROFILE_FAILURE, error: value.message});
        }
    } catch (error) {
        yield put({type: Constants.FETCH_PROFILE_FAILURE, error: error.message});
    }
}

export function* deleteChild(action) {
    try {
        let value = yield call(
            profile,
            {
                method: 'DELETE',
                headers: {
                    'X-Auth-Token': sessionStorage.getItem('accessToken')
                },
                partUrl: `/v1/profile/child/${action.payload}`
            });
        if (value) {
            yield fetchProfile();
        } else {
            yield put({type: Constants.FETCH_PROFILE_FAILURE, error: value.message});
        }
    } catch (error) {
        yield put({type: Constants.FETCH_PROFILE_FAILURE, error: error.message});
    }
}

export function* addPhone(action) {
    try {
        let value = yield call(
            profile,
            {
                method: 'PUT',
                headers: {
                    'X-Auth-Token': sessionStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(action.payload),
                partUrl: '/v1/profile/phone'
            });
        if (value) {
            yield fetchProfile();
        } else {
            yield put({type: Constants.FETCH_PROFILE_FAILURE, error: value.message});
        }
    } catch (error) {
        yield put({type: Constants.FETCH_PROFILE_FAILURE, error: error.message});
    }
}

export function* updatePhone(action) {
    try {
        let value = yield call(
            profile,
            {
                method: 'POST',
                headers: {
                    'X-Auth-Token': sessionStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(action.payload),
                partUrl: `/v1/profile/phone/${action.payload.id}`
            });
        if (value) {
            yield fetchProfile();
        } else {
            yield put({type: Constants.FETCH_PROFILE_FAILURE, error: value.message});
        }
    } catch (error) {
        yield put({type: Constants.FETCH_PROFILE_FAILURE, error: error.message});
    }
}

export function* deletePhone(action) {
    try {
        let value = yield call(
            profile,
            {
                method: 'DELETE',
                headers: {
                    'X-Auth-Token': sessionStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                },
                partUrl: `/v1/profile/phone/${action.payload}`
            });
        if (value) {
            yield fetchProfile();
        } else {
            yield put({type: Constants.FETCH_PROFILE_FAILURE, error: value.message});
        }
    } catch (error) {
        yield put({type: Constants.FETCH_PROFILE_FAILURE, error: error.message});
    }
}

export function* updateProfileData(action) {
    try {
        let value = yield call(
            profile,
            {
                method: 'PUT',
                headers: {
                    'X-Auth-Token': sessionStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(action.payload),
                partUrl: `/v1/profile`
            });
        if (value) {
            yield fetchProfile();
        } else {
            yield put({type: Constants.FETCH_PROFILE_FAILURE, error: value.message});
        }
    } catch (error) {
        yield put({type: Constants.FETCH_PROFILE_FAILURE, error: error.message});
    }
}

export function* uploadFile(action) {
    const formData = new FormData();
    formData.append('file', action.payload);

    try {
        let value = yield call(
            profile,
            {
                method: 'POST',
                headers: {
                    'X-Auth-Token': sessionStorage.getItem('accessToken'),
                    'Content-Type': 'multipart/form-data'
                },
                data: formData,
                partUrl: `/v1/profile/image`
    });
        if (value) {
            yield fetchProfile();
        } else {
            yield put({type: Constants.FETCH_PROFILE_FAILURE, error: value.message});
        }
    } catch (error) {
        yield put({type: Constants.FETCH_PROFILE_FAILURE, error: error.message});
    }
}

export function positions(payload) {
    return axios(`${API_URL}/v1/positions`, payload)
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.data;
            }
        }).catch();
}

export function* fetchPositions() {
    try {
        let value = yield call(
            positions,
            {
                method: 'GET',
                headers: {
                    'X-Auth-Token': sessionStorage.getItem('accessToken')
                }
            });
        if (value) {
            yield put({type: Constants.FETCH_POSITIONS_SUCCESS, value});
        }
    } catch (error) {
        return error;
    }
}
