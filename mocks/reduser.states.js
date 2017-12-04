import * as types from '../src/actions/actionTypes';
import Immutable, { Map, List, is } from 'immutable';

export const authStates = [
    {
        type: types.FETCH_SIGNIN_SUCCESS,
        payload: {
            loading: false,
            success: true,
            clientId: '',
            clientSecret: '',
            //isAuth: true,
            errorMessage: '',
            user: {id: '', email: ''}

        }
    },
    {
        type: types.FETCH_SIGNIN_FAILURE,
        payload: {
            loading: false,
            error: true,
            errorMessage: 'error message'
        }
    }
];