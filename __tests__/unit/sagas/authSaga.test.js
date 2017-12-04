import sagaHelper from 'redux-saga-testing';
import { call, put } from 'redux-saga/effects';
import { signIn, login } from '../../../src/sagas/authSaga';
import {dataSending} from '../../../src/components/utils/dataFormating';

const successAction = () => ({ type: 'FETCH_SIGNIN_SUCCESS', value: {success: true} });
const failureAction = () => ({ type: 'FETCH_SIGNIN_FAILURE', error: `Cannot read property \'message\' of undefined` });

window.sessionStorage = {
    setItem: jest.fn(),
    removeItem: jest.fn()
};

describe('Auth action success', () => {
    const it = sagaHelper(signIn({
            payload: {
                email: 'testuser@jelvix.com',
                password: 'testuser@jelvix.com'
            }
    }));

    it('should have called the mock API first', result => {
        expect(result).toEqual(call(login, {
            method: 'POST',
            data: dataSending({
                email: 'testuser@jelvix.com',
                password: 'testuser@jelvix.com'
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }));

        return {success: true};
    });

    it('and then trigger an action', result => {
        if (result.value) {
            expect(result).toEqual(put(successAction()));
        }
    });

    it('and then nothing', result => {
        expect(result).toBeUndefined();
    });
});

describe('Auth action failure', () => {
    const it = sagaHelper(signIn({
        payload: {
            email: 'test@jjelvix.com',
            password: 'testuser@jelvix.com'
        }
    }));

    it('should have called the mock API first', result => {
        expect(result).toEqual(call(login, {
            method: 'POST',
            data: dataSending({
                email: 'test@jjelvix.com',
                password: 'testuser@jelvix.com'
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }));
        return { message: 'error message' };
    });

    it('and then trigger an action', result => {
        expect(result).toEqual(put(failureAction()));
    });

    it('and then nothing', result => {
        expect(result).toBeUndefined();
    });
});