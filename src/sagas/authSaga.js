import {call, put} from 'redux-saga/effects';
import {API_URL} from '../constants';
import * as Constants from '../actions/actionTypes';
import {dataSending} from '../components/utils/dataFormating';
import axios from 'axios';

export function login(payload) {
    return axios(`${API_URL}/v1/login`, payload)
        .then(res => {
            if (res.status >= 200 && res.status < 300) {
                // return res.json();
                return res.data;
            }
        }).catch();
}

export function* signIn(action) {
    try {
        let value = yield call(
            login,
            {
                method: 'POST',
                data: dataSending(action.payload),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        if (value) {
            sessionStorage.setItem('accessToken', value.token);
            yield put({type: Constants.FETCH_SIGNIN_SUCCESS, value});
            yield put({type: Constants.FETCH_PROFILE_SUCCESS, value});
            yield fetchPositions();
        } else {
            sessionStorage.removeItem('accessToken');
            yield put({type: Constants.FETCH_SIGNIN_FAILURE, error: value.message});
        }
    } catch (error) {
        yield put({type: Constants.FETCH_SIGNIN_FAILURE, error: error.message});
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


function recoveryData(payload) {
    return axios(`${API_URL}/email`, payload)
        .then(res => {
            return res.data;
        }).catch();
}

export function* recovery(action) {
    const {history} = action.history;

    try {
        let value = yield call(
            recoveryData,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        if (value) {
            history.push(`/recovery`);
        }
    } catch (error) {
        return error;
    }
}
